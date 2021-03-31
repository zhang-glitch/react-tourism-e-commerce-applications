import ActiveTypes from './actionTypes'


export function user(data) {
  return {
    type: ActiveTypes.USER_INFORMATION,
    data
  }
}

export function searchData(data) {
  return {
    type: ActiveTypes.SEARCH_DATE,
    data
  }
}