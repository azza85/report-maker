import React from 'react'
const resolvePath = (object, path, defaultValue) => path
  .split('.')
  .reduce((o, p) => o ? o[p] : defaultValue, object)

export const RenderDataField = ({data, elementData}) => {
  const { fontSize, align } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setStyle = {...setSize, ...setAlign}
  const dynamicValue = elementData.dataField !== undefined ? resolvePath(data, elementData.dataField, '') : ''
  return <div>
    {dynamicValue !== '' ? <div style={setStyle}>{dynamicValue}</div> : null}
  </div>
}
