import React from 'react'

export const RenderLabel = ({data}) => {
  const { name, align, fontSize, fontWeight, signLine } = data
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setWeight = fontWeight !== undefined ? {fontWeight: fontWeight} : {}
  let setLine = {
    div: {},
    wrap: {}
  }
  if (signLine === 'right') {
    setLine = {
      div: { borderBottom: '1px solid', flex: 1 },
      wrap: { display: 'flex' }
    }
  } else if (signLine === 'left') {
    setLine = {
      div: { borderBottom: '1px solid', flex: 1 },
      wrap: { display: 'flex', flexDirection: 'row-reverse' }
    }
  } else if (signLine === 'bottom') {
    setLine = {
      div: { borderBottom: '1px solid', flex: 1 },
      wrap: { display: 'flex', height: '100%', flexDirection: 'column' }
    }
  } else if (signLine === 'top') {
    setLine = {
      div: { borderBottom: '1px solid', flex: 1 },
      wrap: { display: 'flex', height: '100%', flexDirection: 'column-reverse' }
    }
  }
  const setStyle = {...setSize, ...setAlign, ...setWeight}
  return <div style={setLine.wrap}>
    {name !== undefined ? <div style={setStyle}>{name}</div> : null}
    {signLine !== undefined ? <div style={setLine.div} /> : null}
  </div>
}
