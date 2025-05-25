import { getGrades } from "@/lib/data";
import { getDB } from "@/lib/db"

export default async function GradesTableStudent({ user, id }) {
  const grades = await getGrades(user.username, id)
  const average = grades.reduce((sum, g) => sum + g.gradeNumber, 0) / grades.length
  
  return (
     <div className="container mt-5">
      {grades.length > 0 ? (
        <>
        <div className="row fw-bold border-bottom pb-2 mb-3">
          <div className="col-4">Identifier</div>
          <div className="col-4">Date</div>
          <div className="col-4">Grade</div>
        </div>

        {grades.map((g, i) => (
          <div key={i} className="mb-3">
            <div className="row">
              <div className="col-4">{g.name}</div>
              <div className="col-4">{g.date}</div>
              <div className="col-4">{g.gradeNumber}</div>
            </div>
            {i < grades.length - 1 && <hr className="my-2" />}
          </div>
        ))}

        <hr className="border-3 border-dark my-4" />
        <div className="row fw-bold">
          <div className="col-4">Average</div>
          <div className="col-4"></div>
          <div className="col-4">{average.toFixed(2)}</div>
        </div>
      </>
      ) : (
        <span>No grades yet</span>
      )}
    </div>
  );
}