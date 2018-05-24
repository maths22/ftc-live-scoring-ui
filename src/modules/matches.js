export const SET_MATCH_LIST = 'matches/SET_MATCH_LIST';
export const SET_CURRENT_MATCH = 'matches/SET_CURRENT_MATCH';
export const SET_MATCH_PROP = 'config/SET_MATCH_PROP';
export const SET_MATCH_SCORE_PROP = 'config/SET_MATCH_SCORE_PROP';

const initialState = {
  serverProps: null,
  panelRole: null,
  panelField: null,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SERVER_PROPS:
      return {
        ...state,
        serverProps: action.data
      };

    case SET_PANEL_ROLE:
      return {
        ...state,
        role: action.data
      };

    case SET_PANEL_FIELD:
      return {
        ...state,
        field: action.data
      };

    default:
      return state;
  }
}

export const loadProps = (props) => {
  return dispatch => {
    dispatch({
      type: LOAD_SERVER_PROPS,
      data: props
    });
  }
};

export const setPanelRole = (role) => {
  return dispatch => {
    dispatch({
      type: SET_PANEL_ROLE,
      data: role
    });
  }
};

export const setPanelField = (field) => {
  return dispatch => {
    dispatch({
      type: SET_PANEL_FIELD,
      data: field
    });
  }
};