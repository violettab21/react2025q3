import { useForm } from 'react-hook-form';
import { addUserControlled } from '../../../store/usersSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../../store/store';
import { schema } from '../validation';
import { type FormData } from '../validation';
import { transferImageToBase64 } from '../utils';

export const useControlledForm = (onClose: () => void) => {
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

    transferImageToBase64(image, (el) => {
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
          image: el,
        })
      );
    });
  };

  return { register, handleSubmit, setValue, watch, errors, isValid, onSubmit };
};
