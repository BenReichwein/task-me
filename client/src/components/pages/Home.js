import React, { Component } from 'react'
import avatar from '../assets/home.svg'
import '../styles/Home.scss'

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="img">
                    <img src={avatar} alt="Avatar" className="avatar"/>
                </div>
                <h1 className='title'>Complete those tasks and stay organized with <b style={{color: "#9489F0"}}>TaskMe</b></h1>
            </div>
        )
    }
}
