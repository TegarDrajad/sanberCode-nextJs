import { useRouter } from "next/router";

export default function User() {
    const router = useRouter()
    console.log('router -->', router)
    return <>
        <div>
            User : {router.query.user_name}   
        </div>    
    </>
}