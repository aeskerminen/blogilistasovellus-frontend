import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogView from './components/BlogView'

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
            <input data-testid='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input data-testid='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
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