import React from 'react'
import {Carousel} from 'primereact/carousel';
import styles from './slide-show.module.scss'
import banner1 from '../../../assets/img/banner1.jpg'

interface Props {

}

const SlideShowComponent: React.FC<Props> = ({}) => {
    const images: string[] = [
        banner1,
        'https://png.pngtree.com/thumb_back/fh260/back_pic/00/04/53/9556248b4747950.png',
        'https://i.ytimg.com/vi/udva875NILw/maxresdefault.jpg'
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