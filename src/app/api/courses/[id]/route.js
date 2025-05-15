const courses = {
  "1": { 
    id: "1", 
    name: "React Basics",
    topics: [
      {
        title: "Topic 1",
        description: "Test description 1",
        attachments: [
          {
            name: "Attachment1",
            id: "1"
          }
        ]
      },
      {
        title: "Topic 2",
        description: "Test description 2",
        attachments: [
          {
            name: "Attachment1",
            id: "2"
          }
        ]
      }
    ]
  },
  "2": { 
    id: "2", 
    name: "Nextjs Advanced",
    topics: [
      {
        title: "Topic 1",
        description: "Test description 1",
        attachments: [
          {
            name: "Attachment1",
            id: "1"
          }
        ]
      },
      {
        title: "Topic 2",
        description: "Test description 2",
        attachments: [
          {
            name: "Attachment1",
            id: "2"
          }
        ]
      }
    ]
  }
}

export async function GET(request, { params }) {
  const { id } = await params
  const course = courses[id]

  if (!course) {
    return new Response(JSON.stringify({ error: "Course not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(course), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}