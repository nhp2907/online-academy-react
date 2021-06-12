import React from 'react'
import styles from "./nav.module.scss"
import NavRightSide from "./right-side/NavRightSide";
import NavLeftSideComponent from "./left-side/NavLeftSideComponent";

type Props = {
    user?: number;
}


const Nav: React.FC<Props> = ({user}: Props) => {
    return (
        <nav className={styles.nav}>
            <NavLeftSideComponent />
            <div className={styles.center}>
                <i className="fas fa-search"></i>
                <form action="">
                    <input type="text" placeholder="Search for anything"/>
                </form>
            </div>
            <NavRightSide />
        </nav>
    )
}
export default Nav;