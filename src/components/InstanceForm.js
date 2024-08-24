import React, { useState } from 'react';

const InstanceForm = ({ addInstance, courses }) => {
  const [courseId, setCourseId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseId || !year || !semester) return;
    const newInstance = {
      id: Date.now(),
      courseId,
      year,
      semester,
    };
    addInstance(newInstance);
    setCourseId('');
    setYear('');
    setSemester('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />
      <button type="submit">Add Instance</button>
    </form>
  );
};

export default InstanceForm;
