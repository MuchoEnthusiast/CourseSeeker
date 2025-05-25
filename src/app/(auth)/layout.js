import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'

export const metadata = {
  title: 'CourseSeeker',
  description: 'Education platform',
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
