import { ACTION_TYPES } from "../reducer"

export const setUsers = (users) => {
  return {
    type: ACTION_TYPES.SET_USERS,
    payload: { users }
  }
}

export const setEvents = (events) => {
  return {
    type: ACTION_TYPES.SET_EVENTS,
    payload: { events }
  }
}

export const setLoggedInUser = (user) => {
  return {
    type: ACTION_TYPES.SET_LOGGED_IN_USER,
    payload: { loggedInUser: user }
  }
}

export const setNewUser = (user) => {
  return {
    type: ACTION_TYPES.SET_NEW_USER,
    payload: { newUser: user }
  }
}

export const setNewEvent = (userEmail, event) => {
  return {
    type: ACTION_TYPES.SET_NEW_EVENT,
    payload: { userEmail, event }
  }
}

export const deleteEvent = (userEmail, eventIndex) => {
  return {
    type: ACTION_TYPES.DELETE_EVENT,
    payload: { userEmail, eventIndex }
  }
}

export const updateEvent = (userEmail, eventIndex, event) => {
  return {
    type: ACTION_TYPES.UPDATE_EVENT,
    payload: { userEmail, eventIndex, event }
  }
}