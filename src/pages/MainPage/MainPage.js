
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom'
import "./MainPage.css";
// import Background from "../../components/Background/Background.js";
// import music from '/images/music';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';


const MainPage = (props) => {

    return (
        <>
        <Header user={props.userState.user}  />
        <div className="container ">
            <div className="title">
            <h1 className="font-link">Welcome to your Music Library </h1>
            <h2 className="font-link">Create a new Track </h2>

            </div>
        <div className="page-content">
        <Card className="rounded"style={{ width: '18rem' }}>
            <Card.Img variant="top" src={require("./kid.png").default} />
             <Card.Body>
                <Card.Title>Add a new Track ?</Card.Title>
                <Card.Text>
                Simply go to the form to add new tracks data to your library
    </Card.Text>
    <Link className= "btn btn-default btn-light" to='/formpage'> Add 🎶 🎸</Link>
    {/* <Link className= "btn btn-default btn-light" to='/details'> details 🎶 🎸</Link> */}

  </Card.Body>
</Card>

            </div>





    </div>
        </>
    )
}


export default MainPage


