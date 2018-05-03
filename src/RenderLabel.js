import React from 'react'

export const RenderLabel = ({data}) => {
  const { name, type, fontSize } = data
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize,10)}:{}
  return <div>
    {name !== undefined ? <div style={setSize}>{name}</div>:null}
  </div>
}
