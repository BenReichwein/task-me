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
// creating task
export const createTask = (task) => async (dispatch) => {
    api.post('task', {
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
export const updateTask = (id) => (dispatch) => {
  api.put(`task/${id}`)
  .then((res) => {
    console.log(res)
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// undo task
export const undoTask = (id) => (dispatch) => {
  api.put(`undoTask/${id}`)
  .then((res) => {
    console.log(res)
    dispatch(getData())
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// delete task
export const deleteTask = (id) => (dispatch) => {
  api.delete(`deleteTask/${id}`)
  .then((res) => {
    console.log(res)
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