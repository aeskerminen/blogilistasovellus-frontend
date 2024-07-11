import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  const handleLikeBlog = async () => {
    await props.likeBlog(props.blog.id, props.blog.likes + 1)
  }

  return (
    <div style={{ border: '2px solid black', margin: '0.25rem', padding: '0.5rem' }}>
      <p data-testid='titleParagraph' style={{ display: 'inline' }}>{ props.blog.title }</p>
      <p style={{ display: 'inline' }}> { props.blog.author }</p>
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
      {showAll &&
        <div>
          <p>url: {props.blog.url}</p>
          <div>
            <p data-testid='likeParagraph' style={{ display: 'inline' }}>likes: {props.blog.likes}</p>
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
  likeBlog: PropTypes.func.isRequired,
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