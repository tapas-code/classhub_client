import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import { useAuth } from "../store/auth";

const Classroom = () => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch classroom details
  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/classroom/get-classroom/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch classroom details");
        }

        const data = await response.json();
        setClassroom(data.classroom);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClassroom();
  }, [id, token]);

  // Fetch available teachers
  useEffect(() => {
    const fetchAvailableTeachers = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/classroom/available-teachers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch available teachers");
        }

        const data = await response.json();
        setAvailableTeachers(data.teachers);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAvailableTeachers();
  }, [token]);

  // Fetch available students (excluding those already assigned to the classroom)
  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/classroom/available-students?classroomId=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch available students");
        }

        const data = await response.json();
        setAllStudents(data.students);
        
      } catch (error) {
        console.error("Error fetching available students:", error);
      }
    };

    fetchAvailableStudents();
  }, [id, token]);

  const handleAssignStudents = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/classroom/assign-students`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentIds: selectedStudents,
            classroomId: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign students");
      }

      const data = await response.json();
      console.log("Students assigned successfully:", data);
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  // Handle assigning teacher to the classroom
  const handleAssignTeacher = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/classroom/assign-teacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teacherId: selectedTeacher, classroomId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign teacher");
      }

      const data = await response.json();
      setClassroom(data.classroom); // Update classroom with the assigned teacher
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="flex-1">Error: {error}</div>;
  }

  if (!classroom) {
    return <div className="flex-1">Loading...</div>;
  }

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold mb-4">{classroom.name}</h1>

      <div>
        <h2 className="text-xl font-semibold">
          Teacher: {classroom.teacher?.username || "Not Assigned"}
        </h2>

        {!classroom.teacher && (
          <div className="mt-4">
            <label className="block text-lg font-semibold mb-2">
              Assign a Teacher:
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select a Teacher</option>
              {availableTeachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.username}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary mt-4"
              onClick={handleAssignTeacher}
              disabled={!selectedTeacher}
            >
              Assign Teacher
            </button>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-4">Students:</h3>
      <ul className="list-disc pl-8">
        {classroom.students.length > 0 ? (
          classroom.students.map((student) => (
            <li key={student._id}>{student.username}</li>
          ))
        ) : (
          <li>No students assigned</li>
        )}
      </ul>
      <div>
        <h3>Available Students</h3>
        <ul>
          {allStudents.map((student) => (
            <li key={student._id}>
              <label>
                <input
                  type='checkbox'
                  value={student._id}
                  onChange={() => handleStudentSelection(student._id)}
                />
                {student.username}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleAssignStudents} className='btn btn-primary'>
        Assign Selected Students
      </button>
    </div>
  );
};

export default Classroom;
