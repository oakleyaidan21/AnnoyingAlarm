export default function reducer(state = { alarms: [] }, action) {
  switch (action.type) {
    case "GET_ALARMS":
      return { ...state, loading: true };
    case "GET_ALARMS_SUCCESS":
      return { ...state, loading: false, alarms: action.data };
    case "GET_REPOS_FAIL":
      return {
        ...state,
        loading: false,
        error: "Error while fetching alarms"
      };
    default:
      return state;
  }
}

export function listAlarms() {
  return {
    type: "GET_ALARMS",
    data: {}
  };
}
