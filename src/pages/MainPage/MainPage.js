
import Header from '../../components/Header/Header';
import {Link} from 'react-router-dom'

const MainPage = (props) => {

    return (
        <>
        <Header user={props.userState.user} />
        <Link className= "btn btn-default" to='/formpage'> Home</Link>

        <h1>Main Page </h1>
        
        </>
    )
}


export default MainPage