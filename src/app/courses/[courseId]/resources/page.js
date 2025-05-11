// Course resources page
export default function CourseResourcesPage({ params }) {
  const { courseId } = params;
  
  return (
    <div>
      <h1>Course Resources</h1>
      <p>Course ID: {courseId}</p>
      {/* Course resources will go here */}
    </div>
  );
}
