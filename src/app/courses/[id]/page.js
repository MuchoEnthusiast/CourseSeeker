import Topic from "@/components/ui/Topic";

export default async function Course({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    cache: "no-store",
  });

  if(!res.ok) {
    notFound()
  }

  const course = await res.json()
  
  return (
    <div>
      {
        course.topics.map((topic, index) => (
          <Topic key = {index} topic = {topic} />
        ))
      }
    </div>
  );
}
