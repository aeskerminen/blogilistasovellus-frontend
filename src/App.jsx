import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = (props) => {
  return (
    <div style={{ margin: '0.5rem', padding: '0.25rem', borderRadius: '0.25rem', border: '2px solid black', backgroundColor: props.color }}>
      <h2 style={{ padding: 0, margin: 0 }}>{props.message}</h2>
    </div>
  )
}

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

const CreateView = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [showNotification, setShowNotification] = useState(false)
  const [notifColor, setNotifColor] = useState('green')
  const [notifMsg, setNotifMsg] = useState('')

  const [formVisible, setFormVisible] = useState(false)

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const curUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
      const newBlog = await blogService.createBlog({ title, author, url })
      props.addBlog({ 'id': newBlog.id, 'author': newBlog.author, 'title': newBlog.title, 'url': newBlog.url, 'user': { 'username': curUser.username, 'name': curUser.name } })

      setNotifMsg(`New blog ${title} made by ${author}`)
      setNotifColor('green')
      setShowNotification(true)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (e) {
      console.log(e)
      setNotifMsg('Error creating a new blog...')
      setNotifColor('red')
      setShowNotification(true)
    }

    setTimeout(() => {
      setNotifMsg('')
      setShowNotification(false)
    }, 3000)
  }

  if (!formVisible) {
    return (
      <div>
        <button onClick={() => setFormVisible(true)}>Create new blog</button>
      </div>
    )
  } else {
    return (
      <div>
        {showNotification === true && <Notification color={notifColor} message={notifMsg}></Notification>}
        <h2>Create new blog</h2>
        <form onSubmit={(e) => { handleCreateBlog(e); setFormVisible(false) }}>
          <div>
            title
            <input onChange={e => setTitle(e.target.value)} type='text' name='title'></input>
          </div>
          <div>
            author
            <input onChange={e => setAuthor(e.target.value)} type='text' name='author'></input>
          </div>
          <div>
            url
            <input onChange={e => setUrl(e.target.value)} type='text' name='url'></input>
          </div>
          <button type='submit'>Create</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    )
  }
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [showNotification, setShowNotification] = useState(false)
  const [notifColor, setNotifColor] = useState('green')
  const [notifMsg, setNotifMsg] = useState('')

  useEffect(() => {
    const loadUser = window.localStorage.getItem('loggedInUser')
    if (loadUser) {
      const user = JSON.parse(loadUser)
      setUser(user)
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')

      setNotifMsg('Succesfully logged in!')
      setNotifColor('green')
      setShowNotification(true)

      console.log(user)
    }
    catch (e) {
      setNotifMsg('Login failed...')
      setNotifColor('red')
      setShowNotification(true)
    }

    setTimeout(() => {
      setNotifMsg('')
      setShowNotification(false)
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        {showNotification === true && <Notification color={notifColor} message={notifMsg}></Notification>}
        <h2>Login to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {showNotification === true && <Notification color={notifColor} message={notifMsg}></Notification>}
      <p>{user.name} logged in!</p><button onClick={handleLogout}>Logout...</button>
      <BlogView></BlogView>
    </div>
  )
}

export default App