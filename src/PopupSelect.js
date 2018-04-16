import React from 'react'

export const PopupSelect = ({label, options}) => {
  return <div>
    <div>{label}</div>
    <select>
      {options.map((item, valIndex) => <option key={valIndex} value={item.value}>{item.name}</option>)}
    </select>
  </div>
}
