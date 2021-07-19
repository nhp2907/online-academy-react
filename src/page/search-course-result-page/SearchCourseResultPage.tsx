import React, {RefObject, useLayoutEffect, useRef} from 'react'
import Nav from "../../component/nav/Nav";
import styles from "../style.module.css";
import SearchResultMainComponent from "./compnent/SearchResultMainComponent";

interface Props {

}

const SearchCourseResultPage : React.FC<Props> = ({}) => {

    return (
        <div className={styles.page}>
            <Nav/>
            <SearchResultMainComponent />
        </div>
    );
}


export default SearchCourseResultPage;