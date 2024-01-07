"use client";

import {useState, useEffect} from "react";
import Image from "next/image";

export default function ReactDemoPage() {
    return (
        <div className="pb-8">
            <h1 className="text-3xl font-bold">React Demo</h1>
            <p className="text-lg">In this page you will learn:</p>
            <ul className="list-disc list-inside">
                <li>How to use JSX/TSX</li>
                <li>How to use React components</li>
                <li>How to use React hooks (useState, useEffect)</li>
            </ul>

            <LearnUseState/>
            <LearnUseEffect/>
        </div>
    );
}

function LearnUseState() {
    const [count, setCount] = useState(0);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold">useState</h2>
            <p className="text-lg">useState is a hook that allows you to store state in a component.</p>
            <p className="text-lg">This is the current count: {count}</p>
            <button className="rounded-md border-1 px-6 py-2 bg-primary text-primary-foreground" onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

function LearnUseEffect() {
    const [count, setCount] = useState(0);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        fetch("/api/image")
            .then((response) => response.json())
            .then((data) => {
                setImage(data.url);
            });
    }, [count]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold">useEffect</h2>
            <p className="text-lg">useEffect is a hook that allows you to run code after every render or when a dependency changes.</p>
            <p className="text-lg">This is the current count: {count}</p>
            <button className="rounded-md border-1 px-6 py-2 bg-primary text-primary-foreground" onClick={() => setCount(count + 1)}>Increment</button>
            {image && <Image src={image} alt="Random Image" className="mt-4" width={200} height={200}/>}
        </div>
    );
}