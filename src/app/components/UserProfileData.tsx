import { Profile } from "types/profile";

export default function UserProfileData({
  profile,
}: {
  profile: Profile | undefined;
}) {
  return (
    <>
      {profile ? (
        <div>
          <ul>
            <li>Profile ID: {profile.id}</li>
            <li>Profile User ID: {profile.userId}</li>
            <li>First Name: {profile.firstName}</li>
            <li>Last Name: {profile.lastName}</li>
            <li>Email: {profile.email}</li>
            <li>Bio: {profile.bio}</li>
            <li>Image Link: {profile.imageLink}</li>
            <li>Created At: {profile.createdAt}</li>
            <li>Updated At: {profile.updatedAt}</li>
          </ul>
        </div>
      ) : (
        <div>Loading your profile...</div>
      )}
    </>
  );
}
