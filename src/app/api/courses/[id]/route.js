const courses = {
  "1": { 
    id: "1", 
    name: "React Basics",
    topics: [
      {
        title: "Topic 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        attachments: [
          {
            name: "Attachment1",
            id: "1"
          },
          {
            name: "Attachment2",
            id: "2"
          },
          {
            name: "Attachment3",
            id: "3"
          },
          {
            name: "Attachment4",
            id: "4"
          }
        ]
      },
      {
        title: "Topic 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        attachments: [
          {
            name: "Attachment1",
            id: "5"
          }
        ]
      }
    ],
    participants: [
      {
        username: "username",
        role: "Student",
        name: "Name",
        surname: "Surname",
        lastVisited: 0,
      }
    ],
    chat: {
      messages: [
        {
          username: "User1",
          message: "Ciao tutti ! ! !",
          timestamp: 0
        },
        {
          username: "User2",
          message: "Ciao tutti ! ! !",
          timestamp: 0
        }
      ]
    }
  },
  "2": { 
    id: "2", 
    name: "Nextjs Advanced",
    topics: [
      {
        title: "Topic 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        attachments: [
          {
            name: "Attachment1",
            id: "6"
          }
        ]
      },
      {
        title: "Topic 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        attachments: [
          {
            name: "Attachment1",
            id: "7"
          }
        ]
      }
    ],
    participants: [
      {
        username: "username",
        role: "Student",
        name: "Name",
        surname: "Surname",
        lastVisited: 0,
      }
    ],
    chat: {
      messages: [
        {
          username: "User1",
          message: "Ciao tutti ! ! !",
          timestamp: 0
        },
        {
          username: "User2",
          message: "Ciao tutti ! ! !",
          timestamp: 0
        }
      ]
    }
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