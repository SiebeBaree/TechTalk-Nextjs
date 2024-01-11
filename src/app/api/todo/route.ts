import {NextRequest, NextResponse} from "next/server";
import db from "@/server/db"
import {Todo} from "@/types/Todo";

export async function GET() {
    const todos = await db.find();
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const todo: Todo = {
        id: crypto.randomUUID(),
        title: body.todo,
        completed: false,
    }
    await db.create(todo);

    return NextResponse.json({
        success: true,
    }, { status: 201 });
}