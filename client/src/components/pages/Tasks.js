import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import { getData, createTask, updateTask, undoTask, deleteTask } from '../../actions';

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
            items: []
        };
    }
    
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = async () => {
        let { task } = this.state;
        await this.props.createTask(task)
        this.props.getData();
      };

    componentDidMount = async () => {
      await this.props.getData();
    }

    render() {
      let {data} = this.props
      let tasks = []
      if (data.length > 1) {
        tasks = data[this.props.match.params.id].tasks
      }
        return (
            <Container fluid style={{ 'marginTop': '5.5rem' }}>
                <Row className="justify-content-around">
                  <h2 className="header">
                      TO DO LIST
                  </h2>
                </Row>
                <Row className="justify-content-around">
                  <form onSubmit={this.onSubmit}>
                      <input
                      type="text"
                      name="task"
                      onChange={this.handleInputChange}
                      value={this.state.task}
                      required
                      placeholder="Create Task"
                      />
                      <button>Create Task</button>
                  </form>
                </Row>
                <Row>{this.state.items}</Row>
                {tasks ?
                tasks.map(item => (
                  <Container key={item._id} style={item.status ? {color: 'green'} : {color: 'orange'}} fluid>
                      <Row>
                        <div style={item.status ? {textDecorationLine: 'line-through'} : {wordWrap: 'break-word'}}>{item.task}</div>
                      </Row>
    
                      <Row>
                        <button
                        style={{ marginRight: 10, color: 'green'}}
                        onClick={() => this.props.updateTask(item._id)}
                        >
                        <i
                          className="fas fa-check"
                        />
                        Done
                        </button>
                        <button
                        style={{ marginRight: 10, color: 'orange'}}
                        onClick={() => this.props.undoTask(item._id)}
                        >
                        <i
                          className="fas fa-undo"
                        />
                        Undo
                        </button>
                        <button
                        style={{ marginRight: 10, color: 'orangered'}}
                        onClick={() => this.props.deleteTask(item._id)}
                        >
                        <i
                          className="fas fa-trash"
                        />
                        Delete
                        </button>
                      </Row>
                  </Container>
                )) : <div></div>
                }
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.data,
    }
}

export default connect(
  mapStateToProps,
  { getData, createTask, updateTask, undoTask, deleteTask }
)(Tasks);