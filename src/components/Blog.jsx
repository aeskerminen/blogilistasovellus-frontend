import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(props.blog.likes)
  }, [props.blog.likes])

  const handleLikeBlog = async () => {
    await blogService.likeBlog(props.blog.id, likes + 1)
    setLikes(likes + 1)
  }

  return (
    <div style={{ border: '2px solid black', margin: '0.25rem', padding: '0.5rem' }}>
      { props.blog.title } { props.blog.author }
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
      {showAll &&
        <div>
          <p>url: {props.blog.url}</p>
          <div>
            <p style={{ display: 'inline' }}>likes: {likes}</p>
            <button onClick={() => handleLikeBlog()}>Like</button>
          </div>
          <p>name: {props.blog.user.name}</p>
        </div>
      }
      {showAll && props.showRemove &&
        <button onClick={async () => {await props.deleteBlog(props.blog.id)}}>remove</button>
      }
    </div>
  )
}

Blog.propTypes = {
  showRemove: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  })
}


export default Blog