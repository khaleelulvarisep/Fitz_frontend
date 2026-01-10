import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditUser() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser?.id) {
      axios
        .get(`http://localhost:5000/users/${storedUser.id}`)
        .then((res) => {
          setUser(res.data);
          setFormData({
            name: res.data.name,
            password: "",
            confirmPassword: "",
          });
        })
        .catch((err) => console.error("Error fetching user:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, password, confirmPassword } = formData;

    if (!name || !password || !confirmPassword) {
      toast.info("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
     toast.error("Passwords do not match.");
      return;
    }

    try {
      const updatedUser = {
        ...user,
        name,
        password,
      };

      await axios.patch(`http://localhost:5000/users/${user.id}`, updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
     toast.success("Profile updated successfully!");
      navigate("/user");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile. Try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-sky-600 text-xl font-semibold">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg font-medium">
        No user found. Please log in.
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-sky-100 flex flex-col">
        <h2 className="text-3xl font-bold text-sky-700 text-center mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
