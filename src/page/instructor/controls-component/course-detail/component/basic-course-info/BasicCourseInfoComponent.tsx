import React, {useState} from 'react'
import CommonInput from "../../../../../../component/common/CommonInput";
import courseValidator from "../../../../../../validator/course.validator";
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
import {createCourse} from "../../../../../../service/course.service";
import Instructor from "../../../../../../model/Instructor";

interface Props {
    instructor: Instructor | null,
    course: Course
}

const BasicCourseInfoComponent: React.FC<Props> = ({course, instructor}) => {
    const categories: Category[] = useSelector((state: RootState) => state.categories.list);
    const [level1SelectedCateId, setLevel1SelectedCateId] = useState('');
    const [updateCourse, setUpdateCourse] = useState<Course>(course);
    const [imageFile, setImageFile] = useState<File>();
    const handleSubmit = async () => {
        try {
            console.log('submit create course')
            const course = await createCourse(updateCourse);
        } catch (err) {
            console.log(err.response.data);
        }

        // let formData = new FormData();
        // console.log('image file', imageFile);
        // formData.append('imageFile', imageFile ?? '', imageFile?.name);
        // await uploadCourseImage('newCourse.id', formData);

        if (updateCourse.id) {

        }
    }

    return (
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
                                 onChange={e => setUpdateCourse({...updateCourse, headline: e.target.value})}/>
                    <CommonInput name={'Price'} value={updateCourse.price} type={'number'} required
                                 containerClassName={styles.commonInputContainer}
                                 validate={courseValidator.validatePrice}
                                 onChange={e => setUpdateCourse({...updateCourse, price: parseFloat(e.target.value)})}/>
                    <div>
                        <CommonSelect name={'Category'} items={categories.map(c => ({label: c.name, value: c.id}))}
                                      containerClassName={styles.commonInputContainer}
                                      required
                                      placeholder={'Category'}
                                      value={level1SelectedCateId}
                                      onChange={e => setLevel1SelectedCateId(e.target.value)}/>
                        <CommonSelect name={'Sub category'} placeholder={'Sub category'}
                                      containerClassName={styles.commonInputContainer}
                                      items={
                                          categories.find(c => c.id === level1SelectedCateId)?.subs.map(c => ({
                                              label: c.name, value: c.id
                                          })) || []}

                                      value={updateCourse.categoryId}
                                      onChange={e => setUpdateCourse({...updateCourse, categoryId: e.target.value})}/>
                    </div>
                </div>
                <div className={styles.imageUploadContainer}>
                    <ImageUpload title={'Image'}
                                 onChange={f => setImageFile(f)}/>
                </div>
            </div>
            <div className={styles.quillContainer}>
                <label className={'required'}>Description</label>
                <ReactQuill theme="snow" value={updateCourse.description}
                            onChange={value => setUpdateCourse({...updateCourse, description: value})}/>
            </div>
            <div className={styles.buttonContainer}>
                <Button style={{float: 'right', backgroundColor: '#B1127E', borderColor: '#B1127E'}}
                        className={'p-button-success'} label={updateCourse.id ? 'Save' : 'Create'}
                        onClick={handleSubmit}
                />
            </div>
        </div>
    );
}


export default BasicCourseInfoComponent;