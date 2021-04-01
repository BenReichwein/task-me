import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { connect } from 'react-redux';
import { getData } from '../actions';
import CreateList from './CreateList'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false,
            seen: false
        };
    }

    toggleShare = () => {
        this.setState({seen: !this.state.seen})
    }

    componentDidMount = async () => {
        await this.props.getData();
    }
    render() {
        let {data} = this.props
        return (
            <React.Fragment>
                {this.state.seen? <CreateList toggle={this.toggleShare}/> : null}
                <SideNav
                style={{background: '#4E4C5B'}}
                expanded={this.state.expand}
                onSelect={(selected) => {
                    if (selected === "new") {
                        this.props.history.push('/')
                        this.setState({
                            expand: false,
                            seen: true
                        })
                    } else {
                        const to = '/list/' + selected;
                        this.props.history.push(to);
                        this.setState({expand: false})
                    }
                }}
                onToggle={(expanded) => this.setState({expand: expanded})}
                >
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="">
                        {data ?
                        data.map((item, index) => (
                            <NavItem eventKey={index}>
                                <NavIcon>
                                    <i className={item.icon} style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    {item.list}
                                </NavText>
                            </NavItem>
                        )) :
                        <NavItem eventKey="">
                            <NavIcon>
                            0
                            </NavIcon>
                            <NavText>
                            No Lists
                            </NavText>
                        </NavItem>
                        }
                        <NavItem eventKey="new">
                            <NavIcon>
                                <i className="fa fa-plus-square" style={{ fontSize: '1.75em', padding: '10px 10px 10px 10px', borderRadius:'10px', backgroundColor: 'orange' }} />
                            </NavIcon>
                            <NavText>
                                <h3 style={{marginTop: '50px'}}>
                                    CREATE
                                </h3>
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
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
  { getData }
)(Header);