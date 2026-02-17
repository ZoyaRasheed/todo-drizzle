import { useState, useEffect } from 'react';
import './index.css';
import {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    searchTodos,
    toggleTodoStatus,
} from './services/api';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import ErrorMessage from './components/ErrorMessage';

function App() {
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, completed
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10; // Increased for dense list view

    // Fetch todos on mount
    useEffect(() => {
        if (!searchQuery.trim()) {
            fetchTodos();
        }
    }, []);

    // Handle search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                fetchTodos();
            }
        }, 300); // Faster debounce for "instant" feel

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllTodos();
            if (Array.isArray(response)) {
                setTodos(response);
            } else if (response && response.data && Array.isArray(response.data)) {
                setTodos(response.data);
            } else {
                setTodos([]);
            }
        } catch (err) {
            setError('Could not connect to server.');
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (e, description) => {
        try {
            setError(null);
            await addTodo(description);
            setPage(1);
            fetchTodos();
        } catch (err) {
            setError('Failed to create item.');
            console.error('Error adding todo:', err);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            setError(null);
            await deleteTodo(id);
            fetchTodos();
        } catch (err) {
            setError('Failed to delete item.');
            console.error('Error deleting todo:', err);
        }
    };

    const handleToggleStatus = async (id) => {
        // Optimistic update
        setTodos(prevTodos => prevTodos.map(todo => {
            if (todo.id === id) {
                const currentStatus = todo.status ? todo.status.toLowerCase() : 'pending';
                const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
                return { ...todo, status: newStatus };
            }
            return todo;
        }));

        try {
            setError(null);
            await toggleTodoStatus(id);
        } catch (err) {
            setError('Sync failed.');
            fetchTodos();
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await searchTodos(searchQuery);
            setTodos(response.data || []);
            setPage(1);
        } catch (err) {
            console.error('Error searching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTodo = async (id, newDescription) => {
        try {
            setError(null);
            await updateTodo(id, newDescription);
            fetchTodos();
        } catch (err) {
            setError('Update failed.');
        }
    };

    // Filter todos
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'pending') return todo.status === 'pending';
        if (filter === 'completed') return todo.status === 'completed';
        return true;
    });

    // Pagination
    const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedTodos = searchQuery
        ? filteredTodos
        : filteredTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const stats = {
        total: todos.length,
        pending: todos.filter((t) => t.status === 'pending').length,
        completed: todos.filter((t) => t.status === 'completed').length,
    };

    return (
        <div className="
            relative w-full max-w-3xl min-h-[80vh] p-8 pl-14 sm:pl-20 
            bg-paper-bg rounded-sm shadow-[0_1px_4px_rgba(0,0,0,0.1),0_0_40px_rgba(0,0,0,0.1)_inset]
            bg-[linear-gradient(90deg,transparent_59px,var(--color-margin-line)_59px,transparent_60px),linear-gradient(var(--color-paper-line)_1px,transparent_1px)]
            bg-[size:100%_100%,100%_2.5rem] bg-local leading-10
            before:content-[''] before:absolute before:top-0 before:left-5 before:h-full before:w-[10px] 
            before:bg-[radial-gradient(#333_30%,transparent_31%)] before:bg-[size:10px_2.5rem] before:bg-[position:0_1rem] before:opacity-60
        ">
            <Header />

            <div className="mb-6">
                <TodoForm onAdd={handleAddTodo} />
            </div>

            <ErrorMessage message={error} />

            <div className="mb-4">
                <TodoFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filter={filter}
                    setFilter={setFilter}
                    stats={stats}
                />
            </div>

            <TodoList
                todos={paginatedTodos}
                loading={loading}
                filter={filter}
                searchQuery={searchQuery}
                onToggle={handleToggleStatus}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
            />

            {!searchQuery && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 font-kalam">
                    <button
                        className="px-4 py-1 border-2 border-ink-blue rounded-full hover:bg-ink-blue/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                        Previous
                    </button>
                    <span className="text-lg">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="px-4 py-1 border-2 border-ink-blue rounded-full hover:bg-ink-blue/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
