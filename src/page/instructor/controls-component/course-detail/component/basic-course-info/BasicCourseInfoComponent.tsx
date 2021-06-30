import React, {useEffect, useState} from 'react'
import CommonInput from "../../../../../../component/common/CommonInput";
import courseValidator, {validateDescription, validateHeadline, validateName, validatePrice} from "../../../../../../validator/course.validator";
import CommonSelect from "../../../../../../component/common/CommonSelect";
import styles from './basic-course-info.module.scss';
import Category from "../../../../../../model/Category";
import {RootState} from "../../../../../../redux/store";
import Course from "../../../../../../model/Course";
import {useSelector} from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUpload from "../../../../../../component/common/image-upload/ImageUpload";
import {Button} from 'primereact/button';
import {createCourse, updateCourse as updateCourseApi} from "../../../../../../service/course.service";
import Instructor from "../../../../../../model/Instructor";
import { useHistory } from 'react-router-dom';

interface Props {
    instructor: Instructor | null,
    course: Course
}

const BasicCourseInfoComponent: React.FC<Props> = ({course, instructor}) => {
    const history = useHistory();
    const categories: Category[] = useSelector((state: RootState) => state.categories.list);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const [updateCourse, setUpdateCourse] = useState<Course>(course);
    const [imageFile, setImageFile] = useState<File>();
    const [categoriesLevel2, setCategoriesLevel2] = useState<{ value: any, label: any }[]>([])

    // filter categories and sub categories
    useEffect(() => {
        console.log('coursecate id', updateCourse.categoryId);
        const selectedLeve1Cate = categories.find(c => c.id === updateCourse.categoryId);
        console.log('selecte cate 1: ', selectedLeve1Cate);
        // @ts-ignore
        const level2Cates = selectedLeve1Cate?.subs.map(c => (
            {
                label: c.name,
                value: c.id
            }
        )) || []
        console.log('leve2 cate id', level2Cates);
        setCategoriesLevel2(level2Cates)
    }, [updateCourse.categoryId, updateCourse.subCategoryId])

    useEffect(() => {
        const filterCourse: Course = {
            ...updateCourse,
            name: updateCourse.name ?? '',
            description: updateCourse.description ?? '',
            headline: updateCourse.headline ?? '',
            price: updateCourse.price ?? 0
        }
        setUpdateCourse(filterCourse);
    }, [])

    const handleSubmit = async () => {
        try {
            let message = '';
            if (updateCourse.id) {
                const updatedCourse = await updateCourseApi(updateCourse);
                message = 'Course is updated';
            } else {
                updateCourse.instructorId = instructor?.id;
                const course = await createCourse(updateCourse);
                setUpdateCourse(course);
                message = 'Create course successfully!';
                history.push(`/instructor/course/${course.id}`)
            }
            // @ts-ignore
            showToastMessage({
                severity: 'success',
                summary: 'Successfully!',
                detail: message
            })
        } catch (err) {
            // @ts-ignore
            showToastMessage({
                severity: 'error',
                summary: 'An error occurred!',
                detail: err.response.data.message,
                sticky: true
            })
        }


        // let formData = new FormData();
        // console.log('image file', imageFile);
        // formData.append('imageFile', imageFile ?? '', imageFile?.name);
        // await uploadCourseImage('newCourse.id', formData);

        if (updateCourse.id) {

        }
    }

    const inputValid = () => {
        console.log(validatePrice(updateCourse.price))
        return !validateName(updateCourse.name)
            && !validateHeadline(updateCourse.headline)
            && !validatePrice(updateCourse.price)
            && !validateDescription(updateCourse.description);
    }

    return (
        <div className={styles.scroller}>
            <div className={styles.courseBasicInfo}>
                <div className={styles.section1}>
                    <div>
                        <CommonInput name={'Title'} value={updateCourse.name} required
                                     containerClassName={styles.commonInputContainer}
                                     validate={courseValidator.validateName}
                                     onChange={e => setUpdateCourse({
                                         ...updateCourse,
                                         name: e.target.value
                                     })}/>
                        <CommonInput name={'Headline'} value={updateCourse.headline} required
                                     containerClassName={styles.commonInputContainer}
                                     validate={courseValidator.validateHeadline}
                                     onChange={e => setUpdateCourse({...updateCourse, headline: e.target.value})}
                        />
                        <CommonInput name={'Price'} value={updateCourse.price} type={'number'} required
                                     containerClassName={styles.commonInputContainer}
                                     validate={courseValidator.validatePrice}
                                     onChange={e => setUpdateCourse({...updateCourse, price: parseFloat(e.target.value)})}/>
                        <div>
                            <CommonSelect name={'Category'} items={categories.map(c => ({label: c.name, value: c.id}))}
                                          containerClassName={styles.commonInputContainer}
                                          required
                                          placeholder={'Category'}
                                          value={updateCourse.categoryId}
                                          onChange={e => setUpdateCourse({
                                              ...updateCourse,
                                              categoryId: e.target.value
                                          })}
                            />
                            <CommonSelect name={'Sub category'} placeholder={'Sub category'}
                                          containerClassName={styles.commonInputContainer}
                                          items={categoriesLevel2}
                                          value={updateCourse.subCategoryId}
                                          onChange={e => setUpdateCourse({
                                              ...updateCourse,
                                              subCategoryId: e.target.value
                                          })}/>
                        </div>
                    </div>
                    <div className={styles.imageUploadContainer}>
                        <label>Cover photo</label>
                        <ImageUpload title={'Image'} imageUrl={course.image}
                                     onChange={f => setImageFile(f)}/>
                    </div>
                </div>
                <div className={styles.quillContainer}>
                    <label className={'required'}>Description</label>
                    <ReactQuill theme="snow" value={updateCourse.description}
                                onChange={value => setUpdateCourse({...updateCourse, description: value})}/>
                </div>
                <div className={styles.buttonContainer}>
                    <Button style={{backgroundColor: '#B1127E', borderColor: '#B1127E'}}
                            disabled={!inputValid()}
                            className={'p-button-success'} label={updateCourse.id ? 'Save' : 'Create'}
                            onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}


export default BasicCourseInfoComponent;