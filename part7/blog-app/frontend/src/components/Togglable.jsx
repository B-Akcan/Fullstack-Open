import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button } from "@mui/material"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)
  const hiddenStyle = { display: visible ? "none" : "", textAlign: "center", padding: 5 }
  const shownStyle = { display: visible ? "" : "none", paddingLeft: 15 }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hiddenStyle}>
        <Button onClick={toggleVisibility} variant="contained">{props.buttonText}</Button>
      </div>
      <div style={shownStyle}>
        {props.children}
        <div style={{ paddingTop: 5, paddingBottom: 10 }}>
          <Button onClick={toggleVisibility} variant="outlined">Cancel</Button>
        </div>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"
export default Togglable
