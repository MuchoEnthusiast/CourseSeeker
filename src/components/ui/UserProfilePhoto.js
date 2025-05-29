import { useEffect, useState } from "react";

export default function UserPhoto({ user, editMode, handlePhotoChange, handlePhotoDelete }) {
  const [preview, setPreview] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user.photo) {
      setPreview(`/uploads/${user.photo}`);
    }
  }, [user.photo]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && isClient) {
      setPreview(URL.createObjectURL(file));
      handlePhotoChange(e);
    }
  };

  const handleDelete = () => {
    if (isClient && window.confirm('Are you sure you want to delete your profile photo?')) {
      setPreview(null);
      handlePhotoDelete();
    }
  };

  return (
    <div className="text-center mb-3">
      <img
        src={preview || "/default-avatar.png"}
        alt="User"
        className="rounded-circle border"
        width={120}
        height={120}
        style={{ objectFit: 'cover' }}
      />
      {editMode && (
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            className="form-control form-control-sm mb-2"
            onChange={handleChange}
          />
          {(preview && preview !== "/default-avatar.png") && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
            >
              Delete Photo
            </button>
          )}
        </div>
      )}
    </div>
  );
}