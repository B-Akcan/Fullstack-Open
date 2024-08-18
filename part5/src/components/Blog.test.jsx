import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Blog component tests", () => {
  let container
  let handleUpdateBlog
  let user

  beforeEach(() => {
    const blog = {
      title: "Blog title is here",
      author: "Tester tester",
      url: "test.com",
      likes: 3,
      userId: "123456"
    }

    handleUpdateBlog = vi.fn()
    container = render(<Blog blog={blog} handleUpdateBlog={handleUpdateBlog} />).container
    user = userEvent.setup()
  })

  test("blog title and author are rendered, details are not rendered by default", () => {
    const titleAndAuthor = screen.getByText("Blog title is here Tester tester", { exact:false })
    expect(titleAndAuthor).toBeDefined()

    const details = container.querySelector(".details")
    expect(details).toHaveStyle({ "display": "none" })
  })

  test("details are rendered if button is clicked", async () => {
    const button = screen.getByText("show")
    await user.click(button)

    const details = container.querySelector(".details")
    expect(details).not.toHaveStyle({ "display": "none" })
  })

  test("like button is clicked twice", async () => {
    const detailsButton = screen.getByText("show")
    await user.click(detailsButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleUpdateBlog.mock.calls).toHaveLength(2)
  })
})