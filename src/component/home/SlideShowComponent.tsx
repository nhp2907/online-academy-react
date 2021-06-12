import React from 'react'
import styles from '../../page/home/home.module.scss'
import {Carousel} from 'primereact/carousel';

interface Props {

}

const SlideShowComponent: React.FC<Props> = ({}) => {
    const images: string[] = [
        'https://d1j8r0kxyu9tj8.cloudfront.net/images/1562663273OyCyS9raIe4XXr1.jpg',
        'https://png.pngtree.com/thumb_back/fh260/back_pic/00/04/53/9556248b4747950.png',
        'https://i.ytimg.com/vi/udva875NILw/maxresdefault.jpg'
    ]
    const imageTemplate = (image: any) => {
        return (
            <img src={image} style={{maxHeight: 400}}/>
        )
    }
    return (
        <div className={styles['slideshow']}>
            <Carousel className={""} value={images} itemTemplate={imageTemplate} numVisible={1} numScroll={1} circular autoplayInterval={3000}  />
        </div>
    );
}


export default SlideShowComponent;