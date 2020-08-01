import React, { Component } from 'react'
import "./ProductDrop.css";
export default class Hamber extends Component {
    render() {
        return (
            <div className="pd-outer">
                <div className="pd-headers">
                    <div className= "pd-ph1">
                    <h1 >Economic Databases</h1>
                    <hr className="pd-lh1" />
                    </div>
                    <div className= "pd-ph2">
                    <h1>Financial Databases</h1>
                    <hr className="pd-lh2" />
                    </div>
                     <div className= "pd-ph3">
                    <h1>Other Databases</h1>
                    <hr className="pd-lh3" />
                    </div>
                </div>
                <div className="pd-subouter">
                    <div className="pd-EDB">
                        <div className="pd-subp1"  >
                        <a href="/AI-Economics"   > AI Economics </a>
                        <a href="/AI-Demographics" > AI Demographics </a>
                        
                        </div>
                        <div className="pd-subp2">
                        <a href="/AI-Health-Economics" > AI Health Economics </a>
                        <a href="/AI-TradeAnalytics" > AI Trade Analytics </a>
                        {/* <a href="/Energy-Economics" > Energy EconomicsDB </a> */}
                    </div>
                    </div>
                    <div className="pd-FDB">
                        <div className="pd-Others1">
                            <a href="/AI-Companies" > AI Companies </a>
                            {/* <a href="/AI-Ratings" >  </a> */}
                            {/* <a href="/AI-Ratings" ></a> */}
                            <a href="/AI-StartupDB" > AI StartupDB </a>
                        </div>
                        <div className="pd-Others2">
                            <a href="/AI-Supply-Chain" > AI Supply Chain </a>
                            <a href="/AI-Industrial-Research" > AI Industrial Research </a>
                        </div>
                    </div>
                    <div className="pd-ODB">
                        <a href="/AI-Legal-DataBases" > AI Legal DataBases </a>
                        <a href="/AI-Election-Tracker" > AI Election Tracker </a>
                        </div>
                    </div>
                    
                </div>
                
            
            
        )
    }
}
