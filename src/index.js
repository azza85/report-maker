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
import { getMemberDetails, memberDetailObject, selectedPlayerDetails } from './helpers/utils'

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

const disciplineAction = getDisciplineAction()
const matchData = getMatchData()
const selectedplayer = getSelectedPlayer()
const teamOfficial = getTeamOfficial().map(item => ({...item, member: item.official_response_data.member}))
const matchOfficial = getMatchOfficial()
const getSelectedPlayerDetails = selectedPlayerDetails(selectedplayer)
const squad = getSquad()
const team1Logo = getLogo()

const squadPlayerDetails = getMemberDetails(squad, 'players', getSelectedPlayerDetails)
const squadOfficialDetails = getMemberDetails(squad, 'officials', getSelectedPlayerDetails)

const selectedplayerData = selectedplayer.map(item => item.member.member_id)
const teamOfficialData = teamOfficial.map(item => item.member.member_id)
const matchOfficialData = matchOfficial.map(item => item.official_response_data.member.member_id)
const squadPlayersData = Object.keys(squadPlayerDetails[0])
const squadOfficialsData = Object.keys(squadOfficialDetails[0])

const matchOfficialDetails = matchOfficial.reduce((obj, item) => {
  return {
    ...obj,
    [item.official_response_data.member.member_id]: {
      ...memberDetailObject(item.official_response_data, getSelectedPlayerDetails),
      roleID: item.official_request_data.role_id
    }
  }
}, {})

const matchOfficialByRole = matchOfficial.reduce((obj, item) => {
  return {
    ...obj,
    [item.official_request_data.role_id]: item.official_response_data.member.member_id
  }
}, {})

const memberDetails = {
  ...squadPlayerDetails[0],
  ...squadOfficialDetails[0],
  ...matchOfficialDetails
}
const getMatchOfficialByRole = (roleID) => matchOfficialByRole[roleID] !== undefined ? memberDetails[matchOfficialByRole[roleID]].name : ''
const customMatchData = {
  match_Date: getYYYYMMDD(matchData.match_datetime),
  match_Time: get12HourTime(matchData.match_datetime),
  current_Team: matchData.team1.name,
  matchup: `${matchData.team1.name} vs ${matchData.team2.name}`,
  referee: getMatchOfficialByRole(12),
  referee_Ast_1: getMatchOfficialByRole(13),
  referee_Ast_2: getMatchOfficialByRole(17),
  referee_Ast_4: getMatchOfficialByRole(14),
  reserve_Assistant_Referee: getMatchOfficialByRole(18),
  match_Commissioner: getMatchOfficialByRole(15),
  general_Coordinator: getMatchOfficialByRole(16),
  team1_Head_Coach: 'HDCH',
  team2_Head_Coach: 'HDCH',
  team1_Manager: 'TMGR',
  team2_Manager: 'TMGR'
}
const match = {
  ...matchData,
  ...customMatchData
}

/*
const selectedplayer = {}
const disciplineAction = {}
const squad = {}
const match = {}
*/
const match_Details = removeFromObj(match, ['players_match_data', 'teams_match_data'])
const matchPlayerStatsTeam = match.players_match_data
const matchTeamStatsTeam = match.teams_match_data.teams.reduce((obj, item) => {
  return {
    ...obj,
    [item.team_id]: item
  }
}, {})
const playerStatsByTeam = matchPlayerStatsTeam.reduce((obj, item) => {
  return {
    ...obj,
    [item.team_id]: item.players
  }
}, {})

const memberFields = {name: '', age: '', dob: '', nationality: '', id: ''}
const playerFields = { ...memberFields, position: '', isStarting: '', isCaptain: '', playerNumber: '' }
const cardFields = {minute: '', minute_add: '', player_id: ''}
const listFields = {
  selectedplayerData: playerFields,
  squadPlayersData: memberFields,
  squadOfficialsData: memberFields,
  teamOfficialData: memberFields,
  matchOfficialData: memberFields,
  // disciplineAction: memberFields,
  yellow_cards: cardFields,
  red_cards: cardFields,
  goals: {minute: '', minute_add: '', player_id: '', type: ''},
  substitutes: {minute: '', minute_add: '', sub_off: '', sub_on: ''}
}

const objectFields = {
  match_Details,
  memberDetails
}

const listData = {
  selectedplayerData,
  squadPlayersData,
  squadOfficialsData,
  teamOfficialData,
  matchOfficialData
  // disciplineAction
}
/*
* loop through these fields to make objects by this id where defined
* console.log('test',Object.keys(test).map(item => test[item]))
* each item in myData that is array will loop through and create by object
* for fields with objects
*/
console.log({listFields, listData, objectFields, matchTeamStatsTeam, playerStatsByTeam})
const myJoinFields = [{field: 'member_id', object: 'member'}, {field: 'match_id', object: ''}]
// joinFields={myJoinFields}
ReactDOM.render(
  <App listFields={listFields} listData={listData} objectFields={objectFields} />,
  document.getElementById('root'))
registerServiceWorker()
