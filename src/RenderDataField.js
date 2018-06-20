import React from 'react'
const resolvePath = (object, path, defaultValue) => path
   .split('.')
   .reduce((o, p) => o ? o[p] : defaultValue, object)

export const RenderDataField = ({data,elementData}) => {
  const { name, type, fontSize } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize,10)}:{}
  console.log('elementData',setSize)
  const dynamicValue = elementData.dataField !== undefined ? resolvePath(data,elementData.dataField,''):''
  return <div>
    {dynamicValue !== '' ? <div style={setSize}>{dynamicValue}</div>:null}
  </div>
}
