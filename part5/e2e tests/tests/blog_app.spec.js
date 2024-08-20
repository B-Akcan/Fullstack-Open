const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset") // resets the database for testing purposes
    await request.post("http://localhost:5173/api/users", {
      data: {
        username: "bakcan",
        password: "1234",
        name: "Batuhan Akçan"
      }
    })
    await request.post("http://localhost:5173/api/users", {
      data: {
        username: "berkay",
        password: "1234",
        name: "Berkay Akçan"
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible()
    await expect(page.getByTestId("password")).toBeVisible()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId("username").fill("bakcan")
      await page.getByTestId("password").fill("1234")
      await page.getByRole("button", { name: "login" }).click()

      await expect(page.getByText("Hello, Batuhan Akçan!")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId("username").fill("bakcan")
      await page.getByTestId("password").fill("wrong")
      await page.getByRole("button", { name: "login" }).click()

      await expect(page.getByText("Wrong username or password")).toBeVisible()
      await expect(page.getByText("Hello, Batuhan Akçan!")).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("bakcan")
      await page.getByTestId("password").fill("1234")
      await page.getByRole("button", { name: "login" }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole("button", { name: "create blog"}).click()
      await page.getByTestId("title").fill("A new blog")
      await page.getByTestId("author").fill("Alan Turing")
      await page.getByTestId("url").fill("example.com")
      await page.getByRole("button", { name: "create" }).click()
      await page.getByText("A new blog Alan Turing").waitFor()

      await expect(page.getByText("A new blog Alan Turing")).toBeVisible()
    })

    describe("When there is a blog by owner", () => {
      beforeEach(async ({page}) => {
        await page.getByRole("button", { name: "create blog"}).click()
        await page.getByTestId("title").fill("Another new blog")
        await page.getByTestId("author").fill("Edsger Dijkstra")
        await page.getByTestId("url").fill("example2.com")
        await page.getByRole("button", { name: "create" }).click()
        await page.getByText("Another new blog Edsger Dijkstra").waitFor()
      })
  
      test("blog can be liked", async ({page}) => {
        await page.getByRole("button", { name: "show" }).click()
        const likesBefore = Number(await page.getByTestId("likes"))
        await page.getByRole("button", { name: "like" }).click()
        const likesAfter = Number(await page.getByTestId("likes"))
  
        expect(likesAfter).toStrictEqual(likesBefore + 1)
      })

      test("blog can be deleted by owner", async ({page}) => {
        page.on("dialog", async dialog => await dialog.accept())

        await page.getByRole("button", {name: "show"}).click()
        await page.getByRole("button", {name: "delete blog"}).click()
        
        await expect(page.getByText("Blog with title Another new blog was deleted")).toBeVisible()
        await expect(page.getByText("Another new blog Edsger Dijkstra")).not.toBeVisible()
      })

      describe("logged out and another user logs in", () => {
        beforeEach(async ({page}) => {
          await page.getByRole("button", {name: "logout"}).click()
  
          await page.getByTestId("username").fill("berkay")
          await page.getByTestId("password").fill("1234")
          await page.getByRole("button", { name: "login" }).click()
          await expect(page.getByText("Hello, Berkay Akçan!")).toBeVisible()
        })
  
        test("New user can not see delete blog button", async ({page}) => {
          await page.getByRole("button", {name: "show"}).click()

          await expect(page.getByRole("button", {name: "delete blog"})).not.toBeVisible()
        })
      })
    })

    describe("When there are 2 blogs and 2nd blog is liked", () => {
      beforeEach(async ({page}) => {
        await page.getByRole("button", { name: "create blog"}).click()
        await page.getByTestId("title").fill("First blog")
        await page.getByTestId("author").fill("Edsger Dijkstra")
        await page.getByTestId("url").fill("example1.com")
        await page.getByRole("button", { name: "create" }).click()
        await page.getByText("First blog Edsger Dijkstra").waitFor()

        await page.getByRole("button", { name: "create blog"}).click()
        await page.getByTestId("title").fill("Second blog")
        await page.getByTestId("author").fill("Edsger Dijkstra")
        await page.getByTestId("url").fill("example2.com")
        await page.getByRole("button", { name: "create" }).click()
        await page.getByText("Second blog Edsger Dijkstra").waitFor()

        const secondBlog = await page.getByText("Second blog", {exact: false})
        await secondBlog.getByRole("button", {name: "show"}).click()
        const url = await page.getByText("example2.com", {exact: false})
        await url.getByRole("button", {name: "like"}).click()
      })

      test("ordering of blogs changes", async ({page}) => {
        const content = await page.content()
        const indexOfSecondBlog = content.indexOf("Second blog")
        const indexOfFirstBlog = content.indexOf("First blog")

        expect(indexOfSecondBlog).toBeLessThan(indexOfFirstBlog)
      })
    })
  })
})