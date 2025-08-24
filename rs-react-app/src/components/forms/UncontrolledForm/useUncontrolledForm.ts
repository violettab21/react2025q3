import { ValidationError } from 'yup';
import { useAppDispatch } from '../../../store/store';
import { addUserUncontrolled } from '../../../store/usersSlice';
import { schema } from '../validation';
import { useRef, useState } from 'react';
import { transferImageToBase64 } from '../utils';
interface CustomError {
  [key: string]: string;
}

export const useUncontrolledForm = (onClose: () => void) => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<CustomError>({});
  const dispatch = useAppDispatch();

  const prepareFormData = () => {
    const formData = {
      name: nameRef.current ? nameRef.current.value : '',
      age: ageRef.current ? Number(ageRef.current.value) : 0,
      email: emailRef.current ? emailRef.current.value : '',
      password: passwordRef.current ? passwordRef.current.value : '',
      repeatPassword: repeatPasswordRef.current
        ? repeatPasswordRef.current.value
        : '',
      gender: genderMaleRef.current?.checked
        ? 'male'
        : genderFemaleRef.current?.checked
          ? 'female'
          : '',
      country: countryRef.current ? countryRef.current.value : '',
      terms: termsRef.current ? termsRef.current.checked : false,
      image: imageRef.current && imageRef.current.files,
    };

    return formData;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = prepareFormData();
    try {
      await schema.validate(formData, { abortEarly: false });

      if (formData) {
        transferImageToBase64(formData.image as FileList, (result) => {
          dispatch(
            addUserUncontrolled({
              name: formData.name,
              email: formData.email,
              age: formData.age,
              terms: formData.terms,
              gender: formData.gender,
              password: formData.password,
              country: formData.country,
              repeatPassword: formData.repeatPassword,
              image: result,
            })
          );
        });
      }
      onClose();
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: CustomError = {};
        err.inner.map((errorField) => {
          if (errorField.path) {
            if (!errors[errorField.path])
              errors[errorField.path] = errorField.errors[0];
          }
        });
        setErrors(errors);
      }
    }
  };

  return {
    formRef,
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    repeatPasswordRef,
    genderMaleRef,
    genderFemaleRef,
    countryRef,
    termsRef,
    imageRef,
    errors,
    onSubmit,
  };
};
