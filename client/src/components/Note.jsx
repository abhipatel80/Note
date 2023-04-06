import React from 'react'

const Note = (props) => {

  const dele = () => {
    props.deletenote(props.id)
  }

  const edit = () => {
    props.editnote(props.id)
  }

  return (
    <>
      <div className="card">
        <h4 className="card-title">{props.title}</h4>
        <p>{props.description}</p>
        <div className="allbtn">
          <button className="delete-btn btn" onClick={dele}>Delete</button>
          <button className="edit-btn btn" onClick={edit}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default Note
