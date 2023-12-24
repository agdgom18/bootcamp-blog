import { useState } from 'react';
import pick from '../../img/folder-add.svg';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import clsx from 'clsx';
import styles from './addBlog.module.scss';
import infoCircle from '../../img/info-circle.svg';
import { categoryOptions, categoryStyles } from '../../docs/data';

const addClassBasedOnError = (value, hasError) => {
  if (value.length === 0) {
    return styles.defaultColor;
  }
  return hasError ? styles.failed : styles.success;
};

const AddBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [authorErrorsState, setAuthorErrorsState] = useState({
    hasMinLettersError: true,
    hasCountOfWordError: true,
    hasGeLettersError: true,
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const {
    register,
    control,

    handleSubmit,
    formState: { errors, isValid },
    getFieldState,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      author: '',
      title: '',
      email: '',
      description: '',
      publicateDate: '',
    },
  });

  const onSubmitHandler = (data) => {
    console.log('submit', data);
  };

  return (
    <div className={styles.addBlog}>
      <h1 className={styles.title}>ბლოგის დამატება</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <div className={styles.customFileInput}>
          <div className={styles.container}>
            <img className={styles.img} src={pick} alt="fff" />
            <div>
              <span id={styles.customText}>{selectedFile ? selectedFile.name : 'ჩააგდეთ ფაილი აქ ან '}</span>
              <label htmlFor="real-file" id={styles.customButton}>
                აირჩიეთ ფაილი
              </label>
              <input {...register('file')} type="file" id={styles.realFile} style={{ display: 'none' }} onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div className={clsx(styles.field, styles.fieldGeneral)}>
          <div className={styles.authorField}>
            <label htmlFor="author">ავტორი *</label>
            <input
              {...register('author', {
                required: {
                  value: true,
                },
                validate: {
                  validateValue: (value) => {
                    const letters = /^[\u10D0-\u10FF]+$/;
                    setAuthorErrorsState({
                      hasMinLettersError: !(value.trim().length >= 4),
                      hasCountOfWordError: !(value.trim().split(' ').length >= 2),
                      hasGeLettersError: !letters.test(value.replace(/\s/g, '')),
                    });
                    return Object.values(authorErrorsState).every((value) => value === false);
                  },
                },
              })}
              className={clsx(getValues('author').length === 0 ? styles.input : errors.author ? styles.failedInput : styles.successInput)}
              type="text"
              placeholder="შეიყვანეთ ავტორი"
            />
            <ul className={styles.circleList}>
              <li className={addClassBasedOnError(getValues('author'), authorErrorsState.hasMinLettersError)}>მინიმუმ 4 სიმბოლო</li>
              <li className={addClassBasedOnError(getValues('author'), authorErrorsState.hasCountOfWordError)}>მინიმუმ ორი სიტყვა</li>
              <li className={addClassBasedOnError(getValues('author'), authorErrorsState.hasGeLettersError)}>მხოლოდ ქართული სიმბოლოები</li>
            </ul>
          </div>
          <div className={styles.headerField}>
            <label htmlFor="header">სათაური *</label>
            <input
              {...register('title', {
                required: {
                  value: true,
                  message: 'Title is required',
                },
                validate: {
                  minLength: (value) => value.trim().length >= 2,
                },
              })}
              className={clsx(getValues('title').length === 0 ? styles.input : errors.title ? styles.failedInput : styles.successInput)}
              id="header"
              type="text"
              placeholder="შეიყვანეთ სათაური"
            />
            <p className={addClassBasedOnError(getValues('title'), errors.title)}>მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>
        <div className={clsx(styles.field, styles.fieldDescription)}>
          <label>აღწერა *</label>
          <textarea
            {...register('description', {
              required: {
                value: true,
                message: 'Description is required',
              },
              validate: {
                minLength: (value) => value.trim().length >= 2,
              },
            })}
            placeholder={'შეიყვნანეთ აღწერა'}
            className={clsx(getValues('description').length === 0 ? styles.input : errors.description ? styles.failedInput : styles.successInput)}
            cols="40"
            id="textArea"
            rows="10"></textarea>
          <p className={addClassBasedOnError(getValues('description'), errors.description)}>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className={clsx(styles.field, styles.fieldDate)}>
          <div className={styles.dateContainer}>
            <label htmlFor="date">გამოქვეყნების თარიღი *</label>
            <input
              {...register('publicateDate', {
                required: 'აირჩიე თარიღი',
              })}
              type="date"
              className={clsx(
                getValues('publicateDate').length === 0 ? styles.input : errors.publicateDate ? styles.failedInput : styles.successInput,
              )}
            />
          </div>
          <div className={styles.categoryContainer}>
            <label htmlFor="country-select">კატეგორია *</label>
            <Controller
              control={control}
              name="category"
              rules={{
                required: {
                  value: true,
                  message: 'აირჩიე კატეგორია',
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    placeholder={'შეიყვანეთ კატეგორია'}
                    onChange={(newValue) => onChange(newValue)}
                    value={value}
                    styles={categoryStyles}
                    options={categoryOptions}
                    isMulti
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  <p className={styles.emailDesc}>{error?.message}</p>
                </>
              )}
            />
          </div>
        </div>
        <div className={clsx(styles.field, styles.emailField)}>
          <label htmlFor="email">ელ-ფოსტა</label>
          <input
            {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'არასწორი მეილი',
              },
              required: {
                value: true,
                message: 'შეიყვანეთ მეილი',
              },
              validate: {
                emailEnd: (fieldValue) => {
                  return fieldValue.endsWith('@redberry.ge') || 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით';
                },
              },
            })}
            placeholder="Example@redberry.ge"
            type="email"
            className={clsx(getValues('email').length === 0 ? styles.input : errors.email ? styles.failedInput : styles.successInput)}
            id={styles.email}
          />
          {errors?.email && (
            <div className={styles.errorText}>
              <div className={styles.emailContainer}>
                <img src={infoCircle} alt="info" />
                <p className={styles.emailDesc}>{errors.email?.message}</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button className={clsx(styles.button, isValid ? styles.buttonSuccess : '')}>გამოქვეყნება</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
