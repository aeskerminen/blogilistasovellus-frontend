import { useEffect, useState } from "react"
import blogService from '../services/blogs'

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(props.blog.likes)
  }, [])

  const handleLikeBlog = async () => {
    await blogService.likeBlog(props.blog.id, likes + 1)
    setLikes(likes + 1)
  }

  return (
    <div>
      {props.blog.title} {props.blog.author}
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
      {showAll &&
        <div>
          <p>url: {props.blog.url}</p>
          <div>
            <p style={{display: 'inline'}}>likes: {likes}</p>
            <button onClick={() => handleLikeBlog()}>Like</button>
          </div>
          <p>name: {props.blog.user.name}</p>
        </div>
      }
    </div>
  )
}


export default Blog