"use client"

import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from "react"
import { useRouter } from 'next/navigation';

type ListNotes = {
    id: string
    title: string
    description: string
    deleted_at: string
    created_at: string
    updated_at: string
}

type Notes = {
    success: boolean
    message: string
    data: ListNotes
}

export const getServerSideProps = (async (context) => {
    const {params} = context
    const notes = await fetch(`https://service.pace-unv.cloud/api/notes/${params?.id || ""}`).then(
        (res) => res.json()
    )
    return { props: { notes } }
}) satisfies GetServerSideProps<{ notes: Notes }>

export default function NotesServerPage( {notes}: InferGetServerSidePropsType <typeof getServerSideProps> ) {
    const [noteData, setNoteData] = useState(notes.data);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    // handle update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/notes/update?id=${noteData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    title: noteData.title,
                    description: noteData.description,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert("Failed Update Data!")
                return
            }

            alert(result.message)
            router.push('/notes/server')
        } catch (error) {
            console.error("Error updating note:", error);
            alert("Internal Server Error!");
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
        <div className="flex flex-col gap-5 justify-center">
            <div className="p-4 bg-white shadow-sm rounded-lg">
                <h1>{notes.data.title}</h1>
                <p>{notes.data.description}</p>
            </div>
            
            <div className="w-auto sm:min-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Create Note</h2>

                <form className="space-y-4" onSubmit={handleUpdate}>
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Input title here..."
                            value={noteData.title}
                            onChange={(e) => 
                                setNoteData((prev) => ({
                                    ...prev,
                                    title: e.target.value
                                }))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Input description here..."
                            value={noteData.description}
                            onChange={(e) => 
                                setNoteData((prev) => ({
                                    ...prev,
                                    description: e.target.value
                                }))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer disabled:bg-gray-400"
                        disabled={loading}>
                        {loading ? "Updating..." : "Edit"}
                    </button>
                </form>
            </div>
        </div>
       
        </>
        
    )
}