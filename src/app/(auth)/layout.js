import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'

export const metadata = {
  title: 'CourseSeeker',
  description: 'Education platform',
}

//This is the root layout of the non authenticated area
//It wraps pages like login, register and logout
export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
