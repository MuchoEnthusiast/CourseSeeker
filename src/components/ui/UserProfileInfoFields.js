export default function UserInfoFields({ user, editMode, formData, handleChange }) {
  return (
    <>
      <div className="mb-3">
        <strong>Username:</strong> 
        <div className="text-muted">{user.username}</div>
      </div>
      <div className="mb-3">
        <strong>Name:</strong> 
        <div className="text-muted">{user.name} {user.surname}</div>
      </div>
      <div className="mb-3">
        <strong>Role:</strong> 
        <div className="text-muted">{user.role}</div>
      </div>

      {["nationality", "city", "country"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label fw-bold text-capitalize">{field}:</label>
          {editMode ? (
            <input
              type="text"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
            />
          ) : (
            <div className="text-muted">
              {user[field] || <span className="fst-italic">Not provided</span>}
            </div>
          )}
        </div>
      ))}

      <div className="mb-3">
        <label className="form-label fw-bold">Description:</label>
        {editMode ? (
          <textarea
            className="form-control"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        ) : (
          <div className="text-muted">
            {user.description || <span className="fst-italic">No description</span>}
          </div>
        )}
      </div>
    </>
  );
}