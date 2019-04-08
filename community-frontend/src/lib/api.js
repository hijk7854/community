import axios from 'axios';
import queryString from 'query-string';

export const writePost = ({title, content, tags, name}) => axios.post('/api/posts', {title, content, tags, name});
export const getPost = (id) => axios.get(`/api/posts/${id}`);
export const getPostList = ({tag, page}) => axios.get(`/api/posts/?${queryString.stringify({tag, page})}`);
export const editPost = ({id, title, content, tags}) => axios.patch(`/api/posts/${id}`, {title, content, tags});
export const removePost = (id) => axios.delete(`/api/posts/${id}`);

export const joinMember = ({id, pwd, name}) => axios.post('/api/member/join', {id, pwd, name});
export const deleteMember = () => axios.get('/api/member/delete');

export const login = ({id, pwd}) => axios.post('/api/member/login', {id, pwd});
export const checkLogin = () => axios.get('/api/member/check');
export const logout = () => axios.post('/api/member/logout');