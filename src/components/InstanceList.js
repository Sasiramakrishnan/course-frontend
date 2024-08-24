import React from 'react';

const InstanceList = ({ instances, deleteInstance }) => {
  return (
    <div>
      <h2>Instance List</h2>
      <ul>
        {instances.map(instance => (
          <li key={instance.id}>
            Course ID: {instance.courseId}, Year: {instance.year}, Semester: {instance.semester}
            <button onClick={() => deleteInstance(instance.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstanceList;
