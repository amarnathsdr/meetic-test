import { useState } from 'react';

import { type Todo } from '../type/todo';
import { useTodoList } from '../provider/TodoListProvider';

function TodoL() {
    const { todoList, addTodo, checkTodo, removeTodo } = useTodoList();

    const [inputText, setInputText] = useState('');

    const handleKeyDown = (key: string) => {
        if (key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleAddTodo = () => {
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isChecked: false,
        };
        addTodo(newTodo);
        setInputText('');
    };

    const handleCheckTodo = (todoId: Date) => {
        checkTodo(todoId);
    };

    const handleRemoveTodo = (todoId: Date) => {
        removeTodo(todoId);
    };

    return (
        <>
            <div className='flex my-8'>
                <input
                    className='rounded-l-lg h-12 w-full px-4 focus:outline-none'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e.key)}
                    placeholder='Add your gift list for Santa :)'
                />
                <button
                    className='bg-pink-500 w-20 text-white font-semibold rounded-r-lg'
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>

            {todoList.map((todo: Todo) => {
                return (
                    <div
                        key={todo.id.toString()}
                        className={`relative p-4 my-4 rounded-lg cursor-pointer ${
                            todo.isChecked ? 'bg-green-500' : 'bg-pink-500'
                        }`}
                    >
                        <input
                            type='checkbox'
                            checked={todo.isChecked}
                            className='cursor-pointer accent-white'
                            onChange={() => handleCheckTodo(todo.id)}
                        />
                        <span className='ml-4 text-white font-semibold'>
                            {todo.text}
                        </span>
                        <button
                            className='absolute right-0 mr-4 text-white font-bold'
                            onClick={() => handleRemoveTodo(todo.id)}
                        >
                            x
                        </button>
                    </div>
                );
            })}
        </>
    );
}

export default TodoL;
