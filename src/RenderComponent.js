import React, { Fragment } from 'react'
import { RenderLabel } from './RenderLabel'
import { RenderDataField } from './RenderDataField'
import { RenderDataTable } from './RenderDataTable'

export const RenderComponent = (props) => {
  const { data, listData, elementData } = props
  const { type } = elementData
  return <Fragment>
    {type !== undefined ? <Fragment>
      {type === 'dataTable' ? <RenderDataTable listData={listData} data={data} elementData={elementData} /> : null}
      {type === 'dataField' ? <RenderDataField data={data} elementData={elementData} /> : null}
      {type === 'label' ? <RenderLabel data={elementData} /> : null}
    </Fragment> : null}
  </Fragment>
}
