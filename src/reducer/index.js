
export const ACTION_TYPES = {
  SET_USERS: 'SET_USERS',
  SET_EVENTS: 'SET_EVENTS',
  SET_LOGGED_IN_USER: 'SET_LOGGED_IN_USER',
  SET_NEW_USER: 'SET_NEW_USER',
  SET_NEW_EVENT: 'SET_NEW_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT'
}

const intialState = { users: [], loggedInUser: {}, events: [] }

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: action.payload.users
      }
    case ACTION_TYPES.SET_EVENTS:
      return {
        ...state,
        events: action.payload.events
      }
    case ACTION_TYPES.SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload.loggedInUser
      }
    case ACTION_TYPES.SET_NEW_USER:
      const newUser = action.payload.newUser
      return {
        ...state,
        users: [
          ...state.users,
          newUser
        ]
      }
    case ACTION_TYPES.SET_NEW_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.userEmail]: {
            userEvents: state.events[action.payload.userEmail]?.userEvents ? [
              ...state.events[action.payload.userEmail]?.userEvents,
              action.payload.event
            ] : [
              action.payload.event
            ]
          }
        }
      }
    case ACTION_TYPES.DELETE_EVENT:
      let updateddEvents = state.events[action.payload.userEmail].userEvents;
      updateddEvents.splice(action.payload.eventIndex, 1);
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.userEmail]: {
            userEvents: updateddEvents
          }
        }
      }
    case ACTION_TYPES.UPDATE_EVENT:
      let updateddUserEvents = state.events[action.payload.userEmail]?.userEvents;
      updateddUserEvents[action.payload.eventIndex] = action.payload.event
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.userEmail]: {
            userEvents: updateddUserEvents
          }
        }
      }
    default:
      return state
  }
}

export default reducer