import React, { Component } from 'react'
import "./navbar.css"
import ProdDrop from "./ProdDrop"
import { useState, useEffect } from 'react';


export default function Navbaar2() {

  const [navbarColor, setNavbarColor] = useState('black')
  const [toggled, toggle] = useState(false)
  const [togged, tog] = useState(false)
  useEffect(() => {

  const update = (x) => {
    
    window.getComputedStyle(document.documentElement).getPropertyValue("--color1");
    document.documentElement.style.setProperty("--color1", x);
  }
  
  const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 580||
        document.body.scrollTop > 580
      ) {
        setNavbarColor("black")
        update("black")
      } else if (
        (50 < document.documentElement.scrollTop < 580) ||
        (50 < document.body.scrollTop < 580)
      ){
        setNavbarColor("black")
        update("black")
      }     
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  


        return (
          <>
          <div className="outer-main">
            <div className="mainav">
                    <h1 className=" header1" ><a className="navanc" href="/">AI DATABASES</a></h1>
                <div className="sub-na">
                    <div className= "left">
                        <div  id="1" onClick={() => tog(togged => !togged)}>
                            <a className="navanc" href="#" >Products</a>
                        </div>
                        <div id="2">
                            <a className="navanc" href="/Services">Services</a>
                        </div>
                        <div id="3">
                            <a className="navanc"  href="/Others">Others</a>
                        </div>
                    </div>
                    <div className="space">
                    </div>
                    <div className= "right" >
                    <div className= "right" id="4">
                            <a className="navanc" href="/About">About</a>
                        </div>
                        <div className= "right" id="5">
                            <a className="navanc" href="/Login">Login</a>
                        </div>
                        <div className= "right"id="6">
                            <a className="navanc" href="/Login">Register</a>
                        </div>
                    </div>
                </div>
                </div>
                {/* <div className="hambrger" onClick={() => toggle(toggled => !toggled)}>
            <HamburgerButton /> */}
            </div>
            {/* {toggled && <div className = "ham-button"><Hamber/></div>} */}
            {/* </div> */}
             {togged && <div className = "prod-hover"><ProdDrop/></div>}
            </>
        )
    
}
