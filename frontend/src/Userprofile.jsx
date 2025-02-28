import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; 
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Redirecting to login...");
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setFormData(res.data);
      } catch (error) {
        alert("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/profile/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      setUserData(formData);
      setEditMode(false);
    } catch (error) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/profile/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Account deleted successfully!");
      localStorage.removeItem("token");
      navigate("/signup");
    } catch (error) {
      alert("Error deleting account");
    }
  };

  return (
    <>
      <Navbar /> 
      <div className="profile-container">
        <h2>User Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <div className="profile-card">
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Full Name:</strong> {userData.fullName}</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Date of Birth:</strong> {userData.dob}</p>
                <p><strong>Country:</strong> {userData.country}</p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
                <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
              </div>
            )}
          </div>
        ) : (
          <p>Error loading profile</p>
        )}
      </div>
    </>
  );
};

export default UserProfile;
