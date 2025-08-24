import { useRef, useState } from 'react';
import { schema } from '../validation';
import { ValidationError } from 'yup';
import { useAppDispatch } from '../../../store/store';
import { addUserUncontrolled } from '../../../store/usersSlice';
import { CountriesUncontrolled } from '../../Countries/CountriesIncontrolled';

interface CustomError {
  [key: string]: string;
}

export const UnconrolledForm = ({ onClose }: { onClose: () => void }) => {
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    try {
      await schema.validate(formData, { abortEarly: false });
      onClose();
      if (formData) {
        const imageBlob: File = (formData.image as FileList)[0] as File;
        let transformedImage: string;

        const reader = new FileReader();
        reader.onload = () => {
          transformedImage = reader.result as string;
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
              image: transformedImage,
            })
          );
        };
        reader.readAsDataURL(imageBlob);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: CustomError = {};
        err.inner.map((errorField) => {
          console.log(errorField);
          if (errorField.path) {
            if (!errors[errorField.path])
              errors[errorField.path] = errorField.errors[0];
          }
        });
        setErrors(errors);
        console.log(errors);
      }
    }
  };
  return (
    <div className="form-container">
      <form className="form" ref={formRef} onSubmit={onSubmit}>
        <div className="block-container">
          <div className="form-block">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              placeholder="Name"
              ref={nameRef}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
            <label htmlFor="age">Age: </label>
            <input
              id="age"
              className="input"
              type="number"
              name="age"
              placeholder="Age"
              ref={ageRef}
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
            <CountriesUncontrolled name="country" inputRef={countryRef} />
            <div>
              <p> Gender:</p>
              <input
                id="male"
                className="input-radio"
                type="radio"
                value="male"
                name="gender"
                ref={genderMaleRef}
              />
              <label htmlFor="male" className="label gender-label">
                Male
              </label>
              <input
                id="female"
                className="input-radio"
                type="radio"
                value="female"
                name="gender"
                ref={genderFemaleRef}
              />
              <label htmlFor="female" className="label gender-label">
                Female
              </label>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>
            <label htmlFor="file">Choose an image </label>{' '}
            <input id="file" type="file" name="image" ref={imageRef} />
            {errors.image && <p className="error-text">{errors.image}</p>}
          </div>

          <div className="form-block">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <label htmlFor="repeatPassword">Repeat Password: </label>
            <input
              id="repeatPassword"
              className="input"
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              ref={repeatPasswordRef}
            />
            {errors.repeatPassword && (
              <p className="error-text">{errors.repeatPassword}</p>
            )}
          </div>
        </div>
        <label>
          I accept Terms and Conditions agreement{' '}
          <input type="checkbox" name="terms" ref={termsRef} />
        </label>
        {errors.terms && <p className="error-text">{errors.terms}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
