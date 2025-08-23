import './controlledForm.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  name: string;
  email: string;
  age: number;
  password: string;
  repeatPassword: string;
  gender: string;
  country: string;
  image: FileList;
  terms: boolean;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z][a-z]*/, 'Name should start with capital letter')
      .matches(/^[A-Z][a-z]*$/, 'Only letters are allowed'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[\w-.]+@[\w]+\.\w+$/,
        'Email must correspond to email.example.com format'
      ),
    age: yup
      .number()
      .positive('Age should be positive number')
      .integer('Age should be integer')
      .required('Age is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[\W|_]/, 'Password must contain at least one special character')
      .min(10, 'Password must contain at least 10 characters'),
    repeatPassword: yup
      .string()
      .required('Repeat Password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
    country: yup.string().required('Country is required'),
    image: yup
      .mixed<FileList>()
      .required('Image is required')
      .test('format', 'Invalid Format, jpeg and png allowed', (value) => {
        if (value && value[0]) {
          const isValidFormat =
            value &&
            (value[0].type === 'image/png' || value[0].type === 'image/jpeg');
          return isValidFormat;
        } else return true;
      })
      .test('size', 'Invalid Size, max size is 5MB', (value) => {
        if (value && value[0]) {
          const isValidSize = value[0].size <= 5000;
          return isValidSize;
        } else return true;
      }),
    terms: yup.boolean().required('Terms is required'),
  })
  .required();

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
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
        <label>Country: </label>
        <select autoComplete="on" {...register('country')}>
          <option value="country1">Country1</option>
          <option value="country2">Country2</option>
        </select>
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
