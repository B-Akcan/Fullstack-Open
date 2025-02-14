import axios from "axios"

const baseUrl = "/api/users"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + "/" + id, config)
  return response.data
}

export default { getAll, create, deleteUser, setToken }