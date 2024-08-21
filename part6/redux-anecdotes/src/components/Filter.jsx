import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter