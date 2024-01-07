import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/styles/globals.css'
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Tech Talk NextJS',
    description: 'Demo app for NextJS Tech Talk by Siebe Baree & Olivier Jammaers',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="h-screen w-full container mx-auto px-5">
            {children}
        </div>
        </body>
        </html>
    )
}
