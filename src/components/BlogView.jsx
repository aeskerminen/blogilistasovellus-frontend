import { useEffect, useState } from 'react'
import Blog from './Blog'
import CreateView from './CreateView'
import blogService from '../services/blogs'

const BlogView = () => {
  const [blogs, setBlogs] = useState([])
  const currentUser = JSON.parse(window.localStorage.getItem('loggedInUser')).username

  useEffect(() => {
    blogService.getAll().then(blogs => {
      // It only sorts blogs when page is reloaded. It was not said that the sorting should also happen when I locally like a blog.
      blogs.sort((a, b) => a.likes < b.likes)
      setBlogs(blogs)
    }
    )
  }, [])

  const handleAddBlog = (blog) => {
    setBlogs([...blogs, blog])
  }

  const handleDeleteBlog = async (id) => {
    await blogService.deleteBlog(id)

    let temp = [...blogs]
    temp = temp.filter(b => b.id !== id)

    setBlogs(temp)
  }

  return (
    <div>
      <CreateView addBlog={handleAddBlog}></CreateView>
      <h2>blogs</h2>
      {blogs.map((blog, i) =>
        <Blog showRemove={blog.user.username === currentUser} deleteBlog={handleDeleteBlog} key={blog.id || i} blog={blog} />
      )}

    </div>
  )
}


export default BlogView