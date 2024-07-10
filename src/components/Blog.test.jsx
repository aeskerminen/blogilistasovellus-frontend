import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'


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


/*
test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = vi.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createNote = vi.fn()
  
    render(<NoteForm createNote={createNote} />)
  
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByText('save')
  
    await user.type(input, 'testing a form...')
    await user.click(sendButton)
  
    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })

  */