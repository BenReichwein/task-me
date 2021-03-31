import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import { getData, createTask, updateTask, undoTask, deleteTask, deleteList } from '../../actions';
import '../styles/Tasks.scss'

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
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
        await this.props.createTask(task, this.props.data[this.props.match.params.id].list)
        this.props.getData();
      };

    componentDidMount = async () => {
      await this.props.getData();
    }

    render() {
      let {data} = this.props
      let tasks, list;
      if (data.length > this.props.match.params.id) {
        tasks = data[this.props.match.params.id].tasks
        list = data[this.props.match.params.id].list
      }
        return (
            <Container fluid style={{ 'marginTop': '1.2rem' }}>
                <Row className="justify-content-around" style={{marginBottom: '1.5rem'}}>
                  <h2 className="header">
                      {list}
                  </h2>
                  <button
                  className="listDelete"
                  onClick={() => this.props.deleteList(this.props.match.params.id)}
                  >
                  <i
                    className="fas fa-trash"
                  />
                  </button>
                </Row>
                {tasks ?
                tasks.map((item, index) => (
                  <Container key={item._id} style={item.status ? {color: 'green'} : {color: '#F0F8FF'}} fluid>
                      <Row>
                        <div style={item.status ? {textDecorationLine: 'line-through', marginBottom: "0.5rem"} : {wordWrap: 'break-word', marginBottom: "0.5rem"}}>
                          <label><span className="circle" style={{background: "#66F6FF"}}></span>{item.task}</label>
                          <button
                          className="edits"
                          style={{ color: 'green'}}
                          onClick={() => this.props.updateTask(item.list, index)}
                          >
                          <i
                            className="fas fa-check"
                          />
                          </button>
                          <button
                          className="edits"
                          style={{ color: 'orange'}}
                          onClick={() => this.props.undoTask(item.list, index)}
                          >
                          <i
                            className="fas fa-undo"
                          />
                          </button>
                          <button
                          className="edits"
                          style={{ color: 'orangered'}}
                          onClick={() => this.props.deleteTask(item.list, index)}
                          >
                          <i
                            className="fas fa-trash"
                          />
                          </button>
                        </div>
                      </Row>
                  </Container>
                )) : <div></div>
                }
                <Row className="justify-content-around">
                  <form onSubmit={this.onSubmit}>
                    <span className="circle" style={{background: "#FF94E1"}}></span>
                      <input
                      type="text"
                      name="task"
                      onChange={this.handleInputChange}
                      value={this.state.task}
                      required
                      placeholder="Create Task"
                      />
                      <button
                      className="edits"
                      style={{ color: 'green'}}
                      >
                      <i
                        className="fas fa-check"
                      />
                      </button>
                  </form>
                </Row>
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
  { getData, createTask, updateTask, undoTask, deleteTask, deleteList }
)(Tasks);