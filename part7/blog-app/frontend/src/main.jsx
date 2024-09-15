import ReactDOM from "react-dom/client"
import App from "./App"
import { StrictMode } from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import { BrowserRouter } from "react-router-dom"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
