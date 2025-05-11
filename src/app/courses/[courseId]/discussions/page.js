// Course discussions page
export default function CourseDiscussionsPage({ params }) {
  const { courseId } = params;
  
  return (
    <div>
      <h1>Course Discussions</h1>
      <p>Course ID: {courseId}</p>
      {/* Course discussions will go here */}
    </div>
  );
}
