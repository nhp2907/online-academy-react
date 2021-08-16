import StudentManagementComponent from "../page/admin/component/controls/student-management/StudentManagementComponent";
import CategoryManagementComponent from "../page/admin/component/controls/category-management/CategoryManagementComponent";
import CourseManagementComponent from "../page/admin/component/controls/course-management/CourseManagementComponent";
import ManagementRoute from "../page/management-page/model/ManagementRoute";
import InstructorCourseManagementComponent from "../page/instructor/controls-component/course-management/InstructorCourseManagementComponent";
import InstructorCourseDetailComponent from "../page/instructor/controls-component/course-detail/InstructorCourseDetailComponent";
import InstructorProfileComponent from "../page/instructor/controls-component/instructor-profile/InstructorProfile";
import InstructorCourseDetailHeader from "../page/instructor/controls-component/course-detail/InstructorCourseDetailHeader";
import InstructorManagementComponent from "../page/admin/component/controls/instructor-management/InstructorManagementComponent";


export const adminRouteList: ManagementRoute[] = [
    {
        path: '/admin/category',
        icon: 'users',
        name: 'Category',
        redirectUrl: '/login',
        component: CategoryManagementComponent,
    },
    {
        path: '/admin/student',
        component: StudentManagementComponent,
        icon: 'users',
        redirectUrl: '/login',
        name: 'Student'
    },
    {
        path: '/admin/instructor',
        icon: 'users',
        name: 'Instructor',
        redirectUrl: '/login',
        component: InstructorManagementComponent,
    },
    {
        path: '/admin/course',
        icon: 'book',
        name: 'Course',
        redirectUrl: '/login',
        component: CourseManagementComponent,
    }
]
export const adminDefaultRoute: ManagementRoute = {
    path: '/admin',
    component: StudentManagementComponent,
    icon: 'users',
    name: 'User',
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
