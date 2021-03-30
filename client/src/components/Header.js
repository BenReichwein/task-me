import React, { Component } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { connect } from 'react-redux';
import { getData } from '../actions';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expand: false
        };
    }

    componentDidMount = async () => {
        await this.props.getData();
    }
    render() {
        let {data} = this.props
        return (
            <React.Fragment>
                <SideNav
                style={{background: 'linear-gradient(90deg, rgb(255, 127, 60) 0%, rgb(255, 128, 0) 100%)'}}
                expanded={this.state.expand}
                onSelect={(selected) => {
                    const to = '/list/' + selected;
                    this.props.history.push(to);
                    this.setState({expand: false})
                }}
                onToggle={(expanded) => this.setState({expand: expanded})}
                >
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="">
                        {data ?
                        data.map((item, index) => (
                            <NavItem eventKey={index}>
                                <NavIcon>
                                    <i className="fa fa-bolt" style={{ fontSize: '1.75em' }} />
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