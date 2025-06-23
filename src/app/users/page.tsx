export default async function UsersPage() {
  const baseUrl = process.env.PUBLIC_SITE_URL;
  const res = await fetch(`${baseUrl}/api/auth/users`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {data.users.map((user: User) => (
          <div key={user.id}>
            <li>{user.id}</li>
            <li>{user.username}</li>
            <li>{user.role}</li>
            <li>{user.createdAt.toString()}</li>
            <li>{user.updatedAt.toString()}</li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}
