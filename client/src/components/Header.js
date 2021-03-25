import React, { useState } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Header(props) {
    const [expanded, setExpanded] = useState(false)
    return (
        <React.Fragment>
            <SideNav
            style={{background: 'linear-gradient(90deg, rgb(255, 127, 60) 0%, rgb(255, 128, 0) 100%)'}}
            expanded={expanded}
            onSelect={(selected) => {
                const to = '/' + selected;
                props.history.push(to);
                setExpanded(false)
            }}
            onToggle={(expanded) => setExpanded(expanded)}
            >
                <SideNav.Toggle/>
                <SideNav.Nav defaultSelected="">
                <NavItem eventKey="landing">
                    <NavIcon>
                        <i className="fa fa-bolt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Boost
                    </NavText>
                </NavItem>
                <NavItem eventKey="">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="saved">
                    <NavIcon>
                        <i className="fa fa-bookmark" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Saved
                    </NavText>
                </NavItem>
                <NavItem eventKey="following">
                    <NavIcon>
                        <i className="fa fa-user-plus" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Following
                    </NavText>
                </NavItem>
                </SideNav.Nav>
            </SideNav>
        </React.Fragment>
    )
}