import React, { Fragment } from 'react'

export const RenderLabel = ({data}) => {
  const { name, align, fontSize, fontWeight, signLine, addBorder } = data
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setWeight = fontWeight !== undefined ? {fontWeight: fontWeight} : {}
  const setBorder = addBorder !== undefined && addBorder === 'yes' ? {border: '1px solid #000'} : {}
  const setStyle = {...setSize, ...setAlign, ...setWeight}

  let setLine = {
    div: {},
    wrap: { display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center' }
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
  return <div style={{...setLine.wrap, ...setBorder}}>
    {name !== undefined ? <div style={setStyle}>{name}</div> : null}
    {signLine !== undefined ? <div style={setLine.div} /> : null}
  </div>
}
