import React, {useEffect, useRef, useState} from 'react';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import './data-table.scss';
import * as userService from '../../../../../service/user.service'
import {User} from "../../../../../model/User";
import SpinnerComponent from "../../../../../component/common/SpinnerComponent";
import UserInputComponent from "./component/UserInputComponent";

interface Props {

}

const UserManagementComponent: React.FC<Props> = ({}) => {

    const [isLoading, setIsLoading] = useState(true);

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
    const [userDialog, setUserDialog] = useState(true);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteManyUserDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState<User>(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef(null);
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

    const saveUser = () => {
        setSubmitted(true);

        if (user.firstName.trim()) {
            let _users = [...users];
            let _user = {...user};
            if (user.id) {
                const index = findIndexById(user.id);

                // @ts-ignore
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            } else {
                // _user.id = createId();
                // _user.image = 'user-placeholder.svg';
                // _users.push(_user);
                // @ts-ignore
                toast.current.show({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
            }

            setUsers(_users);
            setUserDialog(false);
            setUser(emptyUser);
        }
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

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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

    const imageBodyTemplate = (rowData: User) => {
        return <img src={`showcase/demo/images/user/${rowData.image}`}
                    alt={rowData.image} className="user-image"/>
    }

    const nameBodyTemplate = (rowData: User) => {
        return <span>{`${user.firstName} ${user.lastName}`}</span>
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
    const userDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser}/>
        </React.Fragment>
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
            <Toast ref={toast}/>

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
                    <Column field="id" header="Id" sortable/>
                    <Column header="Image" body={imageBodyTemplate}/>
                    <Column field={'username'} header="username" sortable/>
                    <Column field={'firstName'} header="Name" sortable body={nameBodyTemplate}/>
                    <Column field={'email'} header="Email" sortable/>
                    <Column field={'role'} header="Role" sortable/>
                    <Column field={'status'} header="Status" sortable/>
                    {/*<Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable/>*/}
                    {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable/>*/}
                    <Column body={actionBodyTemplate}/>
                </DataTable>
            </div>

            <Dialog visible={userDialog} style={{width: '450px'}} header="User Details" modal className="p-fluid"
                    footer={userDialogFooter} onHide={hideDialog}>
                {user.image && <img src={`showcase/demo/images/user/${user.image}`}
                                    alt={user.image} className="user-image"/>}
                                    <UserInputComponent />
                {/*<div className="p-field">*/}
                {/*    <label htmlFor="name">Fristname</label>*/}
                {/*    <InputText id="name" value={user.firstName} onChange={(e) => onInputChange(e, 'name')} required*/}
                {/*               autoFocus className={classNames({'p-invalid': submitted && !user.firstName})}/>*/}
                {/*    {submitted && !user.firstName && <small className="p-error">Name is required.</small>}*/}
                {/*</div>*/}

                {/*<div className="p-field">*/}
                {/*    <label className="p-mb-3">Category</label>*/}
                {/*    <div className="p-formgrid p-grid">*/}
                        {/*<div className="p-field-radiobutton p-col-6">*/}
                        {/*    <RadioButton inputId="category1" name="category" value="Accessories"*/}
                        {/*                 onChange={onCategoryChange} checked={user.category === 'Accessories'}/>*/}
                        {/*    <label htmlFor="category1">Accessories</label>*/}
                        {/*</div>*/}
                        {/*<div className="p-field-radiobutton p-col-6">*/}
                        {/*    <RadioButton inputId="category2" name="category" value="Clothing"*/}
                        {/*                 onChange={onCategoryChange} checked={user.category === 'Clothing'}/>*/}
                        {/*    <label htmlFor="category2">Clothing</label>*/}
                        {/*</div>*/}
                        {/*<div className="p-field-radiobutton p-col-6">*/}
                        {/*    <RadioButton inputId="category3" name="category" value="Electronics"*/}
                        {/*                 onChange={onCategoryChange} checked={user.category === 'Electronics'}/>*/}
                        {/*    <label htmlFor="category3">Electronics</label>*/}
                        {/*</div>*/}
                        {/*<div className="p-field-radiobutton p-col-6">*/}
                        {/*    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange}*/}
                        {/*                 checked={user.category === 'Fitness'}/>*/}
                        {/*    <label htmlFor="category4">Fitness</label>*/}
                        {/*</div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="p-formgrid p-grid">*/}
                    {/*<div className="p-field p-col">*/}
                    {/*    <label htmlFor="price">Price</label>*/}
                    {/*    <InputNumber id="price" value={user.price}*/}
                    {/*                 onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency"*/}
                    {/*                 currency="USD" locale="en-US"/>*/}
                    {/*</div>*/}
                    {/*<div className="p-field p-col">*/}
                    {/*    <label htmlFor="quantity">Quantity</label>*/}
                    {/*    <InputNumber id="quantity" value={user.quantity}*/}
                    {/*                 onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly/>*/}
                    {/*</div>*/}
                {/*</div>*/}
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