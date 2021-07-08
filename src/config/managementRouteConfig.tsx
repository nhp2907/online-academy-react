import UserManagementComponent from "../page/admin/component/controls/user-management/UserManagementComponent";
import CategoryManagementComponent from "../page/admin/component/controls/category-management/CategoryManagementComponent";
import CourseManagementComponent from "../page/admin/component/controls/course-management/CourseManagementComponent";
import ManagementRoute from "../page/management-page/model/ManagementRoute";
import InstructorCourseManagementComponent from "../page/instructor/controls-component/course-management/InstructorCourseManagementComponent";
import InstructorCourseDetailComponent from "../page/instructor/controls-component/course-detail/InstructorCourseDetailComponent";
import InstructorProfileComponent from "../page/instructor/controls-component/instructor-profile/InstructorProfile";
import InstructorCourseDetailHeader from "../page/instructor/controls-component/course-detail/InstructorCourseDetailHeader";


export const adminRouteList: ManagementRoute[] = [
    {
        path: '/admin/user',
        component: UserManagementComponent,
        icon: 'users',
        redirectUrl: '/login',
        name: 'User management'
    },
    {
        path: '/admin/category',
        icon: 'users',
        name: 'Category management',
        redirectUrl: '/login',
        component: CategoryManagementComponent,
    },
    {
        path: '/admin/course',
        icon: 'book',
        name: 'Course management',
        redirectUrl: '/login',
        component: CourseManagementComponent,
    }
]
export const adminDefaultRoute: ManagementRoute = {
    path: '/admin',
    component: UserManagementComponent,
    icon: 'users',
    name: 'User management',
    redirectUrl: '/login'
}


export const instructorRouteList: ManagementRoute[] = [
    {
        path: '/instructor/course',
        component: InstructorCourseManagementComponent,
        icon: 'books',
        name: 'Course management',
        redirectUrl: '/login'
    },
    // {
    //     path: '/instructor/course/new',
    //     component: InstructorCourseDetailComponent,
    //     icon: 'user',
    //     name: 'Create new course',
    //     redirectUrl: '/instructor',
    //     hidden: true,
    //     render: props => <InstructorCourseDetailComponent {...props} />,// course owro ddaau ra?
    //     renderHeader: props => <InstructorCourseDetailHeader {...props}/>
    // },
    {
        path: '/instructor/course/:id',
        component: InstructorCourseDetailComponent,
        icon: 'user',
        name: 'Course detail',
        redirectUrl: '/login',
        hidden: true,
        render: props => <InstructorCourseDetailComponent {...props} />, // course owro ddaau ra?
        renderHeader: props => <InstructorCourseDetailHeader {...props}/>
    },
    {
        path: '/instructor/profile',
        component: InstructorProfileComponent,
        icon: 'user',
        name: 'Profile',
        redirectUrl: '/login'
    }
]

export const instructorDefaultRoute: ManagementRoute = {
    path: '/instructor',
    component: InstructorCourseManagementComponent,
    icon: 'books',
    name: 'Course management',
    redirectUrl: '/login'
}
