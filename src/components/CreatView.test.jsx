import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import CreateView from './CreateView'

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