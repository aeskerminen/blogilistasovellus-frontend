import { useEffect, useState } from 'react'
import Blog from './Blog'
import CreateView from './CreateView'
import blogService from '../services/blogs'

const BlogView = () => {
  const [blogs, setBlogs] = useState([])
  const currentUser = JSON.parse(window.localStorage.getItem('loggedInUser')).username

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes < b.likes)
      setBlogs(blogs)
    }
    )
  }, [])

  const handleAddBlog = async ({ title, author, url }) => {
    const curUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
    const newBlog = await blogService.createBlog({ title, author, url })

    const blog = { likes: 0, 'id': newBlog.id, 'author': newBlog.author, 'title': newBlog.title, 'url': newBlog.url, 'user': { 'username': curUser.username, 'name': curUser.name } }
    setBlogs([...blogs, blog])
  }

  const handleDeleteBlog = async (id) => {
    await blogService.deleteBlog(id)

    let temp = [...blogs]
    temp = temp.filter(b => b.id !== id)

    setBlogs(temp)
  }

  const handleLikeBlog = async (id, likes) => {
    await blogService.likeBlog(id, likes)
    let temp = [...blogs]
    temp[temp.findIndex(b => b.id === id)].likes = likes
    temp = temp.sort((a,b) => a.likes < b.likes)
    setBlogs(temp)
  }

  return (
    <div>
      <CreateView addBlog={handleAddBlog}></CreateView>
      <h2>blogs</h2>
      {blogs.map((blog, i) =>
        <Blog likeBlog={handleLikeBlog} showRemove={blog.user.username === currentUser} deleteBlog={handleDeleteBlog} key={blog.id || i} blog={blog} />
      )}

    </div>
  )
}


export default BlogView