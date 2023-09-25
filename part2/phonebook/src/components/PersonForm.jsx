const PersonForm = ({
  handleSubmit,
  handleAddName,
  handleAddNumber,
  name,
  number,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleAddName} />
      </div>
      <div>
        number: <input value={number} onChange={handleAddNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
