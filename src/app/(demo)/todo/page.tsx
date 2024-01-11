'use client';

import {FormEvent, useEffect, useState} from "react";
import {Todo} from "@/types/Todo";
import Image from "next/image";

export default function TodoApp() {
    const [count, setCount] = useState<number>(0);
    const [todos, setTodos] = useState<Todo[]>([]);

    // Fetch todos from the API using a simple get request
    const fetchTodos = async (): Promise<Todo[]> => {
        try {
            const response = await fetch('/api/todo');
            return await response.json();
        } catch (e) {
            return [];
        }
    }

    // Fetch the todos when the component is mounted and when the count changes
    // Tip: useEffect

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Todo Demo App</h1>
            <CreateTodo setCount={setCount}/>
            <TodoList todos={todos}/>
        </div>
    );
}

function CreateTodo({setCount}: {
    setCount: (count: (c: number) => number) => void,
}) {
    const [todo, setTodo] = useState<string>('');

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/todo', {
            method: 'POST',
            body: JSON.stringify({todo}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            setTodo('');
            setCount(c => c + 1);
        }
    }

    return (
        <div className="border-2 border-primary p-4 m-2 rounded-md">
            <h2 className="text-xl font-medium text-center">Create a todo</h2>

            <form className="flex gap-2" onSubmit={onSubmit}>
                <input type="text" className="border border-primary py-1 px-2 rounded-md"
                       value={todo}
                       onChange={(e) => setTodo(e.target.value)}/>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}

function TodoList({todos}: { todos: Todo[] }) {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-medium text-center">Todo List</h2>
            <div className="flex flex-col gap-4">
                {todos.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
            </div>
        </div>
    );
}

function TodoItem({todo}: { todo: Todo }) {
    const [completed, setCompleted] = useState<boolean>(todo.completed);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const updateTodo = async (isChecked: boolean) => {
        try {
            // Make a PUT request to the API to update the todo
            const response = await fetch(`/api/todo/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    completed: isChecked,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // If the request was successful, update the state, otherwise show an error
            if (response.ok) {
                setCompleted(isChecked);
            } else {
                alert('Error updating todo');
            }
        } catch (e) {
            alert('Error updating todo');
        }
    }

    const deleteTodo = async () => {
        try {
            const response = await fetch(`/api/todo/${todo.id}`, {
                method: 'DELETE'
            });

            setIsDeleted(response.ok);
        } catch (e) {
            alert('Error deleting todo');
        }
    }

    // If you return null from a component, it will not be rendered
    if (isDeleted) return null;
    return (
        <div className="w-[300px] flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={completed}
                       onChange={(e) => updateTodo(e.target.checked)}/>
                <h3 className="font-medium">{todo.title}</h3>
            </div>
            <button onClick={deleteTodo}>
                <Image src="/icons/trash.svg" alt="Trash icon" width={16} height={16}/>
            </button>
        </div>
    );
}