import { combineReducers } from 'redux'
import { comment } from './CommentReducer.js';
import { post } from './PostReducer.js'

export default combineReducers({
    comment,
    post,
})