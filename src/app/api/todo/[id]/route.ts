import db from "@/server/db";
import {NextRequest, NextResponse} from "next/server";
import {Todo} from "@/types/Todo";

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    const body = await request.json();
    const todo = await db.find(params.id) as Todo;

    todo.completed = body.completed;
    await db.update(todo);

    return NextResponse.json({
        message: "Todo updated",
    });
}

export async function DELETE(_: NextRequest, {params}: { params: { id: string } }) {
    await db.remove(params.id);
    return NextResponse.json({
        message: "Todo deleted",
    });
}