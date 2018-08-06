import React, { Component } from 'react'
import Select from 'react-select'

export const PopupSelect = ({label, fieldName, value, options, handleChange}) => {
// {options.map((item, valIndex) => <option key={valIndex} value={item.value}>{item.name}</option>)}
  // onChange={handleChange}
  // onChange={(newValue, name) => handleChange(newValue, `${fieldName}`)}
  // const optionsWithFieldName = options.map(item => ({...item, fieldName: fieldName}))
  // const setValue = value !== undefined ? value : null
  /**
   *
   *
    <Select
      onChange={(value) => onSelectChange(value)}
      name={fieldName} value={value} options={options} />
    <select onChange={handleChange} name={fieldName} value={value}>
      {options.map((item, valIndex) => <option key={valIndex} value={item.value}>{item.name}</option>)}
    </select>
   */
  const optionsVals = options.map(item => item.value)
  const defaultValue = optionsVals.indexOf(value) > 0 ? options[optionsVals.indexOf(value)] : ''
  return <div>
    <div>{label}</div>
    <Select onChange={(e) => handleChange(e, fieldName)}
      defaultValue={defaultValue}
      name={fieldName} options={options} />
  </div>
}
