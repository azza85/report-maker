import React from 'react'
const resolvePath = (object, path, defaultValue) => path
  .split('.')
  .reduce((o, p) => o ? o[p] : defaultValue, object)

export const RenderDataField = ({data, elementData}) => {
  const { addBorder, fontSize, fontWeight, align } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setWeight = fontWeight !== undefined ? {fontWeight: fontWeight} : {}
  const setStyle = {...setSize, ...setAlign, ...setWeight}
  const setBorder = addBorder !== undefined && addBorder === 'yes' ? {border: '1px solid #000'} : {}
  const dynamicValue = elementData.dataField !== undefined ? resolvePath(data, elementData.dataField, '') : ''
  return <div style={{...setBorder, ...{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }}}>
    {dynamicValue !== '' ? <div style={setStyle}>{dynamicValue}</div> : null}
  </div>
}
