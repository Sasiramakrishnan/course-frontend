import React from 'react';
import CourseDetail from './CourseDetail';

const CourseList = ({ courses, deleteCourse }) => {
  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name}
            <CourseDetail course={course} />
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
