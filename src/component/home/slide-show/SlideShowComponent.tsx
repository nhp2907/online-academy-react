import React from 'react'
import {Carousel} from 'primereact/carousel';
import styles from './slide-show.module.scss'
import banner1 from '../../../assets/img/banner1.jpg'
import banner2 from '../../../assets/img/banner2.jpg'
import banner3 from '../../../assets/img/banner3.jpg'

interface Props {

}

const SlideShowComponent: React.FC<Props> = ({}) => {
    const images: string[] = [
        banner1,
        banner2,
        banner3
    ]
    const imageTemplate = (image: any) => {
        return (
            <img className={styles.image}  src={image} style={{maxHeight: 400}}/>
        )
    }
    return (
        <div className={styles.slideShow}>
            <Carousel className={""} value={images} itemTemplate={imageTemplate} numVisible={1} numScroll={1} circular autoplayInterval={3000}/>
        </div>
    );
}


export default SlideShowComponent;