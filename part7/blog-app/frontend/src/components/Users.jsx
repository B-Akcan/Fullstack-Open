import { Link } from "react-router-dom"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"

const Users = ({ users }) => {

  return (
    <TableContainer component={Paper} elevation={10} sx={{ margin: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Users</b>
            </TableCell>
            <TableCell align="right">
              <b>Blogs created</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`} className="contentLink">{user.name}</Link>
              </TableCell>
              <TableCell align="right">
                {user.blogs.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users