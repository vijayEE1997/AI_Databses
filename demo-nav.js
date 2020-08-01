import React, { Component } from 'react'
// import "./secNav.css"
import "./demo-nav.css"
export default class DemoNav extends Component {
    render() {
        return (
            <div className= "demonav-outer">
                {/* <h1 class="econav-header" > */}
                    <a className="demonav-header" href="/AI-Demographics">AI Demographics</a>
                    {/* </h1> */}
                <div className="secnav-sub-na">
                <div className="space">

                </div>
                <div className="demo-right">
                <a href="/About-Demographics" >About AI Demographics</a>
                </div>
                </div>
            </div>
        )
    }
}
