import * as yup from 'yup';

export interface FormData {
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

export const schema = yup
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
      .required('Age is required')
      .positive('Age should be positive number')
      .integer('Age should be integer'),

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
          const isValidSize = value[0].size <= 5000000;
          return isValidSize;
        } else return true;
      }),
    terms: yup.boolean().required('Terms is required'),
  })
  .required();
