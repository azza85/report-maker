import React from 'react'
import { PopupText } from './PopupText'

export const TableConfigs = ({label, options, handleChange}) => {
  return <div>
    <h3>Table Configs</h3>
    <PopupText question={'List Data'} value={''} handleChange={handleChange} />
    <PopupText question={'Max Rows'} value={''} handleChange={handleChange} />
    <PopupText question={'Sort By'} value={''} handleChange={handleChange} />
    <PopupText question={'Max Rows'} value={''} handleChange={handleChange} />
    <PopupText question={'Sort By'} value={''} handleChange={handleChange} />
    <PopupText question={'Cols'} value={''} handleChange={handleChange} />
    <PopupText question={'Filter eg isStarting'} value={''} handleChange={handleChange} />
  </div>
}
