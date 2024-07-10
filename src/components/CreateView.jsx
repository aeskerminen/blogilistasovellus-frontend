import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'

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
      props.addBlog({ likes: 0, 'id': newBlog.id, 'author': newBlog.author, 'title': newBlog.title, 'url': newBlog.url, 'user': { 'username': curUser.username, 'name': curUser.name } })

      setNotifMsg(`New blog called ${title} made by ${author}`)
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
        {showNotification === true && <Notification color={notifColor} message={notifMsg}></Notification>}
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

CreateView.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default CreateView