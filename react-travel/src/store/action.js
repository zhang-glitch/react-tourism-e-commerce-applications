import ActiveTypes from './actionTypes'


export function user(data) {
  return {
    type: ActiveTypes.USER_INFORMATION,
    data
  }
}