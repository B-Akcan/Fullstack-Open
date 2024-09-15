import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NewBlog from "./NewBlog"

describe("NewBlog component tests", () => {
  let handleNewBlog
  let container
  let user

  beforeEach(() => {
    handleNewBlog = vi.fn()
    container = render(<NewBlog handleNewBlog={handleNewBlog} />).container
    user = userEvent.setup()
  })

  test("handleNewBlog event handler is called", async () => {
    const titleInput = container.querySelector("#titleInput")
    const authorInput = container.querySelector("#authorInput")
    const urlInput = container.querySelector("#urlInput")
    const button = screen.getByText("create")

    await user.type(titleInput, "Blog test")
    await user.type(authorInput, "Tester tester")
    await user.type(urlInput, "test.com")
    await user.click(button)

    expect(handleNewBlog.mock.calls).toHaveLength(1)
    expect(handleNewBlog.mock.calls[0][0]).toStrictEqual({
      title: "Blog test",
      author: "Tester tester",
      url: "test.com",
    })
  })
})
