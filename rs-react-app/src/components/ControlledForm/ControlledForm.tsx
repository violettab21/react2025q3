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
  image: string;
  terms: boolean;
}

const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z][a-z]*/, 'Name should start with capital letter')
      .matches(/^[A-Z][a-z]*$/, 'Only letters are allowed')
      .required('Name is required'),

    email: yup.string().required('Email is required'),
    age: yup
      .number()
      .positive('Age should be positive number')
      .integer('Age should be integer')
      .required('Age is required'),
    password: yup.string().required('Password is required'),
    repeatPassword: yup.string().required('Repeat Password'),
    gender: yup.string().required('Gender is required'),
    country: yup.string().required('Country is required'),
    image: yup.string().required('Image is required'),
    terms: yup.boolean().required('Terms is required'),
  })
  .required();

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <label>Choose an image </label> <input type="file"></input>
        {errors.image && <p className="error-text">{errors.image.message}</p>}
        <label>
          I accept Terms and Conditions agreement <input type="checkbox" />
        </label>
        {errors.terms && <p className="error-text">{errors.terms.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
