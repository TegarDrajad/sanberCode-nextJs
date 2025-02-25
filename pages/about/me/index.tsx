// import Image from "next/image";
// import ImgBg from '@/assets/background.jpeg'

// import HeavyComponent from "@/components/HeavyComponent"
import dynamic from "next/dynamic"
import { useState } from "react"

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), { ssr: false, loading: () => 
<p>Loadings...</p>})


export default function About() {

    const [showComponent, setShowComponent] = useState(false);

    return (
    <div>
        <h1>Aboute Page</h1>
        {/* <Image src="/background.jpeg" sizes="100vw" width="1000" height="800" ></Image> */}
        {/* <img {... ImgBg}></img> */}
        <button 
            onClick={() => setShowComponent(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition" >
            Load Heavy Component
        </button>
        {showComponent && <HeavyComponent/>}
    </div>
    )
}