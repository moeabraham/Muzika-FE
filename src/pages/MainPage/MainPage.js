
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom'
import "./MainPage.css";
// import Background from "../../components/Background/Background.js";
// import music from '/images/music';


const MainPage = (props) => {

    return (
        <>
        <Header user={props.userState.user}  />
        <div className="container">
            <h1>heheheh</h1>
    </div>
        </>
    )
}


export default MainPage


