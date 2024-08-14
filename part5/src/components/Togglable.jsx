import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const hiddenStyle = { display: visible ? "none" : "" }
  const shownStyle = { display: visible ? "" : "none" }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hiddenStyle}>
        <button onClick={toggleVisibility}>{props.buttonText}</button>
      </div>
      <div style={shownStyle}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"
export default Togglable