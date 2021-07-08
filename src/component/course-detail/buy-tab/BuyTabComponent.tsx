import React, {useEffect} from 'react'
import styles from './buy-tab.module.scss'
import {Card} from 'primereact/card';
import {Button} from "primereact/button";
import {addCourseToWatchListApi, getUserProfile, removeCourseFromWatchListApi} from "../../../service/user.service";
import {User} from "../../../model/User";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {setUser} from "../../../redux/auth/auth.slice";

interface Props {
    course?: any
}

const BuyTabComponent: React.FC<Props> = ({course}) => {
    const user = useSelector((s: RootState) => s.auth.user);
    const history = useHistory();
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const isContainsCourse = !!user?.watchList.includes(course.id);
    const dispatch = useDispatch();
    useEffect(() => {
    }, [user])
    return (
        <div className={styles.buyTab}>
            <div className={styles.image}>
                <img src={course.image} alt=""/>
            </div>
            <div className={styles.introduce}>
                <h4>This course includes:</h4>
                <ul>
                    <li>13 hours on-demand video</li>
                    <li>Full lifetime access</li>
                    <li>Certificate of completion</li>
                </ul>
            </div>
            <div className={styles.priceAndBuy}>
                <small>on: </small>
                <span className={styles.priceNumber}>{`${course.price}`}</span>
                <span>USD</span>
                <div className={styles.buttons}>
                    <Button
                        label={isContainsCourse ? 'Remove from Watch list' : 'Add to Watch list'}
                        className={'p-button-outlined p-button-success'}
                        onClick={async (e: any) => {
                            if (user && user.id) {
                                try {
                                    if (isContainsCourse) {
                                        await removeCourseFromWatchListApi(user.id, course.id)
                                        showToastMessage({severity: 'success', summary: "Successfully", detail: 'Course is removed from Watch list'})
                                    } else {
                                        await addCourseToWatchListApi(user.id, course.id)
                                        showToastMessage({severity: 'success', summary: "Successfully", detail: 'Course is added to Watch list'})
                                    }
                                    getUserProfile().then((user: User) => dispatch(setUser(user)))
                                } catch (err) {
                                    showToastMessage({severity: 'error', summary: "Failed", detail: err.response.data.message})
                                }
                            } else {
                                history.push('/login', {backUrl: `/course/${course.id}`})
                            }
                        }}/>
                    <Button label={'Buy this course'} className={'p-button-danger'}/>
                </div>
            </div>
            <span>Online Academy</span>
        </div>
    );
}


export default BuyTabComponent;