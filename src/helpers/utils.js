const calcAge = (dateYYYYMMDD) => {
  /* dateYYYYMMDD - YYYY-MM-DD */
  const birthday = new Date(dateYYYYMMDD)
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const selectedPlayerDetails = (data) => data.reduce((obj, item) => {
  return {
    ...obj,
    [item.member.member_id]: ({
      playerNumber: item.player_number,
      isCaptain: item.is_captain,
      isStarting: item.is_starting})
  }
}, {})

export const memberDetailObject = (item, selectedPlayerDetails) => {
  return {
    name: `${item.member.first_name} ${item.member.last_name}`,
    age: calcAge(item.member.dob),
    dob: item.member.dob,
    nationality: item.member.nationality,
    id: item.member.member_id,
    position: item.position !== undefined ? item.position : '',
    playerNumber: selectedPlayerDetails[item.member.member_id] !== undefined ? selectedPlayerDetails[item.member.member_id].playerNumber : 0,
    isStarting: selectedPlayerDetails[item.member.member_id] !== undefined ? selectedPlayerDetails[item.member.member_id].isStarting : false,
    isCaptain: selectedPlayerDetails[item.member.member_id] !== undefined ? selectedPlayerDetails[item.member.member_id].isCaptain : false,
    roleID: 0,
    item: item
  }
}
// })

export const getMemberDetails = (data, memberType, getSelectedPlayerDetails) => {
  return data.map(item => item.members_response_data[memberType].reduce((obj, item) => {
    return {
      ...obj,
      [item.member.member_id]: memberDetailObject(item, getSelectedPlayerDetails)
    }
  }, {}))
}
