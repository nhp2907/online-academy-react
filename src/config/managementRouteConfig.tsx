import UserManagementComponent from "../page/admin/component/controls/user-management/UserManagementComponent";
import CategoryManagementComponent
    from "../page/admin/component/controls/category-management/CategoryManagementComponent";
import CourseManagementComponent from "../page/admin/component/controls/course-management/CourseManagementComponent";
import ManagementRoute from "../page/management-page/model/ManagementRoute";
import InstructorCourseManagementComponent
    from "../page/instructor/controls-component/course-management/InstructorCourseManagementComponent";
import InstructorCourseDetailComponent
    from "../page/instructor/controls-component/course-detail/InstructorCourseDetailComponent";
import InstructorProfileComponent from "../page/instructor/controls-component/instructor-profile/InstructorProfile";
import {RootState} from "../redux/store";
import { useSelector } from "react-redux";


export const adminRouteList: ManagementRoute[] = [
    {
        path: '/admin/user',
        component: UserManagementComponent,
        icon: 'users',
        name: 'User management'
    },
    {
        path: '/admin/category',
        icon: 'users',
        name: 'Category management',
        component: CategoryManagementComponent,
    },
    {
        path: '/admin/course',
        icon: 'book',
        name: 'Course management',
        component: CourseManagementComponent,
    }
]
export const adminDefaultRoute: ManagementRoute = {
    path: '/admin',
    component: UserManagementComponent,
    icon: 'users',
    name: 'User management'
}


export const instructorRouteList: ManagementRoute[] = [
    {
        path: '/instructor/course',
        component: InstructorCourseManagementComponent,
        icon: 'books',
        name: 'Course management',
        redirectUrl: '/'
    },
    {
        path: '/instructor/course/new',
        component: InstructorCourseDetailComponent,
        icon: 'user',
        name: 'Create new course',
        redirectUrl: '/instructor',
        hidden: true,
        render: props => <InstructorCourseDetailComponent {...props} /> // course owro ddaau ra?
    },
    {
        path: '/instructor/course/:id',
        component: InstructorCourseDetailComponent,
        icon: 'user',
        name: 'Course detail',
        redirectUrl: '/instructor',
        hidden: true,
        render: props => <InstructorCourseDetailComponent {...props} /> // course owro ddaau ra?
    },
    {
        path: '/instructor/profile',
        component: InstructorProfileComponent,
        icon: 'user',
        name: 'Profile',
        redirectUrl: '/'
    }
]

export const instructorDefaultRoute: ManagementRoute = {
    path: '/instructor',
    component: InstructorCourseManagementComponent,
    icon: 'books',
    name: 'Course management'
}
