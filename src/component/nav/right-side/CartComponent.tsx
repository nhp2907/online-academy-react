import React, {useState} from 'react'
import styles from "../nav.module.scss";
import {Badge} from "primereact/badge";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import CartState from "../../../redux/cart/CartState";
import Course from "../../../model/Course";
import CartListItem from "./CartListItem";

interface Props {

}

const CartComponent: React.FC<Props> = ({}) => {
    const cart: CartState = useSelector((state: RootState) => state.cart);
    const [isShowList, setIsShowList] = useState(false)

    return (
        <div className={styles.card}>
            <i className="pi pi-shopping-cart p-mr-4 p-text-secondary p-overlay-badge"
               style={{marginTop: 7}}
               onClick={() => setIsShowList(!isShowList)}>
                <Badge value={cart.courses.length}/>
            </i>
            {
                isShowList &&
                <div className={`${styles.list} card`}>
                    {
                        cart.courses.map((course: Course) => <CartListItem key={course.id} item={course}/>)
                    }
                </div>
            }
        </div>
    );
}


export default CartComponent;