import React, { useState } from 'react';
import '../../styles/componentStyles.css';
import '../../styles/buttonStyles.css';

function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' },
  ]);
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }
    if (courses.some(c => c.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError('Course name must be unique');
      return;
    }
    const newCourse = {
      id: courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      name: newName.trim(),
    };
    setCourses([...courses, newCourse]);
    setNewName('');
    setError('');
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
    setError('');
  };

  const handleUpdate = () => {
    if (!editName.trim()) {
      setError('Name cannot be empty');
      return;
    }
    if (courses.some(c => c.name.toLowerCase() === editName.trim().toLowerCase() && c.id !== editId)) {
      setError('Course name must be unique');
      return;
    }
    setCourses(courses.map(c => (c.id === editId ? { ...c, name: editName.trim() } : c)));
    setEditId(null);
    setEditName('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      if (editId === id) {
        setEditId(null);
        setEditName('');
        setError('');
      }
    }
  };

  const handleClear = () => {
    setNewName('');
    setEditId(null);
    setEditName('');
    setError('');
  };

  return (
    <div className="component-container">
      <h2>Courses</h2>
      <div>
        <input
          type="text"
          placeholder="New course name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAdd} className="button-primary">Add</button>
        <button onClick={handleClear} className="button-secondary">Clear</button>
      </div>
      {error && <div className="error">{error}</div>}
      <ul>
        {courses.map(c => (
          <li key={c.id} style={{ marginBottom: '8px' }}>
            {editId === c.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => { setEditId(null); setEditName(''); setError(''); }}>Cancel</button>
              </>
            ) : (
              <>
                <span>{c.name}</span>
                <div className="button-group">
                  <button onClick={() => handleEdit(c.id, c.name)} className="button-primary">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="button-secondary">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
