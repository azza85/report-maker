import React from 'react'
import deepKeys from 'deep-keys'
import { PopupSelect } from './PopupSelect'
import { PopupText } from './PopupText'
import { TableConfigs } from './TableConfigs'

const isInArray = (value, array) => (array !== undefined && value) ? array.indexOf(value) > -1 : false
const objectDeepKeys = (obj) => {
  return Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj))
    .map(item => item)
}
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const checkUndefined = (obj, key) => obj !== undefined ? obj[key] : ''
export const Popup = (props) => {
  const {form, closePopup, handleChange, handleChangeSelect, objectFields} = props
  const fieldsSelect = deepKeys(objectFields).map(item => ({value: item, label: toTitleCase(item.replace(/[._]/g, ' ')).replace(/Id/g, 'ID')}))
  // const keySelect = [{name: '',value:''},{name: 'team 1 Name', value: 'matchDetails.team1.name' }]
  const tableSetting = isInArray(form.type, ['dataTable', 'table'])
  const isDataDrivenField = isInArray(form.type, ['dataTable', 'dataField'])
  const isLabel = isInArray(form.type, ['label'])
  return <div className={'lightboxwrap'} >
    <div className={'lightbox'}>
      <div className={'lightboxContent'}>
        <div>
          <PopupText question={'Name'} name={'name'} value={form.name} handleChange={handleChange} />
          <PopupSelect handleChange={handleChangeSelect} fieldName={'type'} value={form.type} label={'Type'} options={[
            {label: '', value: ''},
            {value: 'label', label: 'Label'},
            {label: 'Data Field', value: 'dataField'},
            {label: 'Data Table', value: 'dataTable'},
            {label: 'Table', value: 'table'},
            {label: 'Paragraph', value: 'paragraph'},
            {label: 'Image', value: 'image'}
          ]} />
          {form.type === 'dataField' && <PopupSelect handleChange={handleChangeSelect} fieldName={'dataField'} value={form.dataField} label={'Data Field'} options={fieldsSelect} />}
          <PopupSelect handleChange={handleChangeSelect} fieldName={'fontSize'} value={form.fontSize} label={'Font Size'} options={[
            {label: '', value: ''},
            {label: '8px', value: 8},
            {label: '10px', value: 10},
            {label: '12px', value: 12},
            {label: '14px', value: 14},
            {label: '16px', value: 16},
            {label: '18px', value: 18},
            {label: '20px', value: 20}
          ]} />
          <PopupSelect handleChange={handleChangeSelect} fieldName={'align'} value={form.align} label={'Text Align'} options={[
            {label: '', value: ''},
            {label: 'left', value: 'left'},
            {label: 'right', value: 'right'},
            {label: 'center', value: 'center'}
          ]} />
          <PopupSelect handleChange={handleChangeSelect} fieldName={'fontWeight'} value={form.fontWeight} label={'Font Weight'} options={[
            {label: '', value: ''},
            {label: 'bold', value: 'bold'},
            {label: 'normal', value: 'normal'}
          ]} />
          <PopupSelect handleChange={handleChangeSelect} fieldName={'addBorder'} value={form.addBorder} label={'Add Border'} options={[
            {label: '', value: ''},
            {label: 'yes', value: 'yes'},
            {label: 'no', value: 'no'}
          ]} />
          {(isDataDrivenField || isLabel) && <PopupSelect handleChange={handleChangeSelect} fieldName={'signLine'} value={form.signLine} label={'Sign Line'} options={[
            {label: '', value: ''},
            {label: 'Top', value: 'top'},
            {label: 'Right', value: 'right'},
            {label: 'Bottom', value: 'bottom'},
            {label: 'Left', value: 'left'}
          ]} />}
        </div>
        <div style={{flex: 1}}>{tableSetting ? <TableConfigs {...props} /> : null}</div>
      </div>
      <span
        className='remove'
        onClick={closePopup}
      >&#10006;</span>
    </div>
  </div>
}
