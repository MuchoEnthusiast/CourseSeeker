export default async function Participants({ params }) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Participants</h1>
      <p>Course ID: {id}</p>
    </div>
  );
}
