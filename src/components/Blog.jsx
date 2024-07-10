import { useState } from "react"

const Blog = (props) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      {props.blog.title} {props.blog.author}
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'hide' : 'view'}</button>
      {showAll &&
        <div>
          <p>url: {props.blog.url}</p>
          <div>
            <p style={{display: 'inline'}}>likes: {props.blog.likes}</p>
            <button>Like</button>
          </div>
          <p>name: {props.blog.user.name}</p>
        </div>
      }
    </div>
  )
}


export default Blog