import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './data-table.scss';
import * as userService from '../../../../../service/user.service'
import {createUserApi, updateUserApi} from '../../../../../service/admin.service'
import {User} from "../../../../../model/User";
import SpinnerComponent from "../../../../../component/common/SpinnerComponent";
import UserInputComponent from "./component/user-input/UserInputComponent";
import {RootState} from "../../../../../redux/store";
import UserRole from "../../../../../model/UserRole";

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
        roleId: 1
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
        const _users = await userService.getAll();
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
        setUser(userForm);
        console.log('user after set: ', user);
        setSubmitted(true);
        const _users = [...users]

        try {
            if (user.id) {
                const index = findIndexById(user.id);
                console.log('user submited')
                const updateResult = await updateUserApi(user);
                _users[index] = user;
                setUsers(_users);

                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            } else {
                const newUser = await createUserApi(user);
                setUsers([newUser, ...users])
                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
            }
        } catch(err) {
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

    const deleteUser = () => {
        // let _users = users.filter(val => val.id !== user.id);
        // setUser(_users);
        // setDeleteUserDialog(false);
        // setUser(emptyUser);
        // toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
    }

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedUsers = () => {
        let _users = users.filter(val => !selectedUsers.includes(val));
        setUsers(_users);
        setDeleteUsersDialog(false);
        setSelectedUsers([]);
        // toast.current.show({severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
    }

    // const onCategoryChange = (e) => {
    //     let _user = {...user};
    //     _user['category'] = e.value;
    //     setUser(_user);
    // }
    //
    const onInputChange = (e: any, key: string) => {
        const val: number | string = (e.target && e.target.value) || '';
        let _user = {...user};
        // @ts-ignore
        _user[key] = val;

        setUser(_user);
    }
    //
    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _user = {...user};
    //     _user[`${name}`] = val;
    //
    //     setUser(_user);
    // }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" style={{marginRight: 10}} className="p-button-success p-mr-2"
                        onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected}
                        disabled={!selectedUsers || !selectedUsers.length}/>
            </React.Fragment>
        )
    }

    const nameBodyTemplate = (rowData: User) => {
        return <span>{`${rowData.firstName} ${rowData.lastName}`}</span>
    }

    const idTemplate = (rowData: User) => {
        return <span>{rowData.id?.substring(1, 8)}</span>
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
                        onClick={() => confirmDeleteUser(rowData)}/>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <div className={'table-header-left'}>
                {/*<span>Manage users</span>*/}
                <Button label="New" icon="pi pi-plus" style={{marginRight: 10, fontSize: 15}}
                        className=" p-button-success p-mr-2"
                        onClick={openNew}/>
                <Button label="Delete" icon="pi pi-trash" className="p-button-text p-button-danger" style={{marginRight: 10, fontSize: 15}}
                        onClick={confirmDeleteSelected}
                        disabled={!selectedUsers || !selectedUsers.length}/>
            </div>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search"
                           onInput={(e: React.FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)}
                           placeholder="Search..."/>
            </span>
        </div>
    );
    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser}/>
        </React.Fragment>
    );
    const deleteManyUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog}/>
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers}/>
        </React.Fragment>
    );

    if (isLoading) {
        return <SpinnerComponent/>
    }
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

                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                    {/*<Column header="Id" body={idTemplate}/>*/}
                    {/*<Column header="Image" body={imageBodyTemplate}/>*/}
                    <Column field={'username'} header="Username" sortable/>
                    <Column header="Name" body={nameBodyTemplate}/>
                    <Column field={'email'} header="Email" sortable/>
                    <Column field={'role'} header="Role" sortable/>
                    <Column field={'status'} header="Status" sortable/>
                    {/*<Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable/>*/}
                    {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable/>*/}
                    <Column body={actionBodyTemplate}/>
                </DataTable>
            </div>

            <Dialog header="User Details" visible={userDialog} style={{width: '450px'}} modal className="p-fluid"
                    onHide={hideDialog}>
                {user.image && <img src={`showcase/demo/images/user/${user.image}`}
                                    alt={user.image} className="user-image"/>}
                <UserInputComponent user={user} onSubmit={saveUser} hideModal={() => setUserDialog(false)}/>
            </Dialog>

            <Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {user && <span>Are you sure you want to delete <b>{user.firstName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteManyUserDialog} style={{width: '450px'}} header="Confirm" modal
                    footer={deleteManyUserDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {user && <span>Are you sure you want to delete the selected users?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default UserManagementComponent;