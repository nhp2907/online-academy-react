import React, {useEffect, useRef, useState} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import CategoryInputComponent from "./category-input/CategoryInputComponent";
import Category from "../../../../../model/Category";
import {findIndexByIdUtil, removeItemFromListByIdUtil} from '../../../../../utils/utils';
import {getCategories} from '../../../../../service/home.service';
import '../../data-table.scss';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {createCategoryApi, deleteCategoryApi, updateCategoryApi} from '../../../../../service/admin.service';
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method

interface Props {

}

const CategoryManagementComponent: React.FC<Props> = ({}) => {
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)
    const emptyCategory: Category = {
        name: '',
        level: 1,
        icon: '',
        subs: []
    }
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>(emptyCategory);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [expandedRows, setExpandedRows] = useState<any>();

    useEffect(() => {
        getCategories().then(cates => setCategories(cates))
    }, [])

    const editOpenCategoryForm = (rowData: Category) => {
        setCategory(rowData);
        setCreateModalVisible(true);
    }

    const deleteCategory =async (rowData: Category) => {
        try {
            await deleteCategoryApi(rowData.id);
            getCategories().then(cates => setCategories(cates))
            // @ts-ignore
            showToastMessage({severity: 'success', summary: 'Successful', detail: 'Category is deleted', life: 3000});
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Delete failed', detail: err.response.data.message, life: 3000});
        }
    }

    const saveCategory = async (categoryForm: Category) => {
        const categories_ = [...categories]

        try {
            if (categoryForm.id) {
                const index = findIndexByIdUtil(categoryForm.id, categories);
                console.log('user submited')
                const updateResult = await updateCategoryApi(categoryForm);
                categories_[index] = categoryForm;
                setCategories(categories_);

                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            } else {
                const newCate = await createCategoryApi(categoryForm);

                getCategories().then(cates => setCategories(cates))

                setCreateModalVisible(false);
                setCategory(emptyCategory);
                // @ts-ignore
                showToastMessage({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
            }
        } catch (err) {
            // @ts-ignore
            showToastMessage({severity: 'error', summary: 'Failed', detail: err.response.data.message, life: 3000});
        }


    }

    const header = (
        <div className="table-header">
            <div className={'table-header-left'}>
                {/*<span>Manage users</span>*/}
                <Button label="New" icon="pi pi-plus" style={{marginRight: 10, fontSize: 15}}
                        className=" p-button-success p-mr-2"
                        onClick={() => setCreateModalVisible(true)}/>
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
    const confirm = (event: any, rowData:Category) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteCategory(rowData)
        });
    }

    const actionBodyTemplate = (rowData: Category) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" style={{marginRight: 10}}
                        className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => editOpenCategoryForm(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"
                        onClick={(e: any) => confirm(e, rowData)}/>
            </React.Fragment>
        );
    }

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="categories-sub-table">
                <h5>Sub category of {data.name}</h5>
                <DataTable value={data.subs}>
                    <Column field="id" header="#Id"/>
                    <Column field="name" header="Name"/>
                    <Column body={actionBodyTemplate}/>
                </DataTable>
            </div>
        );
    }

    return (
        <div>
            <div className="datatable-crud-demo">
                <div className="card">
                    {/*<Toolbar className="p-mb-4 " left={leftToolbarTemplate}/>*/}
                    <DataTable ref={dt} value={categories}
                        // onRowExpand={onRowExpand} onRowCollapse={onRowCollapse}
                               expandedRows={expandedRows}
                               onRowToggle={e => setExpandedRows(e.data)}
                               rowExpansionTemplate={rowExpansionTemplate}
                        // onSelectionChange={(e) => setSelectedUsers(e.value)}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                               globalFilter={globalFilter}
                               header={header}>

                        <Column expander style={{width: '3em'}}/>
                        <Column header="#Id" field={'id'}/>
                        {/*<Column header="Image" body={imageBodyTemplate}/>*/}
                        <Column header="Name" field={'name'}/>
                        {/*<Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable/>*/}
                        {/*<Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable/>*/}
                        <Column body={actionBodyTemplate}/>
                    </DataTable>
                </div>

                <Dialog header="Category Details" visible={createModalVisible} style={{width: '450px'}} modal className="p-fluid"
                        onHide={() => setCreateModalVisible(false)}>
                    <CategoryInputComponent category={category} onSubmit={saveCategory} hideModal={() => {
                        setCategory(emptyCategory)
                        setCreateModalVisible(false)
                    }}/>
                </Dialog>

                {/*<Dialog visible={deleteUserDialog} style={{width: '450px'}} header="Confirm" modal*/}
                {/*        onHide={hideDeleteUserDialog}>*/}
                {/*    <div className="confirmation-content">*/}
                {/*        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>*/}
                {/*        {user && <span>Are you sure you want to delete <b>{user.firstName}</b>?</span>}*/}
                {/*    </div>*/}
                {/*</Dialog>*/}

                {/*<Dialog visible={deleteManyUserDialog} style={{width: '450px'}} header="Confirm" modal*/}
                {/*        onHide={hideDeleteUsersDialog}>*/}
                {/*    <div className="confirmation-content">*/}
                {/*        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>*/}
                {/*        {user && <span>Are you sure you want to delete the selected users?</span>}*/}
                {/*    </div>*/}
                {/*</Dialog>*/}
            </div>
        </div>
    );
}


export default CategoryManagementComponent;