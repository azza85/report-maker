import React, { Fragment } from 'react'

import rangeInclusive from 'range-inclusive'

export const RenderTable = ({data, listData, elementData}) => {
  const setListData = listData[elementData['listData']]
  const { memberDetails } = data
  const { fontSize, align, cols, maxRows, hasNumber } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setStyle = {...setSize, ...setAlign}

  const finalListData = rangeInclusive(maxRows).map((item, rowIndex) => rangeInclusive(cols).map((col, colIndex) => hasNumber ? rowIndex > 0 ? (rowIndex * cols) + (colIndex + 1) : colIndex + 1 : ''))
  return <Fragment>
    {finalListData.length ? <table style={setStyle}>
      <tbody>
        {finalListData.map((rowItem, rowIndex) =>
          <tr key={rowIndex}>{rowItem.map((colItem, colIndex) => <td key={colIndex}>{colItem}</td>)}</tr>
        )}
      </tbody>
    </table> : null}
  </Fragment>
}
