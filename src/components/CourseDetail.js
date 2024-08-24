import React from 'react';

const CourseDetail = ({ course }) => {
  return (
    <div>
      <h3>Course Details</h3>
      <p>ID: {course.id}</p>
      <p>Name: {course.name}</p>
    </div>
  );
};

export default CourseDetail;
