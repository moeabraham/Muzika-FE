
import Header from '../../components/Header/Header';

const MainPage = (props) => {

    return (
        <>
        <Header user={props.userState.user} />
        
        <h1>Main Page </h1>
        
        </>
    )
}


export default MainPage