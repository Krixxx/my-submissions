const Filter = ({ filterText, handleChange }) => {
  return (
    <div>
      filter shown with <input value={filterText} onChange={handleChange} />
    </div>
  )
}

export default Filter
