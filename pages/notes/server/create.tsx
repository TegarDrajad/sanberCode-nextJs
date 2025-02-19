import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function NotesServerCreate() {
    const [payload, setPayload] = useState({
        title: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ errors: { [key: string]: string } } | null>(null);
    const router = useRouter();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/notes/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = { errors: { general: "Unknown error occurred" } };

                try {
                    const data = await response.json();
                    errorMessage = data;
                } catch (err) {
                    console.error("Failed to parse error response:", err);
                }

                setError(errorMessage);
                return;
            }

            router.push("/notes/server");
        } catch (error) {
            console.error("An unexpected error happened:", error);
            setError({ errors: { general: "An unexpected error occurred. Please try again." } });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>

            <form className="space-y-4" onSubmit={onSubmit}>
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={payload.title}
                        onChange={(event) => setPayload({ ...payload, title: event.target.value })}
                        placeholder="Input title here..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                    {error?.errors?.title && <small className="text-red-500">{error.errors.title}</small>}
                </div>

                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={payload.description}
                        onChange={(event) => setPayload({ ...payload, description: event.target.value })}
                        placeholder="Input description here..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                    {error?.errors?.description && (
                        <small className="text-red-500">{error.errors.description}</small>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>

                {/* General Error Message */}
                {error?.errors?.general && <p className="text-red-500 text-center">{error.errors.general}</p>}
            </form>
        </div>
    );
}
