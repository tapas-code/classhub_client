import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/helper";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();
  const base_url = BASE_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${base_url}/api/auth/students`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return <div className="flex-1">Error: {error}</div>;
  }
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 flex justify-end pe-12">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/principal/student/add")}
        >
          + Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((user) => (
                <tr key={user._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.userImg} alt={user.username} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold capitalize">
                          {user.username}
                        </div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
