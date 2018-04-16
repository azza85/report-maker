import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const myData = {
  players: [{a: 1, b: 2}]
}
/*
* loop through these fields to make objects by this id where defined
* console.log('test',Object.keys(test).map(item => test[item]))
* each item in myData that is array will loop through and create by object
* for fields with objects
*/

const myJoinFields = ['member_id']
ReactDOM.render(
  <App data={myData} joinFields={myJoinFields} />,
  document.getElementById('root'))
registerServiceWorker()
