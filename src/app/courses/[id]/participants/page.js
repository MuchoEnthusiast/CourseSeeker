export default async function Participants({ params }) {
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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="w-50">Name / Surname</th>
            <th className="w-25">Role</th>
            <th className="w-25">Last visited</th>
          </tr>
        </thead>
        <tbody>
          {course.participants.map((user, idx) => (
            <tr key={idx}>
              <td>
                <div className="d-flex align-items-center">
                  {/* <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      marginRight: '10px',
                      color: 'white',
                      fontSize: '1.2rem',
                    }}
                  >
                    <i className="bi bi-person" />
                  </div> */}
                  <span>{user.name + " " + user.surname}</span>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{new Date(user.lastVisited).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}