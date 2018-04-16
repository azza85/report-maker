import React from 'react'
import { PopupSelect } from './PopupSelect'

export const Popup = ({closePopup}) => {
  return <div className={'lightboxwrap'} >
    <div className={'lightbox'} >
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
