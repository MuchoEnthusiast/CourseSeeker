import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import Image from 'next/image';
import { getUserFromTokenCookie } from "../../lib/auth";
import { redirect } from 'next/navigation'

import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "react-bootstrap";
import CreateCourseButton from "@/components/ui/CreateCourseButton";
import SearchCourseField from '@/components/ui/SearchCourseField';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CourseSeeker",
  description: "Education platform",
};

export default async function RootLayout({ children }) {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <div className="wrapper">
          <header>
            <div className="header">
              <Link href="/" passHref className="logo">
                <Image
                  src="/courseseeker_logo.svg"
                  width={500}
                  height={500}
                  alt="Courseseeker logo"
                />
              </Link>
              <Link href="/" passHref>
                Home
              </Link>
              <Link href="/courses/" passHref>
                Courses</Link>
              <div className="find-course">
                <SearchCourseField />
              </div>
              <div className="d-flex gap-2 ms-auto">
                {user && user.role === 'admin' && (
                <Link href="/admin" className="ms-3">Admin</Link>
                 )}
                {user.role === "teacher" && (<CreateCourseButton />)}
                <Dropdown className="ms-auto">
                  <DropdownToggle variant="secondary" id="dropdown-basic">
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu variant="dark">
                    <DropdownItem href="/">Profile</DropdownItem>
                    <DropdownItem href="/logout">Log out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {/* <div className="d-flex gap-2 ms-auto">
              <NavbarDropdownMenu/>
              </div> */}
            </div>
          </header>
          <div className="main">
            {children}
          </div>
          <footer className="text-center text-muted py-3 small">
            © {new Date().getFullYear()} IT Slaves
          </footer>
        </div>
      </body>
    </html>
  );
}
