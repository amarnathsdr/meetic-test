import Todo from './components/Todo';
import { TodoListProvider } from './provider/TodoListProvider';

function App() {
    return (
        <>
            <h1 className='font-bold text-6xl text-pink-500 mb-4'>
                Test Meetic Front-End
            </h1>

            <TodoListProvider>
                <Todo />
            </TodoListProvider>
        </>
    );
}

export default App;
