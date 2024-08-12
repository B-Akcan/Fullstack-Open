const NewBlog = ({handleNewBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title: <input value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          author: <input value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewBlog