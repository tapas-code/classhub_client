import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { BASE_URL } from "../services/helper";

const Classroom = () => {
  const { id } = useParams(); // Get classroom ID from the route parameters
  const [classroom, setClassroom] = useState(null);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch classroom details and available students
  const fetchClassroomData = async () => {
    try {
      // Fetch classroom details
      const classroomResponse = await fetch(
        `${BASE_URL}/api/classroom/get-classroom/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!classroomResponse.ok) {
        throw new Error("Failed to fetch classroom");
      }

      const classroomData = await classroomResponse.json();
      setClassroom(classroomData.classroom);

      // Fetch available students
      const studentsResponse = await fetch(
        `${BASE_URL}/api/classroom/available-students?classroomId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!studentsResponse.ok) {
        throw new Error("Failed to fetch available students");
      }

      const studentsData = await studentsResponse.json();
      setAvailableStudents(studentsData.students);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClassroomData();
  }, [id, token]);

  useEffect(() => {
    if (selectedStudents.length > 0) {
      handleAddStudents();
    }
  }, [selectedStudents]);

  const handleAddStudents = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/classroom/assign-students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

      // Refetch the classroom and available students to reflect changes in real-time
      await fetchClassroomData();
      setSelectedStudents([]); // Reset selected students
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStudentCheckboxChange = (studentId, isChecked) => {
    alert("Confirm Add Student");
    setSelectedStudents((prevSelected) =>
      isChecked
        ? [...prevSelected, studentId]
        : prevSelected.filter((id) => id !== studentId)
    );
  };

  if (error) {
    return <div className="flex-1">Error: {error}</div>;
  }

  return (
    <div className="flex-1 p-4 overflow-auto">
      {classroom && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {classroom.name}
          </h2>
          <div className="mb-8 flex justify-center">
            {/* <h3 className="text-xl font-semibold">Assigned Teacher</h3> */}
            {classroom.teacher ? (
              <>
                <div className="card sm:card-side bg-base-300 shadow-xl max-w-lg w-full">
                  <figure>
                    <img
                      src={classroom.teacher.userImg}
                      alt={classroom.teacher.username}
                      className="w-52"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title underline underline-offset-2">
                      Teacher
                    </h2>
                    <p className="capitalize font-semibold text-lg">
                      {classroom.teacher.username}
                    </p>
                    <p className="-mt-3"> ({classroom.teacher.email})</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Details</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>No teacher assigned</div>
            )}
          </div>

          <div className="flex w-full px-8 pb-4">
            <div className="card bg-base-300 rounded-box flex flex-grow items-start justify-start w-1/2">
              <div className="mb-8 w-full">
                <h3 className="text-xl font-semibold text-center py-4">
                  Assigned Students
                </h3>
                <div className="flex flex-wrap gap-8 px-8">
                  {classroom.students.map((student) => (
                    <div
                      key={student._id}
                      className="w-[124px] rounded-lg overflow-hidden relative hover:cursor-pointer hover:scale-105"
                    >
                      <img src={student.userImg} alt={student.username} />
                      <div className="absolute text-center text-white font-semibold capitalize text-sm bottom-0 bg-purple-700 p-2 rounded-tr-lg">
                        {student.username}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="card bg-base-300 rounded-box flex flex-grow items-start justify-start w-1/2 ">
              <div className="mb-8  w-full">
                <h3 className="text-xl font-semibold text-center py-4 ">
                  Available Students
                </h3>
                {availableStudents.length > 0 ? (
                  <div>
                    <ul className="list-none flex flex-wrap gap-8 px-8">
                      {availableStudents.map((student) => (
                        <li key={student._id}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="hidden"
                              value={student._id}
                              onChange={(e) =>
                                handleStudentCheckboxChange(
                                  student._id,
                                  e.target.checked
                                )
                              }
                            />
                            <div className="w-[124px] rounded-lg overflow-hidden relative hover:cursor-pointer hover:scale-105">
                              <img
                                src={student.userImg}
                                alt={student.username}
                              />
                              <div className="absolute text-center text-white font-semibold capitalize text-sm bottom-0 bg-purple-700 p-2 rounded-tr-lg">
                                {student.username}
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>No students available</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Classroom;
