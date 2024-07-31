import axios from "axios"

const url = "/api/persons"

export const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

export const newPerson = (obj) => {
    const request = axios.post(url, obj)
    return request
}

export const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request
}

export const updatePerson = (id, newObj) => {
    const request = axios.put(`${url}/${id}`, newObj)
    return request
}