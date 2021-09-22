// define a function component
import styles from './Header.module.css'

function Header(props){
    return(
    <header className={styles.header}>
        <h1>{'⚛️'} React Muzik</h1>
        <nav>
            <ul>
                <li>Welcome, User</li>
                <li>IMG</li>
                <li className={styles.navLink}>Logout</li>
                <li className={styles.navLink}>Login</li>
                
            </ul> 
        </nav>
    </header>
    );
}

export default Header;