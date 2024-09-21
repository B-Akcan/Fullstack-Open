import { Link } from "react-router-dom"
import { List, ListItem, Paper } from "@mui/material"

const User = ({ user }) => {
  if (!user)
    return null

  return (
    <Paper elevation={10} style={{ padding: 5 }}>
      <h2 style={{ textAlign: "center" }}>{user.name}'s blogs</h2>
      { user.blogs.length !== 0 ? (
        <List >
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`} className="contentLink">{blog.title}</Link>
            </ListItem>
          ))}
        </List>
      ) : (<p style={{ marginLeft: 10 }}>This user does not have any blog.</p>) }
    </Paper>
  )
}

export default User