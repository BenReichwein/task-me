// import history from '../history'
import api from './api'
import {
    TASK,
} from './types';
//
//-> Tasks
//
// gets all tasks
export const getTasks = () => async (dispatch) => {
  const response = await api.get('task')

  dispatch({ type: TASK, payload: response.data});
};
// creating task
export const createTask = (task) => async (dispatch) => {
    api.post('task', {
      task
    })
    .then(async (res) => {
      dispatch({ type: TASK, payload: res.data});
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
    dispatch(getTasks())
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
    dispatch(getTasks())
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
    dispatch(getTasks())
  })
  .catch(err => {
    alert(err.response.data)
  })
};