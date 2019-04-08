import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const CHANGE_INPUT = 'join/CHANGE_INPUT';
const JOIN_MEMBER = 'join/JOIN_MEMBER';

// action creators
export const changeInput = createAction(CHANGE_INPUT);
export const joinMember = createAction(JOIN_MEMBER, api.joinMember);

// initial state
const initialState = Map({
  id: '',
  pwd: '',
  name: '',
  memberId: null,
  joined: false
});

// reducer
export default handleActions({
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  ...pender({
    type: JOIN_MEMBER,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data;
      return state.set('memberId', _id).set('joined', true);
    },
    onError: (state, action) => {
      return state.set('joined', false);
    }
  })
}, initialState)