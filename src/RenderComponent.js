import React from 'react'
import { RenderLabel } from './RenderLabel'
import { RenderDataField } from './RenderDataField'

export const RenderComponent = (props) => {
  const { data, elementData } = props
  const { name, type, fontSize, dataField } = elementData
  return <div>
      {type !== undefined ? <div>
        {type === 'dataField' ? <RenderDataField data={data} elementData={elementData} />:null}
        {type === 'label' ? <RenderLabel data={elementData} />:null}
      </div>:null}

  </div>
}
