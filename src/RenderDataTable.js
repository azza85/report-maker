import React from 'react'
import rangeInclusive from 'range-inclusive'

export const RenderDataTable = ({data, listData, elementData}) => {
  const setListData = listData[elementData['listData']]
  const { memberDetails } = data
  const { fontSize, align, cols, maxRows } = elementData
  const setSize = fontSize !== undefined ? {fontSize: parseInt(fontSize, 10)} : {}
  const setAlign = align !== undefined ? {textAlign: align} : {}
  const setStyle = {...setSize, ...setAlign}
  const finalListData = rangeInclusive(maxRows).map((item, index) => setListData[index] !== undefined ? setListData[index] : Object.keys(setListData[0]).reduce((obj, rItem) => {
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
            const setValue = elementData[`colval${colItem}`] !== undefined ? elementData[`colval${colItem}`].split('.')[0] === 'memberDetails'
              ? finalListData[index].member !== ''
                ? memberDetails[finalListData[index].member.member_id][elementData[`colval${colItem}`].split('.')[1]]
                : ''
              : item[elementData[`colval${colItem}`]] : ''
            return <td key={colItem}>{setValue}</td>
          }
          )}
        </tr>)}
      </tbody>
    </table> : null}
  </div>
}
