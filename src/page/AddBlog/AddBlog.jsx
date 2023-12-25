import { useState, useRef } from 'react';
import pick from '../../img/folder-add.svg';
import gallery from '../../img/gallery.svg';
import logo from '../../img/logo.svg';

import { useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';
import styles from './addBlog.module.scss';
import infoCircle from '../../img/info-circle.svg';
import { categoryStyles, fetchOptions } from '../../utils/fetchOpions';
import useFormPersist from 'react-hook-form-persist';
import cutLetter from '../../utils/cutAdditionalLetters';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

const addClassBasedOnError = (value, hasError) => {
  if (value.length === 0) {
    return styles.defaultColor;
  }
  return hasError ? styles.failed : styles.success;
};

const AddBlog = () => {
  const [authorErrorsState, setAuthorErrorsState] = useState({
    hasMinLettersError: false,
    hasCountOfWordError: false,
    hasGeLettersError: false,
  });

  const [selectedName, setSelectedName] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
    resetField,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      author: '',
      title: '',
      email: '',
      description: '',
      publicateDate: '',
      file: {},
      category: [],
    },
  });

  useFormPersist('storageKey', {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const onSubmitHandler = (data) => {
    console.log('submit', data);
  };

  const removeFile = () => {
    resetField('file');
    setSelectedName(null);
  };

  return (
    <div className={styles.addBlog}>
      <div className={styles.logoImgContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      <h1 className={styles.title}>ბლოგის დამატება</h1>
      <Link to={'/'} className="back-nav-button"></Link>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <div className={clsx(styles.parent, selectedName ? styles.uploadBlock : '')}>
          {!selectedName ? (
            <div className={styles.fileupload}>
              <img src={pick} alt="upload" />
              <p>
                ჩააგდეთ ფაილი აქ ან <span className={styles.pickFileButton}>აირჩიეთ ფაილი</span>
              </p>
              <Controller
                control={control}
                name="file"
                rules={{
                  required: {
                    value: true,
                    message: 'აირჩიე კატეგორია',
                  },
                  validate: {
                    checkOnEmpty: (value) => {
                      return value !== null;
                    },
                  },
                }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <input
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={({ target }) => {
                          setSelectedName(target.files[0].name);
                          onChange(target.files[0]);
                        }}
                        type="file"
                      />
                      <p>{errors?.file?.message}</p>
                    </>
                  );
                }}
              />
            </div>
          ) : (
            <div className={styles.uploadBlock}>
              <div className={styles.successUploadContainer}>
                <img className={styles.uploadGallery} src={gallery}></img>
                <h3 className={styles.successUploadTitle}> {cutLetter(selectedName)}</h3>
              </div>
              <div className="dflex align-center">
                <button onClick={removeFile} className={styles.successUploadButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.75781 16.2426L16.2431 7.75736" stroke="#1A1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.2431 16.2426L7.75781 7.75736" stroke="#1A1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
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
              className={getValues('author').length === 0 ? styles.input : errors.author ? styles.failedInput : styles.successInput}
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
              className={getValues('title').length === 0 ? styles.input : errors.title ? styles.failedInput : styles.successInput}
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
            <p className={styles.emailDesc}>{errors?.publicateDate?.message}</p>
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
                  <AsyncSelect
                    placeholder={'შეიყვანეთ კატეგორია'}
                    onChange={(newValue) => onChange(newValue)}
                    value={value}
                    styles={categoryStyles}
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={fetchOptions}
                    className={`react-select-container ${!!error ? 'notValid' : getValues('category').length ? 'valid' : ''}`}
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
