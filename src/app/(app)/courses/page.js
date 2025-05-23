'use client';
import { useEffect, useState } from 'react';

// Browse courses page
export default function BrowseCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={styles.heading}>Browse Courses</h1>
      <div style={styles.courseContainer}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.imagePlaceholder}></div>
            <h3 style={styles.courseTitle}>{course.title}</h3>
            <p style={styles.courseDescription}>
              {course.description || 'No description available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: '2rem',
    color: '#333',
  },
  courseContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  imagePlaceholder: {
    width: '100%',
    height: '150px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  courseTitle: {
    margin: '10px 0',
    fontSize: '1.2rem',
    color: '#333',
    textAlign: 'center',
  },
  courseDescription: {
    color: '#666',
    fontSize: '0.9rem',
    textAlign: 'center',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
  loadingSpinner: {
    color: '#333',
    fontSize: '1.2rem',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
    color: '#dc3545',
  },
}
