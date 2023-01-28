import React, { useEffect, useState } from 'react';
import { useAuth } from './auth';
import { useRouter } from 'react-router-dom';

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchProfile() {
      const res = await fetch(`/api/profile/${user.id}`);
      const data = await res.json();
      setProfile(data);
    }

    fetchProfile();
  }, [user, router]);

  if (!profile) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}
export default ProfilePage