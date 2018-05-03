import React from 'react'
import { RenderLabel } from './RenderLabel'

export const RenderComponent = ({data}) => {
  const { name, type, fontSize } = data
  return <div>
      {type !== undefined ? <div>
        {type === 'label' ? <RenderLabel data={data} />:null}
      </div>:null}

  </div>
}
