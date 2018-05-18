import React from 'react'
import { RenderLabel } from './RenderLabel'

export const RenderComponent = (props) => {
  const { data, elementData } = props
  const { name, type, fontSize, dataField } = elementData
  if(type === 'dataField') {
    console.log('RenderComponent',data['selectedplayer'][0]['team_id'])
    if(elementData.dataField !== undefined) {
      const test = elementData.dataField.split('.').map(item =>`['${item}']`).join('')

    }
  }
  return <div>
      {type !== undefined ? <div>
        {type === 'label' ? <RenderLabel data={elementData} />:null}
        {type === 'dataField' ? <div>{dataField}</div>:null}
      </div>:null}

  </div>
}
