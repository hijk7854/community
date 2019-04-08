import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const INITIALIZE = 'input/INTIALIZE';
const CHANGE_INPUT = 'input/CHANGE_INPUT';
const WRITE_POST = 'input/WRITE_POST';
const GET_POST = 'input/GET_POST';
const EDIT_POST = 'input/EDIT_POST';

// action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);
export const getPost = createAction(GET_POST, api.getPost);
export const editPost = createAction(EDIT_POST, api.editPost);
 
// initial state
const initialState = Map({
  title: '',
  tags: '',
  content: '',
  name: '',
  postId: null,
});

// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.set(name, value);
  },
  ...pender({
    type: WRITE_POST,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data;
      return state.set('postId', _id);
    }
  }),
  ...pender({
    type: GET_POST,
    onSuccess: (state, action) => {
      const { title, tags, content } = action.payload.data;
      return state.set('title', title)
                  .set('content', content)
                  .set('tags', tags.join(', ')); // 배열 => , 로 구분된 문자열
    }
  })
}, initialState)