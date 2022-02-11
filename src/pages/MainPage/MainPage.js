
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom'
import "./MainPage.css";
// import Background from "../../components/Background/Background.js";
// import music from '/images/music';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import dogs from './dogs.png'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FaBeer } from "react-icons/fa";
import {IconContext} from "react-icons";

const MainPage = (props) => {

    return (
        <>
        <Header user={props.userState.user}  />
        <div className="container ">
            <div className="title">
            <h1 className="font-link">Welcome to your Music Library </h1>
            <h2 className="font-link">Create a new Tracks </h2>

            </div>
            
  
       




    </div>
    <div className="page-content">
        <Card border="secondary" style={{ width: '18rem' }} >
            {/* <IconContext.Provider value={{ className="myReact-icons"}}>
      <FaBeer />
    </IconContext.Provider> */}

        <Button> <Link  class="link"to='/formpage'> Add new Tracks</Link></Button>
  </Card>
              </div>
 
        </>
    )
}


export default MainPage


