import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout'
import { Popup } from './Popup'

/**
 * Add to
 * const test = {
  selectedplayer,
  disciplineAction,
  squad
}

  const converArrToObj = Object.keys(test)
  .filter(item => test[item] instanceof Array)
  .reduce((obj, item) => {
      return {
        ...obj,
        [`${item}byID`]: listToObjectByID(test[item],'member_id','member')
      }
    }, {})

  console.log('testing => ', {...test,...converArrToObj})

function listToObjectByID (array, key, myObj) {
  return array.length ? array.reduce((obj, item) => {
    return myObj !== undefined ? {
      ...obj, [item[myObj][key]]: item
    } : {
      ...obj, [item[key]]: item
    }
  }, {}) : {}
}
 */
class App extends Component {
  constructor (props) {
    super(props)

    // const baseArr = [0, 1, 2, 3, 4]
    const baseArr = []
    this.state = {
      cols: 4,
      rowHeight: 100,
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
      newCounter: baseArr.length,
      showPopup: false,
      textFields: ['label']
    }

    this.onAddItem = this.onAddItem.bind(this)
    this.cellProperties = this.cellProperties.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  createElement (el) {
    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    }
    const i = el.add ? '+' : el.i
    return (
      <div key={i} data-grid={el}>
        <span
          className='properties'
          onClick={this.cellProperties}
          title='You can add an item by clicking here, too.'
        >&#9881;</span>
        <span
          className='remove'
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >&#10006;</span>
      </div>
    )
  }

  cellProperties () {
    console.log('cellProperties')
  }

  closePopup () {
    this.setState({
      showPopup: false
    })
  }
  onAddItem () {
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      showPopup: true
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
  render () {
    const { data } = this.props
    const { cols, rowHeight, showPopup, textFields } = this.state

    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className={'App'} style={{
        display: 'flex'
      }}>
        <ul className={'list'}>
          <p>Add Data</p>
          {Object.keys(data).map((item, index) => <li key={index}>
            <button onClick={this.onAddItem}>{item}</button>
            {/* <ul>{Object.keys(data[item]).map((subItem, subIndex) =>
              <li key={subIndex}>{subItem}</li>
            )}</ul> */}
          </li>)}
          <p>Add Text</p>
          {textFields.map(item => <li key={item}><button onClick={this.onAddItem}>{item}</button></li>)}
        </ul>
        <ReactGridLayout className='layout' cols={cols} rowHeight={rowHeight} width={595}>
          {this.state.items.map(el => this.createElement(el))}
        </ReactGridLayout>
        {showPopup
          ? <Popup closePopup={this.closePopup} /> : null}
      </div>
    )
  }
}

export default App
