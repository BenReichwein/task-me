import React, { Component } from "react";
import { connect } from 'react-redux';
import { createList } from '../actions';

class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    onSubmit = () => {
        let {title} = this.state
        this.props.createList(title);
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
            <div className="share-modal" style={{marginLeft: "100px"}}>
                <div className="share-modal-content">
                    <span className="close" onClick={this.handleClick}>&times;</span>
                    <hr className="hr" />
                    <input
                    name="title"
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    required
                    />
                    <br/>
                    <button className="publish" onClick={this.onSubmit}>Create</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { createList }
  )(CreateList);