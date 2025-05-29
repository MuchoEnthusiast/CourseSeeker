export default function UserCoursesCard({ user }) {
  return (
    <div className="card border border-secondary">
      <div className="card-header">
        <h5 className="mb-0">
          {user.role === "teacher" ? "Courses Taught" : "Courses Enrolled"}
        </h5>
      </div>
      <div className="card-body">
        {user.courses && user.courses.length > 0 ? (
          <ul className="list-group list-group-flush">
            {user.courses.map((course, idx) => (
              <li key={idx} className="list-group-item">
                {course.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No courses found.</p>
        )}
      </div>
    </div>
  );
} 
