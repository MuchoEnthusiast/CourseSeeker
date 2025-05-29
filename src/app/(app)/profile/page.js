import UserProfilePage from '@/components/ui/UserProfilePage';
import { getUserFromTokenCookie } from '@/lib/auth';
import { getUserDetailsAndCourses } from '@/lib/data';

export default async function ProfilePage() {
  const user = await getUserFromTokenCookie();
  
  if (!user) {
    // Handle unauthorized access
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  const fullUser = await getUserDetailsAndCourses(user.username);

  return <UserProfilePage user={fullUser} />;
}