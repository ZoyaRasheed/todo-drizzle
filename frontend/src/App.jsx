import { useState, useEffect } from 'react';
import './App.css';
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
    const ITEMS_PER_PAGE = 4;

    // Fetch todos on mount
    useEffect(() => {
        if (!searchQuery.trim()) {
            fetchTodos();
        }
    }, []); // Only fetch on mount, not on page change (client-side pagination)

    // Handle search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                fetchTodos();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAllTodos();

            // Handle different potential response structures safely
            if (Array.isArray(response)) {
                setTodos(response);
            } else if (response && response.data && Array.isArray(response.data)) {
                setTodos(response.data);
            } else {
                setTodos([]);
            }

        } catch (err) {
            setError('Failed to fetch todos. Please make sure the backend is running on port 3000.');
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (e, description) => {
        try {
            setError(null);
            await addTodo(description);
            // Reset to first page to see new item
            setPage(1);
            fetchTodos();
        } catch (err) {
            setError('Failed to add todo. Please try again.');
            console.error('Error adding todo:', err);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            setError(null);
            await deleteTodo(id);
            // Refresh current page
            fetchTodos();
        } catch (err) {
            setError('Failed to delete todo. Please try again.');
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
            // No need to fetchTodos here as we already updated visually.
            // But we can fetch silently in background if needed to ensure sync.
        } catch (err) {
            setError('Failed to update status. Please try again.');
            console.error('Error toggling status:', err);
            fetchTodos(); // Revert on error
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await searchTodos(searchQuery);
            setTodos(response.data || []);
            // Hide pagination during search or handle search pagination if backend supports it
            setPage(1);
        } catch (err) {
            setError('Search failed. Please try again.');
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
            setError('Failed to update todo. Please try again.');
            console.error('Error updating todo:', err);
        }
    };

    // Filter todos based on status
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'pending') return todo.status === 'pending';
        if (filter === 'completed') return todo.status === 'completed';
        return true; // 'all'
    });

    // Calculate pagination
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
        <div className="app">
            <div className="app-container">
                <Header />

                <TodoForm onAdd={handleAddTodo} />

                <ErrorMessage message={error} />

                <TodoFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filter={filter}
                    setFilter={setFilter}
                    stats={stats}
                />

                <TodoList
                    todos={paginatedTodos}
                    loading={loading}
                    filter={filter}
                    searchQuery={searchQuery}
                    onToggle={handleToggleStatus}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                />

                {/* Pagination Controls */}
                {!searchQuery && totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span className="pagination-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="pagination-btn"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
