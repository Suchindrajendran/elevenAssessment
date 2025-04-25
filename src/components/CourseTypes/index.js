import React, { useState } from 'react';
import '../../styles/componentStyles.css';
import '../../styles/buttonStyles.css';
import '../../styles/courseTypesButtonStyles.css';

function CourseTypes() {
  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' },
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
    if (courseTypes.some(ct => ct.name.toLowerCase() === newName.trim().toLowerCase())) {
      setError('Course type name must be unique');
      return;
    }
    const newCourseType = {
      id: courseTypes.length ? Math.max(...courseTypes.map(ct => ct.id)) + 1 : 1,
      name: newName.trim(),
    };
    setCourseTypes([...courseTypes, newCourseType]);
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
    if (courseTypes.some(ct => ct.name.toLowerCase() === editName.trim().toLowerCase() && ct.id !== editId)) {
      setError('Course type name must be unique');
      return;
    }
    setCourseTypes(courseTypes.map(ct => (ct.id === editId ? { ...ct, name: editName.trim() } : ct)));
    setEditId(null);
    setEditName('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      setCourseTypes(courseTypes.filter(ct => ct.id !== id));
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
      <h2>Course Types</h2>
      <div>
        <input
          type="text"
          placeholder="New course type name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={handleAdd} className="button-primary">Add</button>
        <button onClick={handleClear} className="button-secondary">Clear</button>
      </div>
      {error && <div className="error">{error}</div>}
      <ul>
        {courseTypes.map(ct => (
          <li key={ct.id} style={{ marginBottom: '8px' }}>
            {editId === ct.id ? (
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
                <span>{ct.name}</span>
                <button onClick={() => handleEdit(ct.id, ct.name)} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(ct.id)} style={{ marginLeft: '5px' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseTypes;
