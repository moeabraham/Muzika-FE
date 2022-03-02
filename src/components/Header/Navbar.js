import React,{useState} from 'react'
import {login, logout} from '../../services/firebase';

import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import "./Navbar.css"
import "./SidebarData.js"
import { SidebarData } from './SidebarData.js';
import { IconContext } from 'react-icons'



function Navbar(props) {

    const[sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        // console.log(sidebar)
        setSidebar(!sidebar)}


  return (

    <>
        <IconContext.Provider value={{color: "#fff"}}>

    <div className="navbar">
    <Link to="#"  className="menu-bars">
           <FaIcons.FaBars onClick={showSidebar} />
        
        </Link>
        <Link to="#"  className="menu-bars-display">
           {/* <FaIcons.FaBars onClick={showSidebar} /> */}
           {/* <li>Welcome, {props.user.displayName}</li> */}
           {props.user ?
            <><li className="txt-display">Welcome, {props.user.displayName}</li><li>
                              <img className="img-display"
                                  // style={{height: '2.6rem',width:'2.6rem', borderRadius:'50%'}}
                                  src={props.user.photoURL}
                                  alt={props.user.displayName} />
                          </li><li className="txt-display log-display"
                              // className={}
                              onClick={logout}>
                                  Logout
                              </li></>
        
        :  <li 
        // className={}
        onClick={login}>
        Login
    </li>
        
        }
         
        </Link>

        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineCloseSquare />

              </Link>
            </li>
            <ul>
                {
                    props.user ?
                    <>
                    {/* {console.log(props.user.photoURL)} */}
                    <li>Welcome, {props.user.displayName}</li>
                    <li>
                        <img 
                            // style={{height: '2.6rem',width:'2.6rem', borderRadius:'50%'}}
                            src={props.user.photoURL}
                            alt={props.user.displayName}
                        />
                    </li>
                    <li 
                        // className={}
                        onClick={logout}>
                        Logout
                    </li>
                    </>
                    :
                    <li 
                    // className={}
                    onClick={login}>
                    Login
                </li>
                }
                 </ul> 

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to="#">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>


    
        </IconContext.Provider>

    
    </>
    


    
  )
}

export default Navbar