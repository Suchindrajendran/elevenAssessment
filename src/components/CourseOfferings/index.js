import React, { useState } from 'react';
import '../../styles/selectStyles.css';
import '../../styles/componentStyles.css';
import '../../styles/buttonStyles.css';

function CourseOfferings() {
  const [courseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' },
  ]);
  const [courses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' },
  ]);
  const [offerings, setOfferings] = useState([
    { id: 1, courseTypeId: 1, courseId: 2 }, // Individual - English
    { id: 2, courseTypeId: 2, courseId: 1 }, // Group - Hindi
  ]);
  const [newCourseTypeId, setNewCourseTypeId] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [editId, setEditId] = useState(null);
  const [editCourseTypeId, setEditCourseTypeId] = useState('');
  const [editCourseId, setEditCourseId] = useState('');
  const [error, setError] = useState('');

  const getCourseTypeName = (id) => {
    const ct = courseTypes.find(ct => ct.id === id);
    return ct ? ct.name : '';
  };

  const getCourseName = (id) => {
    const c = courses.find(c => c.id === id);
    return c ? c.name : '';
  };

  const isDuplicate = (courseTypeId, courseId, excludeId = null) => {
    return offerings.some(o =>
      o.courseTypeId === courseTypeId &&
      o.courseId === courseId &&
      o.id !== excludeId
    );
  };

  const handleAdd = () => {
    if (!newCourseTypeId || !newCourseId) {
      setError('Please select both course type and course');
      return;
    }
    const ctId = parseInt(newCourseTypeId, 10);
    const cId = parseInt(newCourseId, 10);
    if (isDuplicate(ctId, cId)) {
      setError('This course offering already exists');
      return;
    }
    const newOffering = {
      id: offerings.length ? Math.max(...offerings.map(o => o.id)) + 1 : 1,
      courseTypeId: ctId,
      courseId: cId,
    };
    setOfferings([...offerings, newOffering]);
    setNewCourseTypeId('');
    setNewCourseId('');
    setError('');
  };

  const handleEdit = (offering) => {
    setEditId(offering.id);
    setEditCourseTypeId(offering.courseTypeId.toString());
    setEditCourseId(offering.courseId.toString());
    setError('');
  };

  const handleUpdate = () => {
    if (!editCourseTypeId || !editCourseId) {
      setError('Please select both course type and course');
      return;
    }
    const ctId = parseInt(editCourseTypeId, 10);
    const cId = parseInt(editCourseId, 10);
    if (isDuplicate(ctId, cId, editId)) {
      setError('This course offering already exists');
      return;
    }
    setOfferings(offerings.map(o =>
      o.id === editId ? { ...o, courseTypeId: ctId, courseId: cId } : o
    ));
    setEditId(null);
    setEditCourseTypeId('');
    setEditCourseId('');
    setError('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      setOfferings(offerings.filter(o => o.id !== id));
      if (editId === id) {
        setEditId(null);
        setEditCourseTypeId('');
        setEditCourseId('');
        setError('');
      }
    }
  };

  const handleClear = () => {
    setNewCourseTypeId('');
    setNewCourseId('');
    setEditId(null);
    setEditCourseTypeId('');
    setEditCourseId('');
    setError('');
  };

  return (
    <div className="component-container">
      <h2>Course Offerings</h2>
      <div>
        <select
          className="styled-select"
          value={newCourseTypeId}
          onChange={(e) => setNewCourseTypeId(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map(ct => (
            <option key={ct.id} value={ct.id}>{ct.name}</option>
          ))}
        </select>
        <select
          className="styled-select"
          value={newCourseId}
          onChange={(e) => setNewCourseId(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={handleAdd} className="button-primary">Add</button>
        <button onClick={handleClear} className="button-secondary">Clear</button>
      </div>
      {error && <div className="error">{error}</div>}
      <ul>
        {offerings.map(o => (
          <li key={o.id} style={{ marginBottom: '8px' }}>
            {editId === o.id ? (
              <>
                <select
                  className="styled-select"
                  value={editCourseTypeId}
                  onChange={(e) => setEditCourseTypeId(e.target.value)}
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map(ct => (
                    <option key={ct.id} value={ct.id}>{ct.name}</option>
                  ))}
                </select>
                <select
                  className="styled-select"
                  value={editCourseId}
                  onChange={(e) => setEditCourseId(e.target.value)}
                  style={{ marginLeft: '10px' }}
                >
                  <option value="">Select Course</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button onClick={handleUpdate} style={{ marginLeft: '10px' }}>Save</button>
                <button onClick={() => { setEditId(null); setError(''); }} style={{ marginLeft: '5px' }}>Cancel</button>
              </>
            ) : (
              <>
                <span>{getCourseTypeName(o.courseTypeId)} - {getCourseName(o.courseId)}</span>
                <div className="button-group">
                  <button onClick={() => handleEdit(o)} className="button-primary">Edit</button>
                  <button onClick={() => handleDelete(o.id)} className="button-secondary">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseOfferings;
