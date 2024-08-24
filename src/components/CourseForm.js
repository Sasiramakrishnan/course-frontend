import React, { useState } from 'react';

const CourseForm = ({ addCourse }) => {
  const [courseName, setCourseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName) return;
    const newCourse = {
      id: Date.now(),
      name: courseName,
    };
    addCourse(newCourse);
    setCourseName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
