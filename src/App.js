import React, { useState } from 'react';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';

function App() {
  const [activeTab, setActiveTab] = useState('courseTypes');
  const [resetKey, setResetKey] = useState(0);

  const handleClearAll = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container">
      <h1 className="heading">Course Management System</h1>
      <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={() => setActiveTab('courseTypes')} disabled={activeTab === 'courseTypes'}>Course Types</button>
        <button onClick={() => setActiveTab('courses')} disabled={activeTab === 'courses'} style={{ marginLeft: '10px' }}>Courses</button>
        <button onClick={() => setActiveTab('courseOfferings')} disabled={activeTab === 'courseOfferings'} style={{ marginLeft: '10px' }}>Course Offerings</button>
        <button onClick={() => setActiveTab('studentRegistrations')} disabled={activeTab === 'studentRegistrations'} style={{ marginLeft: '10px' }}>Student Registrations</button>
        <button onClick={handleClearAll} style={{ marginLeft: '20px', backgroundColor: '#f44336', color: 'white' }}>Clear All</button>
      </nav>

      {activeTab === 'courseTypes' && <CourseTypes key={resetKey} />}
      {activeTab === 'courses' && <Courses key={resetKey} />}
      {activeTab === 'courseOfferings' && <CourseOfferings key={resetKey} />}
      {activeTab === 'studentRegistrations' && <StudentRegistrations key={resetKey} />}
    </div>
  );
}

export default App;
