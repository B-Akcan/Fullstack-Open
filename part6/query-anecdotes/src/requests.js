import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => axios.get(baseUrl).then(response => response.data)
export const createAnecdote = (newObj) => axios.post(baseUrl, newObj).then(response => response.data)
export const updateAnecdote = (newObj) => axios.put(baseUrl + "/" + newObj.id, newObj).then(response => response.data)