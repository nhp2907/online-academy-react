import React, {FormEvent, FormEventHandler, useState} from 'react'
import styles from "./nav.module.scss"
import NavRightSide from "./right-side/NavRightSide";
import NavLeftSideComponent from "./left-side/NavLeftSideComponent";
import {useHistory} from 'react-router'
import useWindowDimensions from "../../hook/userWindowDimensions";
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {RootState} from "../../redux/store";
import {useSelector} from 'react-redux';
import {User} from "../../model/User";

type Props = {
    user?: number;
}


const Nav: React.FC<Props> = ({}: Props) => {
    const {width} = useWindowDimensions();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const history = useHistory();
    const [searchKw, setSearchKw] = useState('');
    const handleFormSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault();
        if (searchKw) {
            history.push(`/course?kw=${searchKw}`)
        }
    }
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <React.Fragment>
            {
                width > 650 ?
                    <nav key={user?.id} className={styles.nav}>
                        <NavLeftSideComponent/>
                        <div className={styles.center}>
                            <i className="fas fa-search"></i>
                            <form onSubmit={handleFormSubmit}>
                                <input type="text" value={searchKw} onChange={e => setSearchKw(e.target.value)} autoFocus={true}
                                       placeholder="Search for anything"/>
                            </form>
                        </div>
                        <NavRightSide/>
                    </nav> :
                    <nav className={styles.nav}>
                        <div className={styles.toggleSidebar}>
                            <Button icon={'pi pi-bars'}
                                    style={{backgroundColor: 'transparent', border: 'none', outline: 'none'}}
                                    onClick={() => setSidebarVisible(true)}/>
                            <NavLeftSideComponent/>
                        </div>
                    </nav>
            }

            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                content
            </Sidebar>
        </React.Fragment>
    )
}
export default Nav;