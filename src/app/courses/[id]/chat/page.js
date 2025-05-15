export default async function Chat({ params }) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Chat</h1>
      <p>Course ID: {id}</p>
    </div>
  );
}
