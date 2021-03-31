import history from '../history'
import api from './api'
import {
  DATA,
} from './types';
//
//-> Tasks
//
// gets all data from database
export const getData = () => async (dispatch) => {
  const response = await api.get('data')

  dispatch({ type: DATA, payload: response.data});
};
// creating list
export const createList = (list) => async (dispatch) => {
  api.post('list', {
    list
  })
  .then(async (res) => {
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// creating task
export const createTask = (task, list) => async (dispatch) => {
    api.post('task', {
      list,
      task
    })
    .then(async (res) => {
      dispatch({ type: DATA, payload: res.data});
    })
    .catch(err => {
      alert(err.response.data)
    })
};
// update task
export const updateTask = (list, task) => (dispatch) => {
  api.put(`task/${list}/${task}`)
  .then((res) => {
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// undo task
export const undoTask = (list, task) => (dispatch) => {
  api.put(`undoTask/${list}/${task}`)
  .then((res) => {
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// delete task
export const deleteTask = (list, task) => (dispatch) => {
  api.delete(`deleteTask/${list}/${task}`)
  .then((res) => {
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
//
//-> Authentications
//
// making an account
export const register = (formValues) => () => {
  api.post('user/register', {
    username: formValues.username.toLowerCase(),
    password: formValues.password
  })
  .then(res => {
    alert(res.data)
    history.push('/login')
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// logging into existing account
export const login = (formValues) => () => {
  api.post('user/login', {
    username: formValues.username.toLowerCase(),
    password: formValues.password
  })
  .then(res => {
    history.push('/')
  })
  .catch(err => {
    alert(err.response.data)
  })
};