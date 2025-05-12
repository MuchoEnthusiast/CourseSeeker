// Header component
export default function Header() {
  return (
    <header className="header">
      <div className="logo">CourseSeeker</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/courses/browse">Courses</a></li>
          <li><a href="/dashboard/student">Dashboard</a></li>
          <li><a href="/(auth)/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}
