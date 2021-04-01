import React, { Component } from "react";
import { connect } from 'react-redux';
import { createList } from '../actions';
import './styles/List.scss'

class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            icon: 'fas fa-wrench',
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    setIcon(event) {
        this.setState({
            icon: event.target.value
        });
    }

    onSubmit = () => {
        let {title, icon} = this.state
        this.props.createList(title, icon);
        this.setState({
            title: ''
        });
        this.props.toggle();
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="list-modal">
                <div className="list-modal-content">
                    <span className="close" onClick={this.handleClick}>&times;</span>
                    <hr className="hr" />
                    <div onChange={this.setIcon.bind(this)}>
                        <input type="radio" value="fas fa-school" name="icon"/><i className="fas fa-school"/>
                        <input type="radio" value="fas fa-briefcase" name="icon"/><i className="fas fa-briefcase"/>
                        <input type="radio" value="fas fa-building" name="icon"/><i className="fas fa-building"/>
                        <input type="radio" value="fas fa-tools" name="icon"/><i className="fas fa-tools"/>
                        <input type="radio" value="fas fa-wrench" name="icon"/><i className="fas fa-wrench"/>
                        <input type="radio" value="fas fa-car" name="icon"/><i className="fas fa-car"/>
                        <input type="radio" value="fas fa-biking" name="icon"/><i className="fas fa-biking"/>
                        <input type="radio" value="fas fa-heartbeat" name="icon"/><i className="fas fa-heartbeat"/>
                        <input type="radio" value="fas fa-book" name="icon"/><i className="fas fa-book"/>
                        <input type="radio" value="fas fa-coins" name="icon"/><i className="fas fa-coins"/>
                        <input type="radio" value="fas fa-desktop" name="icon"/><i className="fas fa-desktop"/>
                        <input type="radio" value="fab fa-d-and-d" name="icon"/><i className="fab fa-d-and-d"/>
                    </div>
                    <input
                    name="title"
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    required
                    />
                    <br/>
                    <button className="create" onClick={this.onSubmit}>Create</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { createList }
  )(CreateList);