import React from "react";
import Head from "next/head";
import { Geist, Geist_Mono } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
  })
  
  const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
  })

export default function RootLayout({
    metaTitle,
    children,
}:{
    children: React.ReactNode
    metaTitle? : string
}){
    return(
        <>
        <Head>
            <title>{`NextJs App - ${metaTitle || ''} `}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={` ${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
            <header className="bg-blue-300 text-white p-4">
                <div className="container mx-auto flex justify-between items-center gap-10">
                    <h1 className="text-md font-bold">Next JS APP</h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                        <li>
                            <Link href='about'>About</Link>
                        </li>
                    </ul>
                </div>
            </header>

            <main className="flex-1 container mx-auto p-4">
                {children}
            </main>

            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; {new Date().getFullYear()} TegarDrajad SanberCode Next JS</p>
            </footer>
        </div>
        </>
    )
}