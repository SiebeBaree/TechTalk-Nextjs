import {NextResponse} from "next/server";

export async function GET() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return NextResponse.json({
        url: "/images/" + randomNumber + ".jpg"
    });
}