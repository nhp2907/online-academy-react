import React, {FormEvent, FormEventHandler, useState} from 'react'
import styles from "./nav.module.scss"
import NavRightSide from "./right-side/NavRightSide";
import NavLeftSideComponent from "./left-side/NavLeftSideComponent";
import {useHistory} from 'react-router'

type Props = {
    user?: number;
}


const Nav: React.FC<Props> = ({user}: Props) => {
    const history = useHistory();
    const [searchKw, setSearchKw] = useState('');
    const handleFormSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault();
        if (searchKw) {
            history.push(`/course?kw=${searchKw}`)
        }

    }
    return (
        <nav className={styles.nav}>
            <NavLeftSideComponent/>
            <div className={styles.center}>
                <i className="fas fa-search"></i>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" value={searchKw} onChange={e => setSearchKw(e.target.value)}
                           placeholder="Search for anything"/>
                </form>
            </div>
            <NavRightSide/>
        </nav>
    )
}
export default Nav;