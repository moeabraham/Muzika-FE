// define a function component
import {login, logout} from '../../services/firebase';
import styles from './Header.module.css'

function Header(props){
    return(
    <header className={styles.header}>
        <h1>{'🎹'} React Muzik</h1>
        <nav>
            <ul>
                {
                    props.user ?
                    <>
                    <li>Welcome, {props.user.displayName}</li>
                    <li>
                        <img 
                            style={{height: '2.6rem',width:'2.6rem', borderRadius:'50%'}}
                            src={props.user.photoURL}
                            alt={props.user.displayName}
                        />
                    </li>
                    <li 
                        className={styles.navLink}
                        onClick={logout}>
                        Logout
                    </li>
                    </>
                    :
                    <li 
                    className={styles.navLink}
                    onClick={login}>
                    Login
                </li>
                }
             
                    
              
                
            </ul> 
        </nav>
    </header>
    );
}

export default Header;