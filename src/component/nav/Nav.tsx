import React from 'react'
import styles from "./nav.module.scss"
import NavRightSide from "./right-side/NavRightSide";

type Props = {
    user?: number;
}


const Nav: React.FC<Props> = ({user}: Props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.leftSide}>
                <a href="/"><img
                    src="https://assets.data.world/assets/logo-horiz-white.4ce1e77312620581d5a1c421c845b488.svg"
                    alt=""/>
                </a>
            </div>
            <div className={styles.center}>
                <i className="fas fa-search"></i>
                <form action="">
                    <input type="text" placeholder="Search for anything"/>
                </form>
            </div>
            <NavRightSide/>
        </nav>
    )
}
export default Nav;