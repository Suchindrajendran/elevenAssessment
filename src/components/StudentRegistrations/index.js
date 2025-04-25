import React, { useState } from 'react';
import '../../styles/selectStyles.css';
import '../../styles/componentStyles.css';
import '../../styles/buttonStyles.css';

function StudentRegistrations() {
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
  const [offerings] = useState([
    { id: 1, courseTypeId: 1, courseId: 2 }, // Individual - English
    { id: 2, courseTypeId: 2, courseId: 1 }, // Group - Hindi
  ]);

  const [registrations, setRegistrations] = useState([]);
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  const filteredOfferings = selectedCourseTypeId
    ? offerings.filter(o => o.courseTypeId === parseInt(selectedCourseTypeId, 10))
    : offerings;

  const getCourseTypeName = (id) => {
    const ct = courseTypes.find(ct => ct.id === id);
    return ct ? ct.name : '';
  };

  const getCourseName = (id) => {
    const c = courses.find(c => c.id === id);
    return c ? c.name : '';
  };

  const handleRegister = () => {
    if (!studentName.trim()) {
      setError('Student name cannot be empty');
      return;
    }
    if (!selectedOfferingId) {
      setError('Please select a course offering');
      return;
    }
    const newRegistration = {
      id: registrations.length ? Math.max(...registrations.map(r => r.id)) + 1 : 1,
      studentName: studentName.trim(),
      offeringId: parseInt(selectedOfferingId, 10),
    };
    setRegistrations([...registrations, newRegistration]);
    setStudentName('');
    setError('');
  };

  const handleClear = () => {
    setSelectedCourseTypeId('');
    setSelectedOfferingId('');
    setStudentName('');
    setError('');
  };

  const registeredStudents = registrations.filter(r => r.offeringId === parseInt(selectedOfferingId, 10));

  return (
    <div className="component-container">
      <h2>Student Registrations</h2>
      <div>
        <label>
          Filter by Course Type:{' '}
          <select
            className="styled-select"
            value={selectedCourseTypeId}
            onChange={(e) => {
              setSelectedCourseTypeId(e.target.value);
              setSelectedOfferingId('');
            }}
          >
            <option value="">All</option>
            {courseTypes.map(ct => (
              <option key={ct.id} value={ct.id}>{ct.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Select Course Offering:{' '}
          <select
            className="styled-select"
            value={selectedOfferingId}
            onChange={(e) => setSelectedOfferingId(e.target.value)}
          >
            <option value="">Select</option>
            {filteredOfferings.map(o => (
              <option key={o.id} value={o.id}>
                {getCourseTypeName(o.courseTypeId)} - {getCourseName(o.courseId)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button onClick={handleRegister} className="button-primary">Register</button>
        <button onClick={handleClear} className="button-secondary">Clear</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div style={{ marginTop: '20px' }}>
        <h3>Registered Students</h3>
        {selectedOfferingId ? (
          registeredStudents.length ? (
            <ul>
              {registeredStudents.map(r => (
                <li key={r.id}>{r.studentName}</li>
              ))}
            </ul>
          ) : (
            <p>No students registered for this offering.</p>
          )
        ) : (
          <p>Please select a course offering to see registered students.</p>
        )}
      </div>
    </div>
  );
}

export default StudentRegistrations;
