import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import '../../data-table.scss';
import * as userService from '../../../../../service/user.service'
import {createUserApi, deleteUserApi, updateUserApi} from '../../../../../service/admin.service'
import {User} from "../../../../../model/User";
import SpinnerComponent from "../../../../../component/common/SpinnerComponent";
import UserInputComponent from "./component/user-input/UserInputComponent";
import {RootState} from "../../../../../redux/store";
import {InputSwitch} from "primereact/inputswitch";

interface Props {

}

const UserManagementComponent: React.FC<Props> = ({}) => {

    const [isLoading, setIsLoading] = useState(true);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    let emptyUser: User = {
        id: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: '',
        roleId: 1,
        watchList: [],
        myLearningList: []
    };

    const [users, setUsers] = useState<User[]>([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteManyUserDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState<User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    useEffect(() => {
        loadData().then(r => {
            setIsLoading(false)
        })
            .finally(() => {
                setIsLoading(false)
                console.log('isLoading', isLoading)
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadData = async () => {
        const _users = await userService.findUserApi();
        setUsers(_users)
    }

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    }

    const saveUser = async (userForm: User) => {
        console.log(userForm);
        setSubmitted(true);
        const _users = [...users]

        try {
            if (userForm.id) {
                const index = findIndexById(userForm.id);
                console.log('user submited')
                const updateResult = await updateUserApi(userForm);
                _users[index] = userForm;
                setUsers(_users);

                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            } else {
                const newUser = await createUserApi(userForm);
                setUsers([newUser, ...users])
                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
            }
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Failed', detail: err.response.data.message, life: 3000});
        }

        setUserDialog(false);
        setUser(emptyUser);

    }

    const editUser = (user: User) => {
        setUser({...user});
        setUserDialog(true);
    }

    const confirmDeleteUser = (user: User) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const disableUser = async (rowData: User) => {
        try {
            let index = findIndexById(rowData.id);
            const user_ = users[index];
            user_.status = !user_.status;
            await updateUserApi(user_);
            const users_ = [...users]
            users_[index] = user_;
            setUsers(users_)
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Successful', detail: user_.status ? 'User is enabled' : 'User is disabled', life: 3000});
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Update user failed', detail: err.response.data.message, life: 3000});
        }
        // toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
    }

    const deleteUser = async (rowData: User) => {
        try {
            let index = findIndexById(rowData.id);
            const user_ = users[index];
            user_.status = !user_.status;
            await deleteUserApi(user_.id);
            const users_ = [...users]
            users_.splice(index, 1);
            setUsers(users_)
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Successful', detail: 'User is deleted', life: 3000});
            hideDeleteUserDialog()
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Delete user failed', detail: err.response.data.message, life: 3000});
        }
        // toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
    }

    const findIndexById = (id: any) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const indexTemplate = (cc: any, props: any) => {
        return <span>{props.rowIndex + 1}</span>
    }

    const nameBodyTemplate = (rowData: User) => {
        return <span>{`${rowData.firstName} ${rowData.lastName}`}</span>
    }

    const statusBody = (rowData: User) => {
        return <div onClick={e => e.stopPropagation()} style={{display: "flex", alignItems: "center"}}>
            <InputSwitch className={'p-mr-2'} checked={rowData.status}
                         onChange={(e) => {
                             disableUser(rowData)
                         }}/>
            <span style={{marginLeft: 10}}>{!rowData.status ? "Disabled" : 'Enabled'}</span>
        </div>
    }

    // const ratingBodyTemplate = (rowData: User) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false}/>;
    // }

    // const statusBodyTemplate = (rowData: User) => {
    //     return <span
    //         className={`user-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

    const actionBodyTemplate = (rowData: User) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" style={{marginRight: 10}}
                        className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => editUser(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                        onClick={() => confirmDeleteUser(rowData)}
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <div className={'table-header-left'}>
                {/*<span>Manage users</span>*/}
                <Button label="New instructor" icon="pi pi-plus" style={{marginRight: 10, fontSize: 15}}
                        className=" p-button-success p-mr-2"
                        onClick={openNew}/>
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
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => deleteUser(user)}/>
        </React.Fragment>
    );
    return (
        <div className="datatable-crud-demo">
            <div className="card">
                {/*<Toolbar className="p-mb-4 " left={leftToolbarTemplate}/>*/}

                <DataTable ref={dt} value={users} selection={selectedUsers}
                           onSelectionChange={(e) => setSelectedUsers(e.value)}
                           dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                           globalFilter={globalFilter}
                           header={header}>

                    {/*<Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>*/}
                    {/*<Column header="Id" body={idTemplate}/>*/}
                    {/*<Column header="Image" body={imageBodyTemplate}/>*/}
                    <Column header={''} body={indexTemplate} style={{maxWidth: 50, width: '5%'}}/>
                    <Column field={'username'} header="Username" sortable/>
                    <Column header="Name" body={nameBodyTemplate}/>
                    <Column field={'email'} header="Email" sortable/>
                    <Column field={'role'} header="Role" sortable style={{maxWidth: 100, width: '10%'}}/>
                    <Column field={'status'} header="Status" body={statusBody} style={{maxWidth: 100, width: '15%'}}/>
                    {/*<Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable/>*/}
                    {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable/>*/}
                    <Column body={actionBodyTemplate} style={{maxWidth: 120, width: '15%'}}/>
                </DataTable>
            </div>

            <Dialog header="Create instructor account" visible={userDialog} style={{width: '450px'}} modal className="p-fluid"
                    onHide={hideDialog}>
                {user.image && <img src={`showcase/demo/images/user/${user.image}`}
                                    alt={user.image} className="user-image"/>}
                <UserInputComponent user={user} onSubmit={saveUser} hideModal={() => setUserDialog(false)}/>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Confirm" modal
                    onHide={hideDeleteUserDialog}
                    footer={deleteUserDialogFooter}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {user && <span>Are you sure you want to delete <b>{`${user.firstName} ${user.lastName}`}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteManyUserDialog} style={{width: '450px'}} header="Confirm" modal
                    onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {user && <span>Are you sure you want to delete the selected users?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default UserManagementComponent;