import React from 'react'

export const PopupSelect = ({label, name, value, options, handleChange}) => {
  return <div>
    <div>{label}</div>
    <select onChange={handleChange} name={name} value={value}>
      {options.map((item, valIndex) => <option key={valIndex} value={item.value}>{item.name}</option>)}
    </select>
  </div>
}
