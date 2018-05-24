export const LOAD_SERVER_PROPS = 'config/LOAD_SERVER_PROPS';
export const SET_PANEL_ROLE = 'config/SET_PANEL_ROLE';
export const SET_PANEL_FIELD = 'config/SET_PANEL_FIELD';

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