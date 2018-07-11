import React, { Fragment } from 'react'
import { RenderLabel } from './RenderLabel'
import { RenderDataField } from './RenderDataField'

export const RenderComponent = (props) => {
  const { data, elementData } = props
  const { type } = elementData
  return <Fragment>
    {type !== undefined ? <Fragment>
      {type === 'dataField' ? <RenderDataField data={data} elementData={elementData} /> : null}
      {type === 'label' ? <RenderLabel data={elementData} /> : null}
    </Fragment> : null}
  </Fragment>
}
