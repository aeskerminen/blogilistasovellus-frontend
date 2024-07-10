import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {  token = `Bearer ${newToken}`}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const config = {headers: { Authorization: token }}

  const response = await axios.post(baseUrl, blog, config)  
  return response.data
}

// No need to send whole blog over due to the way I coded the back end.
const likeBlog = async (id, likes) => {
  const config = {headers: { Authorization: token }}

  const response = await axios.put(`${baseUrl}/${id}/update`, {'likes': likes}, config)  
  return response.data
}

export default { getAll, createBlog, likeBlog, setToken }