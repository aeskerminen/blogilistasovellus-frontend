import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'
import CreateView from './CreateView'


test('<Blog/> renders content properly', () => {
    const blog = {
        likes: 2,
        id: '3291dajjdls2',
        author: 'test author',
        url: 'testurl.com',
        title: 'test title!',
        user: {name: "Test Name"}
    }

    render(<Blog showRemove={true} deleteBlog={() => {}}  blog={blog} />)

    const element = screen.getByText(blog.title)
    expect(element).toBeDefined()

    const urlTest = screen.queryByText(blog.url)
    expect(urlTest).toBeNull()
})

test('<Blog/> renders expanded content properly', async () => {
    const blog = {
        likes: 2,
        id: '3291dajjdls2',
        author: 'test author',
        url: 'testurl.com',
        title: 'test title!',
        user: {name: "Test Name"}
    }

    render(<Blog showRemove={true} deleteBlog={() => {}}  blog={blog} />)

    const user = userEvent.setup()
    const expandButton = screen.getByText('view')
    await user.click(expandButton)

    const urlTest = screen.queryByText(`url: ${blog.url}`)
    expect(urlTest).toBeDefined()

    const likesTest = screen.queryByText(`likes: ${blog.likes}`)
    expect(likesTest).toBeDefined()

    const nameTest = screen.queryByText(`name: ${blog.user.name}`)
    expect(nameTest).toBeDefined()

})

test('clicking the like button twice in <Blog/> calls the "likeBlog" function from the props twice', async () => {
    const blog = {
        likes: 2,
        id: '3291dajjdls2',
        author: 'test author',
        url: 'testurl.com',
        title: 'test title!',
        user: {name: "Test Name"}
    }

    const mockHandler = vi.fn()

    render(<Blog likeBlog={mockHandler} showRemove={true} deleteBlog={() => {}}  blog={blog} />)
  
    const user = userEvent.setup()

    const expandButton = screen.getByText('view')
    await user.click(expandButton)
    
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('<CreateView /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const addBlog = vi.fn()
  
    const res = render(<CreateView addBlog={addBlog}/>)
    
    const expandButton = screen.getByText('Create new blog')
    await user.click(expandButton)

    const titleInput = res.container.querySelector('#titleInput')
    const authorInput = res.container.querySelector('#authorInput')
    const urlInput = res.container.querySelector('#urlInput')
    
    const blog = {
        title: 'test title!',
        author: 'Test Author',
        url: 'testurl.com'
    }

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    const createButton = screen.getByText('Create')
    await user.click(createButton)
  
    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
  })