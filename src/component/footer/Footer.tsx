import React from 'react'
import logoFull from "../../assets/img/logo-full.svg";
import styles from './footer.module.scss'

interface Props {

}

const Footer: React.FC<Props> = ({}) => {
    return (
        <div className={styles.footer}>
            <div className={styles.notice}>
                <div className="udlite-heading-lg ufb-notice--notice--12AAi">
                    <span>Top companies choose <strong>Online Academy</strong> to build in-demand career skills.</span>
                </div>
                <div className="ufb-notice--partner-logos--3HzrN">
                    <img alt="Apple" height="44" width="44" src="https://s.udemycdn.com/partner-logos/v4/apple-light.svg"/>
                    <img alt="Box" height="44" width="67" src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"/>
                    <img alt="Volkswagen" height="44" width="44" src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"/>
                    <img alt="Netflix" height="44" width="101" src="https://s.udemycdn.com/partner-logos/v4/netflix-light.svg"/>
                    <img alt="Eventbrite" height="44" width="115" src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"/>
                </div>
            </div>
            <div className={styles.section1}>
                <div className={styles.left}>
                    <ul>
                        <li>Online Academy business</li>
                        <li>Teach on Online Academy</li>
                        <li>Get the app</li>
                        <li>About us</li>
                    </ul>
                    <ul>
                        <li>Careers</li>
                        <li>Blogs</li>
                        <li>Help and support</li>
                        <li>About us</li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <span>English</span>
                </div>
            </div>
            <div className={styles.section2}>
                <img src={logoFull} alt=""/>
                <span>2021 Online Academy, Inc</span>
            </div>
        </div>
    );
}


export default Footer;