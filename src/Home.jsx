import React, { useState, useEffect } from 'react';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    const saveToLS = (updatedTodos) => {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const addTodo = () => {
        if (task.trim() === '') return;
        const newTodo = { text: task, checked: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        saveToLS(updatedTodos);
        setTask('');
    };

    const removeTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        saveToLS(updatedTodos);
    };

    const toggleTodo = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, checked: !todo.checked } : todo
        );
        setTodos(updatedTodos);
        saveToLS(updatedTodos);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full sm:w-full md:w-10/12 lg:w-8/12 xl:w-6/12 bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <h1 className="text-white text-2xl font-bold mb-2">Todos</h1>
                    <h3 className="text-white text-lg mb-2">Add a todo</h3>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Enter Your Task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="flex-1 w-full sm:w-80 md:w-96 p-2 rounded mr-2 mb-2"
                        />
                        <button
                            onClick={addTodo}
                            className="w-16 sm:w-16 h-11 bg-blue-700 text-white p-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className="text-white text-lg mb-2">Your Todos</h3>
                    <ul className="text-white">
                        {todos.map((todo, index) => (
                            <li key={index} className="flex flex-wrap sm:flex-no-wrap justify-between items-center my-2">
                                <input
                                    type="checkbox"
                                    checked={todo.checked}
                                    onChange={() => toggleTodo(index)}
                                    className="mr-2 mb-2 sm:mb-0"
                                />
                                <span className={`flex-1 ${todo.checked ? "line-through" : ""}`}>
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => removeTodo(index)}
                                    className="bg-green-500 text-white p-1 rounded ml-2"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
