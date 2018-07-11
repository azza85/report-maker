import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout'
import deepKeys from 'deep-keys'
import { Popup } from './Popup'
import { RenderComponent } from './RenderComponent'

class App extends Component {
  constructor (props) {
    super(props)
    // const baseArr = [0, 1, 2, 3, 4]
    const baseArr = [
      {
        'w': 11,
        'h': 3,
        'x': 0,
        'y': 0,
        'i': 'n0',
        'moved': false,
        'static': false
      },
      {
        'w': 14,
        'h': 1,
        'x': 16,
        'y': 0,
        'i': 'n1',
        'moved': false,
        'static': false
      },
      {
        'w': 11,
        'h': 1,
        'x': 0,
        'y': 3,
        'i': 'n2',
        'moved': false,
        'static': false
      },
      {
        'w': 7,
        'h': 1,
        'x': 16,
        'y': 2,
        'i': 'n3',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 1,
        'x': 24,
        'y': 2,
        'i': 'n4',
        'moved': false,
        'static': false
      },
      {
        'w': 14,
        'h': 1,
        'x': 16,
        'y': 3,
        'i': 'n5',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 1,
        'x': 16,
        'y': 1,
        'i': 'n6',
        'moved': false,
        'static': false
      },
      {
        'w': 2,
        'h': 1,
        'x': 22,
        'y': 1,
        'i': 'n7',
        'moved': false,
        'static': false
      },
      {
        'w': 6,
        'h': 1,
        'x': 24,
        'y': 1,
        'i': 'n8',
        'moved': false,
        'static': false
      },
      {
        'w': 10,
        'h': 1,
        'x': 0,
        'y': 4,
        'i': 'n9',
        'moved': false,
        'static': false
      },
      {
        'w': 10,
        'h': 1,
        'x': 10,
        'y': 4,
        'i': 'n11',
        'moved': false,
        'static': false
      },
      {
        'w': 10,
        'h': 1,
        'x': 20,
        'y': 4,
        'i': 'n10',
        'moved': false,
        'static': false
      }
    ]
    this.state = {
      currentItem: '',
      readOnly: false,
      data: [],
      cols: 30,
      rowHeight: 20,
      items: baseArr.map(function (i, key, list) {
        return {
          i: `n${key}`,
          x: i.x !== undefined ? i.x : 0,
          y: i.y !== undefined ? i.y : 0,
          w: i.w !== undefined ? i.w : 2,
          h: i.h !== undefined ? i.h : 2,
          add: key + 1 === (list.length - 1).toString()
        }
      }),
      itemData: {
        'n0': {
          'name': 'Team Nomination',
          'type': 'label',
          'fontSize': '20'
        },
        'n1': {
          'dataField': 'match.comp.name',
          'name': 'Comp Name',
          'type': 'dataField',
          'fontSize': '14',
          'align': 'right'
        },
        'n2': {
          'name': 'Team Name',
          'type': 'dataField',
          'fontSize': '14',
          'dataField': 'matchDetails.team1.name'
        },
        'n3': {
          'name': 'Team 1 Vs Team 2',
          'type': 'dataField',
          'fontSize': '12',
          'dataField': 'match.match_datetime'
        },
        'n4': {
          'name': '2018-05-13',
          'type': 'label',
          'fontSize': '12'
        },
        'n5': {
          'name': 'Kick Off 3:00pm',
          'type': 'dataField',
          'fontSize': '12',
          'dataField': 'matchDetails.venue.name',
          'align': 'right'
        },
        'n6': {
          'name': 'Team 1 Name',
          'type': 'dataField',
          'fontSize': '12',
          'dataField': 'match.team1.name',
          'align': 'right'
        },
        'n7': {
          'name': 'VS',
          'type': 'label',
          'fontSize': '12',
          'align': 'center'
        },
        'n8': {
          'name': 'Team 2 Name',
          'type': 'dataField',
          'fontSize': '12',
          'dataField': 'match.team2.name',
          'align': 'right'
        },
        'n9': {
          'type': 'label',
          'name': 'Shirt Colour:',
          'fontSize': '12',
          'signLine': 'right'
        },
        'n10': {
          'type': 'label',
          'name': 'Shorts Colour:',
          'fontSize': '12',
          'signLine': 'right'
        },
        'n11': {
          'type': 'label',
          'name': 'Socks:',
          'fontSize': '12',
          'signLine': 'right'
        }
      },
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
    this.onPrintView = this.onPrintView.bind(this)
  }

  componentDidMount () {
    this.setState(function (prevState, props) {
      return {
        data: prevState.data.length === 0 ? props.data : prevState.data
      }
    })
  }

  listToObjectByID (array, key, myObj) {
    return array !== undefined && array.length ? array.reduce((obj, item) => {
      return Object.keys(obj).length && myObj !== undefined ? {
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
    return <div key={i} data-grid={el}>
      <span
        className='properties'
        onClick={this.cellProperties.bind(this, el)}
      >&#9881;</span>
      <span
        className='remove'
        style={removeStyle}
        onClick={this.onRemoveItem.bind(this, i)}
      >&#10006;</span>
      <RenderComponent {...this.props} elementData={elementData} />
    </div>
  }

  cellProperties (el) {
    this.setState({
      currentItem: el.i,
      showPopup: true,
      itemData: {
        ...this.state.itemData,
        [el.i]: {
          ...this.state.itemData[el.i]
        }
      }
    })
  }

  closePopup () {
    this.setState({
      showPopup: false
    })
  }
  handleChange (event) {
    this.setState({
      itemData: {
        ...this.state.itemData,
        [this.state.currentItem]: {
          ...this.state.itemData[this.state.currentItem],
          [event.target.name]: event.target.value
        }
      }
    })
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

  onPrintView () {
    this.setState({
      readOnly: !this.state.readOnly
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
    const { data } = this.props
    const { cols, rowHeight, showPopup, readOnly,
      itemData, currentItem } = this.state
    const formattedData = {
      ...data
      // ...this.converArrayToObj(data, joinFields)
    }

    return (
      <div>
        <div className={readOnly ? 'App readonly' : 'App'} style={{display: 'flex', flexDirection: 'column'}}>
          <ul className={'list'}>
            {!readOnly && <button onClick={this.onAddItem}>{'Add Field'}</button>}
            <button onClick={this.onPrintView}>{'Toggle Print View'}</button>
          </ul>
          <ReactGridLayout onLayoutChange={this.onLayoutChange}
            className='layout' cols={cols} rowHeight={rowHeight} width={794}>
            {this.state.items.map(el => this.createElement(el))}
          </ReactGridLayout>
          {showPopup
            ? <Popup formattedData={formattedData} form={itemData[currentItem]} handleChange={this.handleChange} closePopup={this.closePopup} /> : null}
        </div>
        <pre>{JSON.stringify(this.state.items, null, ' ')}</pre>
        <pre>{JSON.stringify(this.state.itemData, null, ' ')}</pre>
      </div>
    )
  }
}

export default App
