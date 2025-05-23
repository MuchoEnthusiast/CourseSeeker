// Browse courses page
export default function BrowseCoursesPage() {
  // return (
  //   <div>
  //     <h1>Browse Courses</h1>
  //     {/* Course browsing interface will go here */}
  //   </div>
  // );

  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <h1>Browse Courses</h1>
      <div style={styles.courseContainer}>
        {courses.map((course) => (
          <div key={course} style={styles.courseCard}>
            <div style={styles.imagePlaceholder}></div>
            <div style={styles.textPlaceholder}></div>
            <div style={styles.textPlaceholder}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  courseContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  courseCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  imagePlaceholder: {
    width: '100%',
    height: '150px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  textPlaceholder: {
    width: '80%',
    height: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    marginBottom: '10px',
  },
}
