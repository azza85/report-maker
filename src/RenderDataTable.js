import React from 'react'
import rangeInclusive from 'range-inclusive'

const formatDataValue = ({elementData, colItem, memberDetails, item}) => {
  console.log({elementData, colItem, memberDetails, item})

  const setValue = elementData[`colval${colItem}`] !== undefined
    ? memberDetails[item][elementData[`colval${colItem}`].split('.')[1]]
    : ''
  // : item[elementData[`colval${colItem}`]] : ''
  return setValue
}
export const RenderDataTable = ({data, listData, elementData}) => {
  const setListData = listData[elementData['listData']]
  const { memberDetails } = data
  const { fontSize, align, cols, maxRows, filter, sortBy } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setStyle = {...setSize, ...setAlign}
  const filterSetListData = filter !== undefined && filter !== '' ? setListData.filter(item => item[filter]) : setListData
  const sortedSetListData = sortBy !== undefined && sortBy !== '' ? filterSetListData.sort((a, b) => parseInt(a[sortBy], 10) - parseInt(b[sortBy], 10)) : filterSetListData
  const finalListData = rangeInclusive(maxRows).map((item, index) => sortedSetListData[index] !== undefined ? sortedSetListData[index] : Object.keys(sortedSetListData[0]).reduce((obj, rItem) => {
    return {
      ...obj,
      [rItem]: ''
    }
  }, {}))

  return <div>
    {finalListData.length ? <table style={setStyle}>
      <thead>
        <tr>{rangeInclusive(cols).map(item => <th key={item}>{elementData[`col${item}`]}</th>)}</tr>
      </thead>
      <tbody>
        {finalListData.map((item, index) => <tr key={index}>
          {rangeInclusive(cols).map(colItem => {
            const setValue = formatDataValue({index, elementData, colItem, finalListData, memberDetails, item})
            return <td key={colItem}>{setValue}</td>
          }
          )}
        </tr>)}
      </tbody>
    </table> : null}
  </div>
}
