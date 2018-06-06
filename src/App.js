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
       "w": 4,
       "h": 3,
       "x": 0,
       "y": 0,
       "i": "n0",
       "moved": false,
       "static": false
      },
      {
       "w": 4,
       "h": 1,
       "x": 8,
       "y": 0,
       "i": "n1",
       "moved": false,
       "static": false
      },
      {
       "w": 4,
       "h": 1,
       "x": 0,
       "y": 3,
       "i": "n2",
       "moved": false,
       "static": false
      },
      {
       "w": 4,
       "h": 1,
       "x": 8,
       "y": 1,
       "i": "n3",
       "moved": false,
       "static": false
      },
      {
       "w": 2,
       "h": 1,
       "x": 8,
       "y": 2,
       "i": "n4",
       "moved": false,
       "static": false
      },
      {
       "w": 2,
       "h": 1,
       "x": 10,
       "y": 2,
       "i": "n5",
       "moved": false,
       "static": false
      },
      {
       "w": 4,
       "h": 1,
       "x": 8,
       "y": 3,
       "i": "n6",
       "moved": false,
       "static": false
      }
     ]
    this.state = {
      currentItem:'',
      readOnly: false,
      data: [],
      cols: 12,
      rowHeight: 20,
      items: baseArr.map(function (i, key, list) {
        return {
          i: `n${key}`,
          x: i.x !== undefined ? i.x:0,
          y: i.y !== undefined ? i.y:0,
          w: i.w !== undefined ? i.w:2,
          h: i.h !== undefined ? i.h:2,
          add: key+1 === (list.length - 1).toString()
        }
      }),
      itemData: {
        "n0": {
         "name": "Team Nomination",
         "type": "label",
         "fontSize": "20"
        },
        "n1": {
         "name": props.data.selectedplayer[0]['member']['first_name'],
         "type": "label",
         "fontSize": "14"
        },
        "n2": {
         "name": "Team Name",
         "type": "label",
         "fontSize": "14",
         "signLine": "1"
        },
        "n3": {
         "name": "Team 1 Vs Team 2",
         "type": "label",
         "fontSize": "12"
        },
        "n4": {
         "name": "2018-05-13",
         "type": "label",
         "fontSize": "12"
        },
        "n5": {
         "name": "Kick Off 3:00pm",
         "type": "label",
         "fontSize": "12"
        },
        "n6": {
         "name": "Venue Name",
         "type": "label",
         "fontSize": "12"
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
      <RenderComponent {...this.props} elementData={elementData}/>
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
    console.log('cellProperties', this.state.itemData)
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

  onPrintView(){
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
    const { data, joinFields } = this.props
    const { cols, rowHeight, showPopup, readOnly,
    itemData, currentItem } = this.state
    const formattedData = {
      ...data,
      ...this.converArrayToObj(data, joinFields)
    }
    const camelToDash = str => str.replace(/(^[A-Z])/, ([first]) => first).replace(/([A-Z])/g, ([letter]) => ` ${letter}`)
    const underToSpace = str => str.replace(/_/g,' ')
    const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)
    const formatDBFieldToStr = str => capitalizeFirstLetter(camelToDash(underToSpace(str)))

    const firstData = Object.keys(data).map(item => ({[item]: data[item][0]}))
    const setKeys = deepKeys(firstData,true)
      .map(item => item.split('.').slice(1))
      .map((item) => ({
        section: item[0] !== undefined ? formatDBFieldToStr(item[0]):'',
        level1: item[1] !== undefined ? formatDBFieldToStr(item[1]):'',
        level1Key: item[1] !== undefined ? item[1]:'',
        level2: item[2] !== undefined ? formatDBFieldToStr(item[2]):'',
        level2Key: item[2] !== undefined ? item[2]:'',
        level3: item[3] !== undefined ? formatDBFieldToStr(item[3]):'',
        level3Key: item[3] !== undefined ? item[3]:'',
        level4: item[4] !== undefined ? formatDBFieldToStr(item[4]):'',
        level4Key: item[4] !== undefined ? item[4]:''
      })
    )
    const createDataField = (section,arr) => {
      if(arr.level4 !== ''){
        return `['${section}'][0]['${arr.level1Key}']['${arr.level2Key}']['${arr.level3Key}']['${arr.level4Key}']`
      }
      if(arr.level3 !== ''){
        return `['${section}'][0]['${arr.level1Key}']['${arr.level2Key}']['${arr.level3Key}']`
      }
      if(arr.level2 !== ''){
        return `['${section}'][0]['${arr.level1Key}']['${arr.level2Key}']`
      }
      if(arr.level1 !== ''){
        return `['${section}'][0]['${arr.level1Key}']`
      }
    }
    const getDataLabel = (arr) => {
      if(arr.level4 !== ''){
        return arr.level4
      }
      if(arr.level3 !== ''){
        return arr.level3
      }
      if(arr.level2 !== ''){
        return arr.level2
      }
      if(arr.level1 !== ''){
        return arr.level1
      }
    }
    const sections = Object.keys(data).map(item => ({
      key: item,
      label: formatDBFieldToStr(item),
      options: setKeys
      .filter(filteredItem => filteredItem.section === formatDBFieldToStr(item))
      .map(mappedItem => ({
        label: getDataLabel(mappedItem) !== undefined ? getDataLabel(mappedItem):'',
        value: createDataField(item,mappedItem) !== undefined ? createDataField(item,mappedItem):''
      })
    )
    }))

    console.log('sections',sections)
    console.log('setKeys',setKeys)
    console.log('data',data)

    return (
      <div>
        <div className={readOnly ? 'App readonly':'App'} style={{display: 'flex'}}>
          <ul className={'list'}>
            {!readOnly && <button onClick={this.onAddItem}>{'Add Field'}</button>}
            <button onClick={this.onPrintView}>{'Toggle Print View'}</button>
          </ul>
          <ReactGridLayout onLayoutChange={this.onLayoutChange}
            className='layout' cols={cols} rowHeight={rowHeight} width={595}>
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
