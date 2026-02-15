import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/v1/todo';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all todos
export const getAllTodos = async () => {
  const response = await api.get('/getTodos');
  return response.data;
};

// Add a new todo
export const addTodo = async (description) => {
  const response = await api.post('/add', { description });
  return response.data;
};

// Update a todo
export const updateTodo = async (id, newDescription) => {
  const response = await api.patch(`/update/${id}`, { newDescription });
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

// Search todos
export const searchTodos = async (searchQuery) => {
  const response = await api.get(`/search?search=${searchQuery}`);
  return response.data;
};

// Toggle todo status
export const toggleTodoStatus = async (id) => {
  const response = await api.patch(`/toggle/${id}`);
  return response.data;
};

export default api;
