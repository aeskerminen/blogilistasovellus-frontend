import { useEffect, useState } from 'react'
import Blog from './Blog'
import CreateView from './CreateView'
import blogService from '../services/blogs'

const BlogView = () => {
  const [blogs, setBlogs] = useState([])
  const currentUser = JSON.parse(window.localStorage.getItem('loggedInUser')).username

  const blogSorterFunction  = (a,b) => a.likes < b.likes

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(blogSorterFunction)
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
    temp = temp.sort(blogSorterFunction)
    setBlogs(temp)
  }

  return (
    <div>
      <CreateView addBlog={handleAddBlog}></CreateView>
      <h2>blogs</h2>
      <div data-testid='blogContainer'>
        {blogs.map((blog, i) =>
          <Blog likeBlog={handleLikeBlog} showRemove={blog.user.username === currentUser} deleteBlog={handleDeleteBlog} key={blog.id || i} blog={blog} />
        )}
      </div>
    </div>
  )
}


export default BlogView