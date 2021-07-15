import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import '../../data-table.scss';
import SpinnerComponent from "../../../../../component/common/SpinnerComponent";
import {RootState} from "../../../../../redux/store";
import {InputSwitch} from "primereact/inputswitch";
import {Rating} from 'primereact/rating';
import Course from "../../../../../model/Course";
import {deleteCourseApi, disableCourseApi, getAllCourseAdminApi} from "../../../../../service/admin.service";

interface Props {

}

const CourseManagementComponent: React.FC<Props> = ({}) => {

    const [isLoading, setIsLoading] = useState(true);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState<Course>();
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    useEffect(() => {
        loadData().then(r => {
            setIsLoading(false)
        })
            .finally(() => {
                setIsLoading(false)
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadData = async () => {
        const course = await getAllCourseAdminApi();
        setCourses(course)
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const confirmDeleteCourse = (course: Course) => {
        setCourse(course);
        setDeleteUserDialog(true);
    }

    const disableCourse = async (rowData: Course) => {
        try {
            let index = findIndexById(rowData.id);
            const course = courses[index];
            course.disabled = !course.disabled;
            await disableCourseApi(course.id);
            const course_ = [...courses]
            course_[index] = course;
            setCourses(course_)
            showToastMessage({severity: 'success', summary: 'Successful', detail: course.status ? 'Course is enabled' : 'Course is disabled', life: 3000});
        } catch (err) {
            showToastMessage({severity: 'error', summary: 'Update course failed', detail: err.response.data.message, life: 3000});
        }
        // toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
    }

    const deleteCourse = async (course?: Course) => {
        if (!course) {
            return;
        }

        try {
            await deleteCourseApi(course.id);
            const index = findIndexById(course.id);
            const course_ = [...courses]
            course_.splice(index, 1);
            setCourses(course_)

            showToastMessage({severity: 'success', summary: 'Successful', detail: 'Course is deleted', life: 3000});
        } catch (err) {
            showToastMessage({severity: 'error', summary: 'Update course failed', detail: err.response.data.message, life: 3000});
        }
    }

    const indexTemplate = (cc: any, props: any) => {
        return <span>{props.rowIndex + 1}</span>
    }

    const findIndexById = (id: any) => {
        let index = -1;
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const statusBody = (rowData: Course) => {
        return <div onClick={e => e.stopPropagation()} style={{display: "flex", alignItems: "center"}}>
            <InputSwitch className={'p-mr-2'} checked={!rowData.disabled}
                         onChange={(e) => {
                             disableCourse(rowData)
                         }}/>
            <span style={{marginLeft: 10}}>{rowData.disabled ? "Disabled" : 'Enabled'}</span>
        </div>
    }

    const ratingBodyTemplate = (rowData: Course) => {
        return <Rating value={rowData.rating} readOnly cancel={false}/>;
    }

    const actionBodyTemplate = (rowData: Course) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                        onClick={() => confirmDeleteCourse(rowData)}
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <div className={'table-header-left'}>
                {/*<span>Manage users</span>*/}
                {/*<Button label="Delete" icon="pi pi-trash" className="p-button-text p-button-danger" style={{marginRight: 10, fontSize: 15}}*/}
                {/*        disabled={!selectedUsers || !selectedUsers.length}/>*/}
            </div>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search"
                           onInput={(e: React.FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)}
                           placeholder="Search..."/>
            </span>
        </div>
    );

    if (isLoading) {
        return <SpinnerComponent/>
    }

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => deleteCourse(course)}/>
        </React.Fragment>
    );
    return (
        <div className="datatable-crud-demo">
            <div className="card">

                <DataTable ref={dt} value={courses}
                    // onSelectionChange={(e) => setSelectedUsers(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} course"
                           globalFilter={globalFilter}
                           header={header}>

                    <Column header={''} body={indexTemplate} style={{maxWidth: 50, width: '5%'}}/>
                    <Column field={'name'} header="Name" sortable/>
                    <Column header="Instructor" field={'author'}/>
                    <Column field={'price'} header="Price" sortable/>
                    <Column header={'Rating'} body={ratingBodyTemplate} sortable/>
                    <Column field={'categoryName'} header="Category" sortable style={{maxWidth: 100, width: '10%'}}/>
                    <Column field={'status'} header="Status" body={statusBody} style={{maxWidth: 100, width: '15%'}}/>
                    <Column body={actionBodyTemplate} style={{maxWidth: 120, width: '15%'}}/>
                </DataTable>
            </div>


            <Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Confirm" modal
                    onHide={hideDeleteUserDialog}
                    footer={deleteUserDialogFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {course && <span style={{marginLeft: 20}}>Are you sure you want to delete <b>{`${course.name}`}</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default CourseManagementComponent;