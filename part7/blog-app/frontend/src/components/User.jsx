const User = ({ user }) => {
  if (!user)
    return null

  return (
    <div>
      <h2>{user.name}'s blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User