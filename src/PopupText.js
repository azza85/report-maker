import React from 'react'

export const PopupText = ({question, value, handleChange}) => {
  return <div>
    <div>{question}</div>
    <input type='text' value={value} onChange={handleChange} />
  </div>
}
