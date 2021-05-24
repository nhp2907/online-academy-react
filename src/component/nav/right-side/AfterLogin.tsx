import React from 'react'

interface Props {

}

const AfterLogin : React.FC<Props> = ({}) => {
    return (
        <div>
            <div className="after-sign-in">
                <a href="/instructor" className="nav-link">Instructor</a>
                <div className="my-learning">
                    <a href="#" className="nav-link">My learning</a>
                    <div className="my-learning-dropdown-content">

                    </div>
                </div>
                <div className="my-cart">
                    {/*<div className="amount-in-cart">{user.cart.length}</div>*/}
                    {/*<a href="#" className="nav-link"><i className="fas fa-shopping-cart"></i></a>*/}
                    {/*<div className="my-cart-content">*/}
                    {/*</div>*/}
                </div>
                <div className="my-notification">
                    <div className="amount-of-notification">1</div>
                    <a href="#" className="nav-link"><i className="fas fa-bell"></i></a>
                    <div className="my-notification-content">
                        <div className="my-introduce-notification">
                            <span>Notification</span>
                            <a href="#">Settings</a>
                            <button><a href="/instructor">Instructor</a></button>
                            <button>Student</button>
                        </div>
                        <div className="my-notification-item">

                        </div>
                        <div className="my-empty-notification">
                            <p>No Notification</p>
                        </div>
                    </div>
                </div>
                <div className="my-profile">
                    <a href="#" className="nav-link"><i className="far fa-user"></i></a>
                    <div className="my-profile-content">
                        <div>
                            {/*<p>TT</p>*/}
                            {/*<p><span className="first-name">{{this.user.firstName}} </span><span*/}
                            {/*    className="last-name">{{this.user.lastName}}</span></p>*/}
                            {/*<p>{{this.user.email}}</p>*/}
                        </div>
                        <hr/>
                        <div>
                            <a href="/my-courses/learning">My Learning</a>
                            <a href="/cart">My Cart</a>
                            <a href="#">Instructor Dashboard</a>
                        </div>
                        <hr/>
                        <div>
                            <a href="#">Notifications</a>
                            <a href="#">Messages</a>
                        </div>
                        <hr/>
                        <div>
                            <a href="#">Account Settings</a>
                            <a href="#">Payment Methods</a>
                            <a href="#">Udemy Credits</a>
                            <a href="#">Purchase History</a>
                        </div>
                        <hr/>
                        <div>
                            <a href="#">Public Profile</a>
                            <a href="#">Edit Profile</a>
                        </div>
                        <hr/>
                        <div>
                            <a href="#">Help</a>
                            <a href="/logout" id="log-out-btn">Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AfterLogin;