import React from 'react'
import rangeInclusive from 'range-inclusive'
import { PopupText } from './PopupText'
import { PopupSelect } from './PopupSelect'

const DEFAULT_SELECT_OPTION = {label: '', value: ''}

const generateNumOptions = (num) => [{label: '', value: ''}, ...rangeInclusive(num).map(item => ({label: item, value: item}))]
export const TableConfigs = (props) => {
  const { form, handleChange, handleChangeSelect, listData } = props
  const listOptions = [
    DEFAULT_SELECT_OPTION,
    ...Object.keys(listData).map(item => ({label: item, value: item}))
  ]
  const sortingOptions = Object.keys(listData).reduce((obj, listItem) => {
    const myObj = listData[listItem][0]
    const makeKeys = Object.keys(myObj)
    const getKeys = makeKeys.map(key => typeof myObj[key] === 'object' ? Object.keys(myObj[key]).map(k => `${key}.${k}`) : key)
    const setOptions = [].concat(...getKeys)
    return {
      ...obj,
      [listItem]: setOptions
    }
  }, {})
  const setSortingOptions = sortingOptions[form.listData] !== undefined ? sortingOptions[form.listData].map(item => ({label: item, value: item})) : [DEFAULT_SELECT_OPTION]
  return <div>
    <h3>Table Configs</h3>
    <PopupSelect handleChange={handleChangeSelect} fieldName={'listData'} value={form.listData} label={'List Data'} options={listOptions} />
    <PopupSelect handleChange={handleChangeSelect} fieldName={'maxRows'} value={form.maxRows} label={'Max Rows'} options={generateNumOptions(50)} />
    <PopupSelect handleChange={handleChangeSelect} fieldName={'hasNumber'} value={form.hasNumber} label={'Display Numbers in table'} options={[{label: 'yes', value: 'yes'}, {label: 'no', value: 'no'}]} />
    <PopupSelect handleChange={handleChangeSelect} fieldName={'sortBy'} value={form.sortBy} label={'Sort By'} options={setSortingOptions} />
    <PopupSelect handleChange={handleChangeSelect} fieldName={'cols'} value={form.cols} label={'Cols'} options={generateNumOptions(20)} />
    <PopupSelect handleChange={handleChangeSelect} fieldName={'filter'} value={form.filter} label={'Filter eg isStarting'} options={setSortingOptions} />
    <h4>Column Name</h4>
    {rangeInclusive(form.cols).map(item => <PopupText key={item} question={`Col ${item} Name`} name={`col${item}`} value={form[`col${item}`]} handleChange={handleChange} />)}
    <h4>Column Value</h4>
    {rangeInclusive(form.cols).map(item => <PopupText key={item} question={`Col ${item} Value`} name={`colval${item}`} value={form[`colval${item}`]} handleChange={handleChange} />)}
  </div>
}
