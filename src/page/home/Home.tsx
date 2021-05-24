import * as React from 'react';
import Nav from "../../component/nav/Nav";
import Profile from "../../component/profile/Profile";

type Props = {};

export const Home = (props: Props) => {
    return (
        <>
            <Nav/>
            <Profile/>
        </>
    );
};