import React, { useState } from 'react';
import './App.css';

// Simple encryption and decryption functions
const encrypt = (text) => {
  return btoa(text); // Encode to Base64
};

const decrypt = (text) => {
  return atob(text); // Decode from Base64
};

function App() {
  // State for courses
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  // State for course instances
  const [courseInstances, setCourseInstances] = useState([]);
  const [instanceYear, setInstanceYear] = useState('');
  const [instanceSemester, setInstanceSemester] = useState('');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null); // State to manage viewing course details

  // Function to handle adding a course
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseTitle || !courseCode || !courseDescription) return;

    const newCourse = {
      title: encrypt(courseTitle), // Encrypt course title
      code: encrypt(courseCode), // Encrypt course code
      description: encrypt(courseDescription), // Encrypt course description
    };

    setCourses([...courses, newCourse]);
    setCourseTitle('');
    setCourseCode('');
    setCourseDescription('');
  };

  // Function to handle deleting a course
  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    // Remove instances associated with the deleted course
    const updatedInstances = courseInstances.filter(instance => instance.courseId !== index);
    setCourseInstances(updatedInstances);
  };

  // Function to handle adding a course instance
  const handleAddInstance = (e) => {
    e.preventDefault();
    if (!instanceYear || !instanceSemester || selectedCourseIndex === null) return;

    const newInstance = {
      year: instanceYear,
      semester: instanceSemester,
      courseId: selectedCourseIndex, // Store index as Course ID
    };

    setCourseInstances([...courseInstances, newInstance]);
    setInstanceYear('');
    setInstanceSemester('');
  };

  // Function to handle deleting a course instance
  const handleDeleteInstance = (index) => {
    const updatedInstances = courseInstances.filter((_, i) => i !== index);
    setCourseInstances(updatedInstances);
  };

  // Function to handle viewing course details
  const handleViewCourse = (index) => {
    setViewingCourse(courses[index]);
  };

  // Function to close the course detail view
  const handleCloseView = () => {
    setViewingCourse(null);
  };

  return (
    <div className="container">
      <h1>Course Management System</h1>

      {/* Add Course Form */}
      <h2>Add Course</h2>
      <form onSubmit={handleAddCourse}>
        <input 
          type="text" 
          placeholder="Course Title" 
          value={courseTitle} 
          onChange={(e) => setCourseTitle(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Course Code" 
          value={courseCode} 
          onChange={(e) => setCourseCode(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Course Description" 
          value={courseDescription} 
          onChange={(e) => setCourseDescription(e.target.value)} 
          required 
        />
        <button type="submit">Add Course</button>
      </form>

      {/* List of Courses */}
      <h2>Courses List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="4">No courses available.</td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr key={index}>
                <td>{decrypt(course.title)}</td> {/* Decrypt for display */}
                <td>{decrypt(course.code)}</td> {/* Decrypt for display */}
                <td>{decrypt(course.description)}</td> {/* Decrypt for display */}
                <td>
                  <button onClick={() => handleViewCourse(index)}>View</button>
                  <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Course Instance Form */}
      <h2>Add Course Delivery Instance</h2>
      <form onSubmit={handleAddInstance}>
        <select onChange={(e) => setSelectedCourseIndex(e.target.value)} value={selectedCourseIndex ?? ''} required>
          <option value="" disabled>Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={index}>{decrypt(course.title)}</option> // Decrypt for display
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Year (YYYY)" 
          value={instanceYear} 
          onChange={(e) => setInstanceYear(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Semester (1 or 2)" 
          value={instanceSemester} 
          onChange={(e) => setInstanceSemester(e.target.value)} 
          required 
        />
        <button type="submit">Add Instance</button>
      </form>

      {/* List of Course Instances */}
      <h2>Course Delivery Instances</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseInstances.length === 0 ? (
            <tr>
              <td colSpan="4">No instances available.</td>
            </tr>
          ) : (
            courseInstances.map((instance, index) => (
              <tr key={index}>
                <td>{decrypt(courses[instance.courseId].title)}</td> {/* Decrypt for display */}
                <td>{instance.year}</td>
                <td>{instance.semester}</td>
                <td>
                  <button onClick={() => alert(`Viewing instance of ${decrypt(courses[instance.courseId].title)}`)}>View</button>
                  <button onClick={() => handleDeleteInstance(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Viewing Course Details */}
      {viewingCourse && (
        <div className="course-details">
          <h2>Course Details</h2>
          <p><strong>Course Title:</strong> {decrypt(viewingCourse.title)}</p> {/* Decrypt for display */}
          <p><strong>Course Code:</strong> {decrypt(viewingCourse.code)}</p> {/* Decrypt for display */}
          <p><strong>Description:</strong> {decrypt(viewingCourse.description)}</p> {/* Decrypt for display */}
          <h3>Course Instances</h3>
          {courseInstances.filter(instance => instance.courseId === courses.indexOf(viewingCourse)).length === 0 ? (
            <p>No instances for this course.</p>
          ) : (
            <ul>
              {courseInstances.filter(instance => instance.courseId === courses.indexOf(viewingCourse)).map((instance, index) => (
                <li key={index}>
                  Year: {instance.year}, Semester: {instance.semester}
                  <button onClick={() => handleDeleteInstance(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleCloseView}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
