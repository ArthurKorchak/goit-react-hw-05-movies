import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header() {
    
    return (
        <>
            <NavLink className={styles.link} to={'/'} >Home</NavLink>
            <NavLink className={styles.link} to={'/movies'} >Movies</NavLink>
        </>
    );
};