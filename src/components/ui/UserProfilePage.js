"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPhoto from "./UserProfilePhoto";
import UserInfoFields from "./UserProfileInfoFields";
import UserCoursesCard from "./UserCoursesCard";

export default function UserProfilePage({ user }) {
  const [editHover, setEditHover] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nationality: user.nationality || "",
    city: user.city || "",
    country: user.country || "",
    description: user.description || "",
    photo: null,
    deletePhoto: false,
  });

  const toggleEdit = () => {
    setEditMode(!editMode);
    // Reset form data when canceling edit
    if (editMode) {
      setFormData({
        nationality: user.nationality || "",
        city: user.city || "",
        country: user.country || "",
        description: user.description || "",
        photo: null,
        deletePhoto: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({ 
      ...prev, 
      photo: e.target.files[0],
      deletePhoto: false // Reset delete flag if new photo is selected
    }));
  };

  const handlePhotoDelete = () => {
    setFormData((prev) => ({ 
      ...prev, 
      photo: null,
      deletePhoto: true 
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("nationality", formData.nationality);
      form.append("city", formData.city);
      form.append("country", formData.country);
      form.append("description", formData.description);
      form.append("deletePhoto", formData.deletePhoto.toString());
      
      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        body: form,
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const errorData = await res.json();
        alert(`Save failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Save failed: Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Left: User Info */}
        <div className="col-md-6">
          <div className="card border border-secondary shadow-sm">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">User Details</h5>
              <button
                className="btn btn-sm"
                onClick={toggleEdit}
                onMouseEnter={() => setEditHover(true)}
                onMouseLeave={() => setEditHover(false)}
                style={{
                  backgroundColor: editHover ? "#7b3fe8" : "#9357f5",
                  color: "#fff",
                  borderColor: "#470ba9",
                  transition: "background-color 0.2s ease",
                }}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <div className="card-body">
              <UserPhoto 
                user={user} 
                editMode={editMode} 
                handlePhotoChange={handlePhotoChange}
                handlePhotoDelete={handlePhotoDelete}
              />
              <UserInfoFields 
                user={user} 
                editMode={editMode} 
                formData={formData} 
                handleChange={handleChange} 
              />

              {editMode && (
                <div className="text-end mt-4 border-top pt-3">
                  <button 
                    className="btn btn-success"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Course Info */}
        <div className="col-md-6">
          <UserCoursesCard user={user} />
        </div>
      </div>
    </div>
  );
}