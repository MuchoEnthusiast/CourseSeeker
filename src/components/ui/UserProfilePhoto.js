"use client";
import { useEffect, useState } from "react";

export default function UserPhoto({ user, editMode, handlePhotoChange, handlePhotoDelete }) {
  const imgUrlDefault = '/default-avatar.svg';
  const [preview, setPreview] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    (async () => {
      setIsClient(true);

      const imgUrl = '/profile/' + user.username + '/image';
      const res = await fetch(imgUrl)
      setPreview(res.ok ? imgUrl : '')
    })()
  }, [editMode]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && isClient) {
      setPreview(URL.createObjectURL(file));
      handlePhotoChange(e);
    }
  };

  const handleDelete = () => {
    if (isClient) {
      setPreview(null);
      handlePhotoDelete();
    }
  };

  return (
    <div className="text-center mb-3">
      <img
        src={preview || imgUrlDefault}
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
          {(preview && imgUrlDefault) && (
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