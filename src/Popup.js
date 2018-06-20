import React from 'react'
import deepKeys from 'deep-keys'
import { PopupSelect } from './PopupSelect'
import { PopupText } from './PopupText'
import { TableConfigs } from './TableConfigs'

const objectDeepKeys = (obj) => {
  return Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y), Object.keys(obj))
    .map(item => item)
}
const toTitleCase = (str)  => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const checkUndefined = (obj,key) => obj !== undefined ? obj[key]:''
export const Popup = (props) => {
  const {form, formattedData, closePopup, handleChange} = props
  const { name } = form
  console.log(
    'formattedData => ', deepKeys(formattedData)
  )
  const keySelect = deepKeys(formattedData).map(item => ({name: toTitleCase(item.replace(/[._]/g, " ")).replace(/Id/g, "ID"), value: item}))
  //const keySelect = [{name: '',value:''},{name: 'team 1 Name', value: 'matchDetails.team1.name' }]
  return <div className={'lightboxwrap'} >
    <div className={'lightbox'}>
      <div className={'lightboxContent'}>
        <PopupText question={'Name'} name={'name'} value={form.name} handleChange={handleChange} />
        <PopupSelect handleChange={handleChange} name={'type'} value={form.type} label={'Type'} options={[
          {name: '', value: ''},
          {name: 'Label', value: 'label'},
          {name: 'Data Field', value: 'dataField'},
          {name: 'Data Table', value: 'dataTable'},
          {name: 'Manual Table', value: 'manualTable'},
          {name: 'Paragraph', value: 'paragraph'},
          {name: 'Image', value: 'image'}
        ]} />
        {form.type === 'dataField' && <PopupSelect handleChange={handleChange} name={'dataField'} value={form.dataField} label={'dataField'} options={keySelect} />}
        <PopupSelect handleChange={handleChange} name={'fontSize'} value={form.fontSize} label={'Font Size'} options={[
          {name: '', value: ''},
          {name: '8px', value: 8},
          {name: '10px', value: 10},
          {name: '12px', value: 12},
          {name: '14px', value: 14},
          {name: '16px', value: 16},
          {name: '18px', value: 18},
          {name: '20px', value: 20}
        ]} />
        <PopupSelect handleChange={handleChange} name={'signLine'} value={form.signLine} label={'Sign Line'} options={[
          {name: 'None', value: 1},
          {name: 'Above', value: 2},
          {name: 'Right', value: 3},
          {name: 'Bottom', value: 4},
          {name: 'Left', value: 5}
        ]} />
        <TableConfigs {...props} />
      </div>
      <span
        className='remove'
        onClick={closePopup}
      >&#10006;</span>
    </div>
  </div>
}
