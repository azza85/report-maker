import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'




const myData = {
  selectedplayer,
  disciplineAction,
  squad,
  //match
}
/*
* loop through these fields to make objects by this id where defined
* console.log('test',Object.keys(test).map(item => test[item]))
* each item in myData that is array will loop through and create by object
* for fields with objects
*/

const myJoinFields = [{field: 'member_id', object: 'member'},{field: 'match_id', object: ''}]
ReactDOM.render(
  <App data={myData} joinFields={myJoinFields} />,
  document.getElementById('root'))
registerServiceWorker()
