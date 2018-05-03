import React from 'react'
import { PopupSelect } from './PopupSelect'
import { PopupText } from './PopupText'
import { TableConfigs } from './TableConfigs'

export const Popup = (props) => {
  const {form, formattedData, closePopup, handleChange} = props
  // const { name } = form
  console.log(
    'formattedData => ', formattedData,
    'arr => ', Object.keys(formattedData).filter(item => formattedData[item] instanceof Array).map(item => item)
  )
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
        {form.type === 'dataField' && <p>dataField</p>}
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
