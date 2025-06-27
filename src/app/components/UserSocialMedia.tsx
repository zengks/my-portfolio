import { SocialMedia } from "types/socialMedia";

export default function UserSocialMedia({
  socialMedia,
}: {
  socialMedia: SocialMedia[] | undefined;
}) {
  return (
    <>
      Your Social Media
      {socialMedia ? (
        <div>
          {socialMedia.length === 0 && <div>No social media added.</div>}
          {socialMedia.length > 0 &&
            socialMedia.map((each: SocialMedia) => (
              <div key={each.id}>
                <p>-----------------------------------------------</p>
                <p>ID: {each.id}</p>
                <p>User ID: {each.userId}</p>
                <p>Logo Link: {each.logoLink}</p>
                <p>Social Media Link: {each.socialMediaLink}</p>
                <p>Created At: {each.createdAt}</p>
                <p>Updated At: {each.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your social media...</div>
      )}
    </>
  );
}
