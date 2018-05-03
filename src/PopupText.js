import React from 'react'

export const PopupText = ({question, name, value, handleChange}) => {
  return <div>
    <div>{question}</div>
    <input type='text' name={name} value={value} onChange={handleChange} />
  </div>
}
