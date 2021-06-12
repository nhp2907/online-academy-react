import React from 'react'

import styles from '../nav.module.scss'
import CategoryList from "../../categories/CategoryList";

interface Props {

}

const NavLeftSideComponent: React.FC<Props> = ({}) => {
    return (
        <div className={styles['left-side']}>
            <a href="/"><img
                src="https://assets.data.world/assets/logo-horiz-white.4ce1e77312620581d5a1c421c845b488.svg"
                alt=""/>
            </a>
            <CategoryList/>
        </div>
    );
}


export default NavLeftSideComponent;