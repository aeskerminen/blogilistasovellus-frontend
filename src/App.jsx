import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogView = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')

      console.log(user)
    }
    catch (exception) {

    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in!</p><button onClick={handleLogout}>Logout...</button>
      <BlogView></BlogView>
    </div>
  )
}

export default App