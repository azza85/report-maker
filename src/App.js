import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { Popup } from './Popup'

class App extends Component {
  constructor (props) {
    super(props)
    // const baseArr = [0, 1, 2, 3, 4]
    const baseArr = []
    this.state = {
      data: [],
      cols: 12,
      rowHeight: 20,
      items: baseArr.map(function (i, key, list) {
        return {
          i: `n${i}`,
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1).toString()
        }
      }),
      itemData: {},
      newCounter: baseArr.length,
      showPopup: false,
      textFields: ['label'],
      value: ''
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.cellProperties = this.cellProperties.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.listToObjectByID = this.listToObjectByID.bind(this)
    this.converArrayToObj = this.converArrayToObj.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps')
    if (Object.keys(nextProps.data).length && this.state.data.length === 0) {
      this.setState({
        data: this.converArrayToObj(nextProps.data, nextProps.joinFields)
      })
    }
  }

  listToObjectByID (array, key, myObj) {
    return array !== undefined && array.length ? array.reduce((obj, item) => {
      return myObj !== undefined ? {
        ...obj, [item[myObj][key]]: item
      } : {
        ...obj, [item[key]]: item
      }
    }, {}) : {}
  }

  converArrayToObj (myObj, joinFields) {
    return Object.keys(myObj)
      .filter(item => myObj[item] instanceof Array)
      .reduce((obj, item) => {
        return {
          ...obj,
          [`${item}byID`]: this.listToObjectByID(myObj[item], joinFields[0].field, joinFields[0].object)
        }
      }, {})
  }
  createElement (el) {
    const { itemData } = this.state
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    }
    const i = el.add ? '+' : el.i
    const elementData = itemData[i] !== undefined ? itemData[i] : {}
    return (
      <div key={i} data-grid={el}>
        <span
          className='properties'
          onClick={this.cellProperties.bind(this, el)}
          title='You can add an item by clicking here, too.'
        >&#9881;</span>
        <span
          className='remove'
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >&#10006;</span>
        {elementData.name !== undefined ? <p>{elementData.name}</p> : null}
      </div>
    )
  }

  cellProperties (el) {
    this.setState({
      showPopup: true,
      itemData: {
        ...this.state.itemData,
        [el.i]: {
          name: this.state.value
        }
      }
    })
    console.log('cellProperties', el)
  }

  closePopup () {
    this.setState({
      showPopup: false
    })
  }
  handleChange (event) {
    this.setState({value: event.target.value})
  }
  onAddItem () {
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        type: 'test',
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
      // showPopup: true
    })
  }

  onRemoveItem (i) {
    const itemsIDs = this.state.items.map(item => item.i)
    const idsIndex = itemsIDs.lastIndexOf(i) || 0
    this.setState({
      items: [
        ...this.state.items.slice(0, idsIndex),
        ...this.state.items.slice(idsIndex + 1)
      ]
    })
  }

  onLayoutChange (layout) {
    this.setState({
      items: layout
    })
  }
  render () {
    const { data, joinFields } = this.props
    const { cols, rowHeight, showPopup, value } = this.state
    const formattedData = {
      ...data,
      ...this.converArrayToObj(data, joinFields)
    }
    console.log('formattedData', formattedData)
    console.log('this', this.state)

    return (
      <div>
        <div className={'App'} style={{
          display: 'flex'
        }}>
          <ul className={'list'}>
            <button onClick={this.onAddItem}>{'Add Field'}</button>
          </ul>
          <ReactGridLayout onLayoutChange={this.onLayoutChange}
            className='layout' cols={cols} rowHeight={rowHeight} width={595}>
            {this.state.items.map(el => this.createElement(el))}
          </ReactGridLayout>
          {showPopup
            ? <Popup form={value} handleChange={this.handleChange} closePopup={this.closePopup} /> : null}
        </div>
        <pre>{JSON.stringify(this.state.items, null, ' ')}</pre>
      </div>
    )
  }
}

export default App
