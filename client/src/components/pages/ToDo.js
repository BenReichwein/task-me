import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Header, Form, Input, Icon, Button } from "semantic-ui-react";
import { getTasks, createTask } from '../../actions';

class ToDo extends Component {
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
        this.getTask();
      };

    componentDidMount = async () => {
        this.getTask();
    }

    getTask = async () => {
        await this.props.getTasks();
        if (this.props.task) {
            this.setState({
              items: this.props.task.map((item) => {
                let color = "yellow";
                let style = {
                  wordWrap: "break-word",
                };
    
                if (item.status) {
                  color = "green";
                  style["textDecorationLine"] = "line-through";
                }
    
                return (
                  <Card key={item._id} color={color} fluid>
                    <Card.Content>
                      <Card.Header textAlign="left">
                        <div style={style}>{item.task}</div>
                      </Card.Header>
    
                      <Card.Meta textAlign="right">
                        <Icon
                          name="check circle"
                          color="green"
                          onClick={() => this.updateTask(item._id)}
                        />
                        <span style={{ paddingRight: 10 }}>Done</span>
                        <Icon
                          name="undo"
                          color="yellow"
                          onClick={() => this.undoTask(item._id)}
                        />
                        <span style={{ paddingRight: 10 }}>Undo</span>
                        <Icon
                          name="delete"
                          color="red"
                          onClick={() => this.deleteTask(item._id)}
                        />
                        <span style={{ paddingRight: 10 }}>Delete</span>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                );
              }),
            });
        }
    };

    render() {
        return (
            <div>
                <div className="row">
                <Header className="header" as="h2">
                    TO DO LIST
                </Header>
                </div>
                <div className="row">
                <Form onSubmit={this.onSubmit}>
                    <Input
                    type="text"
                    name="task"
                    onChange={this.handleInputChange}
                    value={this.state.task}
                    required
                    fluid
                    placeholder="Create Task"
                    />
                    <Button>Create Task</Button>
                </Form>
                </div>
                <div className="row">
                <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        task: state.task,
    }
}

export default connect(
  mapStateToProps,
  { getTasks, createTask }
)(ToDo);