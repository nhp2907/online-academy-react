import React from 'react'

import styles from '../nav.module.scss'
import CategoryList from "../../categories/CategoryList";
import {Link} from 'react-router-dom';

interface Props {

}

const NavLeftSideComponent: React.FC<Props> = ({}) => {
    return (
        <div className={styles['left-side']}>
            <Link to={'/'}>
                <img
                    src="https://assets.data.world/assets/logo-horiz-white.4ce1e77312620581d5a1c421c845b488.svg"
                    alt=""/>
            </Link>
            <CategoryList/>
        </div>
    );
}


export default NavLeftSideComponent;