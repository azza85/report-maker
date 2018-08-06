import React from 'react'
import rangeInclusive from 'range-inclusive'
import { PopupText } from './PopupText'
import { PopupSelect } from './PopupSelect'

export const TableConfigs = (props) => {
  const { form, label, options, handleChange, listData } = props
  const listOptions = [
    {label: '', value: ''},
    ...Object.keys(listData).map(item => ({label: item, value: item}))
  ]
  return <div>
    <h3>Table Configs</h3>
    <PopupSelect handleChange={handleChange} fieldName={'listData'} value={form.listData} label={'listData'} options={listOptions} />
    <PopupText question={'Max Rows'} name={'maxRows'} value={form.maxRows} handleChange={handleChange} />
    <PopupText question={'Has Number'} name={'hasNumber'} value={form.hasNumber} handleChange={handleChange} />
    <PopupText question={'Sort By'} name={'sortBy'} value={form.sortBy} handleChange={handleChange} />
    <PopupText question={'Cols'} name={'cols'} value={form.cols} handleChange={handleChange} />
    <PopupText question={'Filter eg isStarting'} name={'filter'} value={form.filter} handleChange={handleChange} />
    <h4>Column Name</h4>
    {rangeInclusive(form.cols).map(item => <PopupText key={item} question={`Col ${item} Name`} name={`col${item}`} value={form[`col${item}`]} handleChange={handleChange} />)}
    <h4>Column Value</h4>
    {rangeInclusive(form.cols).map(item => <PopupText key={item} question={`Col ${item} Value`} name={`colval${item}`} value={form[`colval${item}`]} handleChange={handleChange} />)}
  </div>
}
