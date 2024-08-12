import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { BASE_URL } from "../services/helper";

const ManageClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [className, setClassName] = useState("");
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const base_url = BASE_URL;

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await fetch(
          `${base_url}/api/classroom/get-classrooms`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Classrooms");
        }

        const data = await response.json();
        setClassrooms(data.classrooms);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${base_url}/api/classroom/create-classroom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: className }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create classroom");
      }

      const data = await response.json();
      setClassrooms((prevClassrooms) => [...prevClassrooms, data.classroom]);
      setClassName(""); 
      document.getElementById("add_classroom_modal").close();
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div className="flex-1">Error: {error}</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 flex justify-end pe-12">
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            document.getElementById("add_classroom_modal").showModal()
          }
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
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
                value={className}
                name="name"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      <div className="flex flex-wrap w-full gap-16 p-8">
        {classrooms &&
          classrooms.map((cls) => (
            <div
              key={cls._id}
              className="min-w-60 min-h-40 bg-primary shadow-lg flex items-end justify-center text-xl font-semibold text-black hover:scale-105 hover:cursor-pointer rounded-lg pb-3 "
            >
              {cls.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageClassrooms;
