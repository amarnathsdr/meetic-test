import { createContext, useContext, useState, useEffect } from 'react';
import { type Todo } from '../type/todo';
const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
    const storedTodoList: Todo[] =
        JSON.parse(localStorage.getItem('todoList')) || [];

    const [todoList, setTodoList] = useState(storedTodoList);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    const addTodo = (newTodo: Todo) => {
        setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    };

    const checkTodo = (todoId: Date) => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) => {
                if (todo.id === todoId) {
                    return { ...todo, isChecked: !todo.isChecked };
                }
                return todo;
            })
        );
    };

    const removeTodo = (todoId: Date) => {
        setTodoList((prevTodoList) =>
            prevTodoList.filter((todo) => todo.id !== todoId)
        );
    };

    const contextValue = {
        todoList,
        addTodo,
        checkTodo,
        removeTodo,
    };

    return (
        <TodoListContext.Provider value={contextValue}>
            {children}
        </TodoListContext.Provider>
    );
};

export const useTodoList = () => {
    return useContext(TodoListContext);
};
