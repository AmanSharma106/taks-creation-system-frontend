

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskFormComponent = () => {
    const [task, setTask] = useState({ title: '', description: '', status: '' });
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            // const response = await axios.get('https://localhost:7141/api/Tasks');
            const response = await axios.get('https://taskcreationsystemapi.azurewebsites.net/api/Tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://taskcreationsystemapi.azurewebsites.net/api/Tasks', task);
            setTasks([...tasks, response.data]);
            setTask({ title: '', description: '', status: '' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://taskcreationsystemapi.azurewebsites.net/api/Tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task-form-container" style={{ backgroundImage: `url('/background-image.jpg')` }}>
            <div className="task-form">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />
                    <textarea placeholder="Description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} required></textarea>
                    <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
                        <option value="ToDo">ToDo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button type="submit">Create Task</button>
                </form>
            </div>
            <div className="task-list">
                <h2>Task List</h2>
                {tasks.map(task => (
                    <div key={task.id} className="task-item">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskFormComponent;
