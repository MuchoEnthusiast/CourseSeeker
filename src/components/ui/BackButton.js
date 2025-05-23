'use client'
import { useRouter } from 'next/navigation'


export default function BackButton() {
  const router = useRouter()

  return (
    <button
      className="btn btn-link text-decoration-none p-3 p-0"
      onClick={() => router.back()}
    >
      <i className="bi bi-chevron-left fs-3"></i>
    </button>
  )
}
