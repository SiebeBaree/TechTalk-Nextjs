// Mock database using json-server

import {Todo} from "@/types/Todo";

export async function find(id?: string): Promise<Todo[] | Todo> {
    const response = await fetch(`http://localhost:3001/todos${id ? `/${id}` : ''}`);
    return await response.json();
}

export async function create(todo: Todo): Promise<void> {
    const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    await response.json();
}

export async function update(todo: Todo): Promise<void> {
    const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    await response.json();
}

export async function remove(id: string): Promise<void> {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
    });
    await response.json();
}

export default {
    find,
    create,
    update,
    remove,
}