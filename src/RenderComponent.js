import React, { Fragment } from 'react'
import { RenderLabel } from './RenderLabel'
import { RenderDataField } from './RenderDataField'
import { RenderDataTable } from './RenderDataTable'
import { RenderTable } from './RenderTable'

export const RenderComponent = (props) => {
  const { data, listData, elementData } = props
  const { type } = elementData
  return <Fragment>
    {type !== undefined ? <Fragment>
      {type === 'table' ? <RenderTable listData={listData} data={data} elementData={elementData} /> : null}
      {type === 'dataTable' ? <RenderDataTable listData={listData} data={data} elementData={elementData} /> : null}
      {type === 'dataField' ? <RenderDataField data={data} elementData={elementData} /> : null}
      {type === 'label' ? <RenderLabel data={elementData} /> : null}
    </Fragment> : null}
  </Fragment>
}
