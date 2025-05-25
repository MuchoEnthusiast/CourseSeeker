'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CourseGrid({ user, enrolledCourses, allCourses, searchQuery }) {
  const [showAll, setShowAll] = useState(true)
  
  const courses = showAll ? allCourses : enrolledCourses

  useEffect(() => {
    setShowAll(window.localStorage.getItem('courses_page_show_all') === 'true' ? true : false)
  }, [])

  const handleShowAll = () => {
    setShowAll(!showAll)
    localStorage.setItem('courses_page_show_all', !showAll)
  }
  

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ciao, {user.username}!</h2>
        {/* <button className="btn btn-outline-primary" onClick={handleShowAll}>
          {showAll ? 'Show Enrolled Only' : 'Show All Courses'}
        </button> */}
        <button className={`btn ${!showAll ? 'btn-primary' : 'btn-outline-primary'}`} onClick={handleShowAll} >
          Show Enrolled Only
        </button>
      </div>

      {searchQuery && (
        <h3>Search results for: "{searchQuery}"</h3>
      )}

      <div className="row g-4">
        {courses.length > 0 ? courses.map(course => (
          <div key={course.id} className="col-md-4">
            <div className="card shadow border-0" style={{
              borderRadius: '20px',
              border: '4px solid #9b30d9',
              overflow: 'hidden'
            }}>
              <div className="card-body d-flex justify-content-between align-items-start" style={{ minHeight: '120px' }}>
                <div>
                  <h5 className="card-title mb-1">{course.name}</h5>
                  <p className="card-subtitle text-muted" style={{ fontSize: '0.9rem' }}>
                    {course.teacher}
                  </p>
                  {enrolledCourses.some(c => c.id === course.id) && (<span className="card-subtitle text-success" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Enrolled</span>)}
                </div>
                <i className="bi bi-image text-muted fs-3"></i>
              </div>
              <div className="card-footer bg-light border-0 p-0">
                <Link
                  href={`/courses/${course.id}`}
                  className="btn btn-lg w-100 text-white"
                  style={{
                    backgroundColor: '#c287f5',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center px-3">
                    <span>View details</span>
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )) : (
                <h4>No courses available</h4>
             )}
      </div>
    </div>
  ) 
}