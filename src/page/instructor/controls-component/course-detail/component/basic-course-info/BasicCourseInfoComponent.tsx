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
import {createCourse, getCourseImageApi, updateCourse as updateCourseApi, uploadCourseImageApi} from "../../../../../../service/course.service";
import Instructor from "../../../../../../model/Instructor";
import {useHistory, useParams} from 'react-router-dom';
import CommonSelectPrime from "../../../../../../component/common/CommonSelectPrime";

interface Props {
    instructor: Instructor
    course: Course
}

const BasicCourseInfoComponent: React.FC<Props> = ({course, instructor}) => {
    const params = useParams();
    const history = useHistory();
    const categories: Category[] = useSelector((state: RootState) => state.categories.list);
    const showToastMessage = useSelector((s: RootState) => s.home.showToastMessage)

    const [updateCourse, setUpdateCourse] = useState<Course>(course);
    const [imageFile, setImageFile] = useState<File>();
    const [categoriesLevel2, setCategoriesLevel2] = useState<{ value: any, label: any }[]>([])

    // useEffect(() => {
    //     if (params.id) {
    //
    //     }
    // }, [params])
    // filter categories and sub categories
    useEffect(() => {
        const selectedLeve1Cate = categories.find(c => c.id === updateCourse.categoryId);
        // @ts-ignore
        const level2Cates = selectedLeve1Cate?.subs.map(c => (
            {
                label: c.name,
                value: c.id
            }
        )) || []
        setCategoriesLevel2(level2Cates)
    }, [updateCourse.categoryId, updateCourse.subCategoryId])

    useEffect(() => {
        const filterCourse: Course = {
            ...course,
            name: course.name || '',
            description: course.description || '',
            headline: course.headline || '',
            price: course.price || 0
        }
        setUpdateCourse(filterCourse);
    }, [course])

    const handleSubmit = async () => {
        try {
            let message = '';
            const formData = new FormData();
            // @ts-ignore
            formData.append('image', imageFile);
            if (updateCourse.id) {
                const updatedCourse = await updateCourseApi(updateCourse);
                if (imageFile) {
                    await uploadCourseImageApi(updateCourse.id || '', formData)
                }
                message = 'Course is updated';
            } else {
                if (!imageFile) {
                    // @ts-ignore
                    showToastMessage({
                        severity: 'error',
                        summary: 'Failed!',
                        detail: "Cover photo not found!",
                        sticky: true
                    })
                    return;
                }
                updateCourse.instructorId = instructor?.id;
                const course = await createCourse(updateCourse);
                await uploadCourseImageApi(course.id || '', formData)
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

        if (updateCourse.id) {

        }
    }

    const inputValid = () => {
        return !validateName(updateCourse.name)
            && !validateHeadline(updateCourse.headline)
            && !validatePrice(updateCourse.price)
            && !validateDescription(updateCourse.description)
            && (imageFile || course.image);
    }

    return (
        <div className={styles.scroller}>
            <div className={styles.courseBasicInfo}>
                <div className={styles.section1}>
                    <div className={styles.info}>
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
                            <CommonSelectPrime name={'Category'} items={categories.map(c => ({label: c.name, value: c.id}))}
                                          containerClassName={styles.commonInputContainer}
                                          required
                                          placeholder={'Category'}
                                          value={updateCourse.categoryId}
                                          onChange={e => setUpdateCourse({
                                              ...updateCourse,
                                              categoryId: e.target.value
                                          })}
                            />
                            <CommonSelectPrime name={'Sub category'} placeholder={'Sub Category'}
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
                        <ImageUpload title={'Image'} imageUrl={updateCourse.image}
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
