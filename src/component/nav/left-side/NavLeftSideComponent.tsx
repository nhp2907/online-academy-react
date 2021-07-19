import React from 'react'

import styles from '../nav.module.scss'
import CategoryList from "../../categories/CategoryList";
import {Link} from 'react-router-dom';
import useWindowDimensions from "../../../hook/userWindowDimensions";
import logo from '../../../assets/img/logo.svg'
import logoFull from '../../../assets/img/logo-full.svg'

interface Props {

}

const NavLeftSideComponent: React.FC<Props> = ({}) => {
    const {width} = useWindowDimensions();
    return (
        <div className={styles['left-side']}>
            <Link to={'/'}>
                <img
                    src={width > 1100 || width <= 650 ? logoFull : logo}
                    alt=""/>
            </Link>
            <CategoryList/>
        </div>
    );
}


export default NavLeftSideComponent;