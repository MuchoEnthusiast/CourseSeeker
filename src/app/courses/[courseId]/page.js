// Course details page
export default function CourseDetailsPage({ params }) {
  const { courseId } = params;
  
  return (
    <div>
      <h1>Course Details</h1>
      <p>Course ID: {courseId}</p>
      {/* Course details will go here */}
    </div>
  );
}
