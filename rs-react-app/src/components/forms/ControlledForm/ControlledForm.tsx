import './controlledForm.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CountriesControlled } from '../../Countries/CountriesControlled';
import { useAppDispatch } from '../../../store/store';

import { schema } from '../validation';
import { type FormData } from '../validation';
import { addUserControlled } from '../../../store/usersSlice';

export const ControlledForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    console.log(data);
    const {
      name,
      email,
      age,
      terms,
      gender,
      country,
      password,
      repeatPassword,
      image,
    } = data;
    onClose();
    const imageBlob = image[0];
    let transformedImage: string;

    const reader = new FileReader();
    reader.onload = () => {
      transformedImage = reader.result as string;
      dispatch(
        addUserControlled({
          name: name,
          email: email,
          age: age,
          terms: terms,
          gender: gender,
          password: password,
          country: country,
          repeatPassword: repeatPassword,
          image: transformedImage,
        })
      );
    };
    reader.readAsDataURL(imageBlob);
  };

  return (
    <div className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <form className="form">
        <label>Name: </label>
        <input type="text" {...register('name')} placeholder="Name" />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
        <label>Age: </label>
        <input type="number" {...register('age')} placeholder="Age" />
        {errors.age && <p className="error-text">{errors.age.message}</p>}
        <label>Email: </label>
        <input type="email" {...register('email')} placeholder="Email" />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        <label>Password: </label>
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
        <label>Repeat Password: </label>
        <input
          type="password"
          {...register('repeatPassword')}
          placeholder="Repeat Password"
        />
        {errors.repeatPassword && (
          <p className="error-text">{errors.repeatPassword.message}</p>
        )}
        <div>
          <p> Gender:</p>
          <input type="radio" value="male" {...register('gender')} />
          <label>Male</label>
          <input type="radio" value="female" {...register('gender')} />
          <label>Female</label>
        </div>
        {errors.gender && <p className="error-text">{errors.gender.message}</p>}
        <CountriesControlled
          register={register}
          setValue={setValue}
          watch={watch}
        />
        {errors.country && (
          <p className="error-text">{errors.country.message}</p>
        )}
        <label>Choose an image </label>{' '}
        <input type="file" {...register('image')} />
        {errors.image && <p className="error-text">{errors.image.message}</p>}
        <label>
          I accept Terms and Conditions agreement{' '}
          <input type="checkbox" {...register('terms')} />
        </label>
        {errors.terms && <p className="error-text">{errors.terms.message}</p>}
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
