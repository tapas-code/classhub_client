import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { BASE_URL } from "../services/helper";
import { useNavigate } from "react-router-dom";

const ManageClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [className, setClassName] = useState("");
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const base_url = BASE_URL;
  const navigate = useNavigate();

  // Fetch classrooms
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(`${base_url}/api/classroom/get-classrooms`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classrooms");
        }

        const data = await response.json();
        setClassrooms(data.classrooms);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClassrooms();
  }, [base_url, token]);

  // Fetch available teachers
  useEffect(() => {
    const fetchAvailableTeachers = async () => {
      try {
        const response = await fetch(`${base_url}/api/classroom/available-teachers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [base_url, token]);

  // Fetch all students
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetch(`${base_url}/api/auth/students`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setAllStudents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllStudents();
  }, [base_url, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("TeacherId: ", selectedTeacher);
    console.log("StudentsId: ", selectedStudents);
    try {
      const response = await fetch(`${base_url}/api/classroom/create-classroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: className,
          teacherId: selectedTeacher,
          studentIds: selectedStudents,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create classroom");
      }

      const data = await response.json();
      setClassrooms((prevClassrooms) => [...prevClassrooms, data.classroom]);
      setClassName("");
      setSelectedTeacher("");
      setSelectedStudents([]);
      document.getElementById("add_classroom_modal").close();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  if (error) {
    return <div className="flex-1">Error: {error}</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 flex justify-end pe-12">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => document.getElementById("add_classroom_modal").showModal()}
        >
          + Add
        </button>
      </div>

      <dialog id="add_classroom_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Classroom</h3>
          <form className="card-body p-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Classroom Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter classroom name"
                className="input input-bordered"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Assign Teacher</span>
              </label>
              <select
                className="select select-bordered"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                required
              >
                <option value="">Select a Teacher</option>
                {availableTeachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Assign Students</span>
              </label>
              <div className="overflow-y-auto h-40 border rounded-lg p-2">
                {allStudents.map((student) => (
                  <label
                    key={student._id}
                    className="flex items-center space-x-3 mb-2"
                  >
                    <input
                      type="checkbox"
                      value={student._id}
                      onChange={() => handleStudentSelection(student._id)}
                      className="checkbox"
                    />
                    <span className="label-text">{student.username}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Create Classroom
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      <div className="flex flex-wrap w-full gap-16 p-8">
        {classrooms.map((cls) => (
          <div
            key={cls._id}
            className="min-w-60 min-h-40 bg-primary shadow-lg flex items-end justify-center text-xl font-semibold text-black hover:scale-105 hover:cursor-pointer rounded-lg pb-3 "
            onClick={() => navigate(`/principal/classroom/${cls._id}`)}
          >
            {cls.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClassrooms;
