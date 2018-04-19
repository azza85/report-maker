import React from 'react'
import { PopupSelect } from './PopupSelect'
import { PopupText } from './PopupText'

export const Popup = ({form, closePopup, handleChange}) => {
  // const { name } = form
  return <div className={'lightboxwrap'} >
    <div className={'lightbox'} >
      <PopupText question={'name'} value={form} handleChange={handleChange} />
      <div>
        <PopupSelect label={'test'} options={[
          {name: 'one', value: 1},
          {name: 'two', value: 2}
        ]} />
      </div>
      <span
        className='remove'
        onClick={closePopup}
      >&#10006;</span>
    </div>
  </div>
}
