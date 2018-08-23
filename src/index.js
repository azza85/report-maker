import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import getDisciplineAction from './api/getDisciplineAction'
import getMatchData from './api/getMatchData'
import getSquad from './api/getSquad'
import getSelectedPlayer from './api/getSelectedPlayer'
import getTeamOfficial from './api/getTeamOfficial'
import getMatchOfficial from './api/getMatchOfficial'
import getLogo from './api/getLogo'

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

const getYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp)
  const dateStr = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
  return dateStr
}

const get12HourTime = (timestamp) => {
  if (timestamp !== null) {
    let time = timestamp.split('T')[1]
    let hour = parseInt(time.substring(0, 2), 10)
    let minutes = time.substring(2, 5)
    const ampm = (hour > 11) ? ' PM' : ' AM'
    hour = (hour > 12) ? (hour - 12) : hour
    const getTime = hour + minutes + ampm
    return getTime
  } else {
    return ''
  }
}

const calcAge = (dateYYYYMMDD) => {
  /* dateYYYYMMDD - YYYY-MM-DD */
  const birthday = new Date(dateYYYYMMDD)
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const disciplineAction = getDisciplineAction()
const matchData = getMatchData()

const customMatchData = {
  matchDate: getYYYYMMDD(matchData.match_datetime),
  matchTime: get12HourTime(matchData.match_datetime),
  currentTeam: matchData.team1.name,
  matchup: `${matchData.team1.name} vs ${matchData.team2.name}`
}
const match = {
  ...matchData,
  ...customMatchData
}

const selectedplayer = getSelectedPlayer()
const teamOfficial = getTeamOfficial().map(item => ({...item, member: item.official_response_data.member}))
const matchOfficial = getMatchOfficial()

const squad = getSquad()
const team1Logo = getLogo()
const memberFields = {name: '', age: '', dob: '', nationality: '', id: ''}
const memberDetailObject = (item) => ({
  name: `${item.member.first_name} ${item.member.last_name}`,
  age: calcAge(item.member.dob),
  dob: item.member.dob,
  nationality: item.member.nationality,
  id: item.member.fifaconnect_id })

const getMemberDetails = (data, memberType) => {
  return data.map(item => item.members_response_data[memberType].reduce((obj, item) => {
    return {
      ...obj,
      [item.member.member_id]: memberDetailObject(item)
    }
  }, {}))
}
const squadPlayerDetails = getMemberDetails(squad, 'players')
const squadOfficialDetails = getMemberDetails(squad, 'officials')
const matchOfficialDetails = matchOfficial.reduce((obj, item) => {
  return {
    ...obj,
    [item.official_response_data.member.member_id]: memberDetailObject(item.official_response_data)
  }
}, {})

const memberDetails = {
  ...squadPlayerDetails[0],
  ...squadOfficialDetails[0],
  ...matchOfficialDetails
}
console.log('memberDetails', memberDetails)
/*
const selectedplayer = {}
const disciplineAction = {}
const squad = {}
const match = {}
*/
const matchDetails = removeFromObj(match, ['players_match_data', 'teams_match_data'])
const matchPlayerStatsTeam = [match.players_match_data]
const matchTeamStatsTeam = [match.teams_match_data.teams]

const myData = {
  // disciplineAction,
  // squad: squad[0],
  matchDetails: matchDetails,
  memberDetails
  // matchPlayerStatsTeam,
  // matchTeamStatsTeam
}
const objectFields = {
  matchDetails
}

const listFields = {
  memberDetails
}
const listData = {
  selectedplayer,
  squad,
  teamOfficial,
  matchOfficial,
  disciplineAction
}
/*
* loop through these fields to make objects by this id where defined
* console.log('test',Object.keys(test).map(item => test[item]))
* each item in myData that is array will loop through and create by object
* for fields with objects
*/

const myJoinFields = [{field: 'member_id', object: 'member'}, {field: 'match_id', object: ''}]
ReactDOM.render(
  <App data={myData} listFields={listFields} listData={listData} objectFields={objectFields} joinFields={myJoinFields} />,
  document.getElementById('root'))
registerServiceWorker()
