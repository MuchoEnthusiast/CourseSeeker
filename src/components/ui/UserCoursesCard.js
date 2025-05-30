"use client";
import { useState } from "react";
import Link from "next/link";

export default function UserCoursesCard({ user }) {
  const [hover, setHover] = useState(false);
  const isTeacher = user.role === "teacher";
  const courses = user.courses || [];
  const title = isTeacher ? "Courses Taught" : "Courses Enrolled";

  const EmptyState = () => (
    <div className="text-center py-5 px-3">
      <div className="mb-3">
        {isTeacher ? (
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto text-muted">
            <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto text-muted">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <h6 className="text-muted mb-2">
        {isTeacher ? "No courses created yet" : "No courses enrolled yet"}
      </h6>
      <p className="text-muted small mb-3">
        {isTeacher
          ? "Start by creating your first course to begin teaching."
          : "Browse available courses and enroll to start learning."}
      </p>
      <Link
        href={isTeacher ? "/courses/create" : "/courses"}
        className="btn btn-outline-primary btn-sm"
        style={{ backgroundColor: "#9357f5", color: "#fff", borderColor: "#470ba9" }}
      >
        {isTeacher ? "Create Course" : "Browse Courses"}
      </Link>
    </div>
  );

  return (
    <div className="card border border-secondary shadow-sm h-100 w-100">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        {courses.length > 0 && (
          <span className="badge bg-secondary">{courses.length}</span>
        )}
      </div>

      {courses.length > 0 ? (
        <ul className="list-group list-group-flush">
          {courses.map((course, idx) => {

            return (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-decoration-none fw-semibold"
                    style={{ color: "#9357f5" }}
                  >
                    {course.name}
                  </Link>
                  {course.teacher && (
                    <div className="text-muted small mt-1">
                      Instructor: {course.teacher}
                    </div>
                  )}
                  {course.description && (
                    <div className="text-muted small mt-1">
                      {course.description.length > 80
                        ? `${course.description.substring(0, 80)}...`
                        : course.description}
                    </div>
                  )}
                </div>
                <div className="ms-3">
                  <Link
                    href={`/courses/${course.id}`}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: hover ? "#7b3fe8" : "#9357f5",
                      color: "#fff",
                      borderColor: "#470ba9",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    {isTeacher ? "Manage" : "View"}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState />
      )}

      {courses.length > 0 && (
        <div className="card-footer bg-light text-center">
          <Link
            href={isTeacher ? "/courses" : "/courses"}
            className="btn btn-sm btn-outline-secondary"
          >
            {isTeacher ? "Manage All Courses" : "Browse More Courses"}
          </Link>
        </div>
      )}
    </div>
  );
}
