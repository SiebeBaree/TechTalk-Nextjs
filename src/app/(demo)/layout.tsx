/*
    Layout Page
    ~~~~~~~~~~~~~~~

    In this page you will learn:
    - How and why layouts are used
    - What the Image and Link components are
    - Looping over an array (and explaining react router cache)
 */

import React from "react";
import Image from "next/image";
import NavLink from "@/components/nav-link";

const pages = [
    {
        "name": "Home",
        "path": "/",
    },
    {
        "name": "React Demo",
        "path": "/react-demo",
    },
    {
        "name": "Todo App",
        "path": "/todo",
    }
]

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-12 mb-8">
                <Image src="/logo_pxl_digital.png" alt="PXL Digital Logo" width={300} height={100} className="mb-4"/>
                <h1 className="text-5xl font-bold">Tech Talk Next.js</h1>
                <p className="text-lg">Demo app for Next.js Tech Talk by Siebe Baree & Olivier Jammaers</p>

                <div className="flex flex-wrap gap-3 mt-4">
                    {pages.map((page) => (
                        <NavLink key={page.path} name={page.name} path={page.path}/>
                    ))}
                </div>
            </div>

            {children}
        </div>
    )
}
