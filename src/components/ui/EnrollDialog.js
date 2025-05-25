'use client'
import { useRouter } from 'next/navigation'

export default function EnrollDialog({ user, id }) {
  const router = useRouter()

  const handleEnroll = async () => {
    const res = await fetch('/api/courses/' + id + '/enroll')

    if(res.ok) {
        router.refresh()
    } else {
        alert('Error enrolling')
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3 rounded-4">
      <h3 className="mb-4 text-dark">You are not enrolled</h3>

      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => router.back()}
        >
          ← Go Back
        </button>

        <button
          className="btn btn-success btn-lg"
          onClick={handleEnroll}
        >
          Enroll Now →
        </button>
      </div>
    </div>
  )
}