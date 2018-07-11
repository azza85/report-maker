import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const isInArray = (value, array) => {
  if (array !== undefined && value) {
    return array.indexOf(value) > -1
  }
}

const removeFromObj = (obj, items) => {
  const fields = Object.keys(obj)
    .filter(item => !isInArray(item, items))
  return fields.reduce((fieldObj, field) => {
    return Object.assign({},
      fieldObj,
      {[field]: obj[field]}
    )
  }, {})
}

const myData = {
  selectedplayer,
  disciplineAction,
  squad,
  match,
  matchDetails,
  matchPlayerStatsTeam,
  matchTeamStatsTeam
}
/*
* loop through these fields to make objects by this id where defined
* console.log('test',Object.keys(test).map(item => test[item]))
* each item in myData that is array will loop through and create by object
* for fields with objects
*/

const myJoinFields = [{field: 'member_id', object: 'member'}, {field: 'match_id', object: ''}]
ReactDOM.render(
  <App data={myData} joinFields={myJoinFields} />,
  document.getElementById('root'))
registerServiceWorker()
