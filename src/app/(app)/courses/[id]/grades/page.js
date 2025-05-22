export default async function Grades({ params }) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Grades</h1>
      <p>Course ID: {id}</p>
    </div>
  );
}
