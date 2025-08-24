import '../form.css';
import { CountriesControlled } from '../../Countries/CountriesControlled';
import { useControlledForm } from './useControlledForm';

export const ControlledForm = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit, setValue, watch, errors, isValid, onSubmit } =
    useControlledForm(onClose);

  return (
    <div className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <form className="form">
        <div className="block-container">
          <div className="form-block">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              className="input"
              type="text"
              {...register('name')}
              placeholder="Name"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
            <label htmlFor="age">Age: </label>
            <input
              id="age"
              className="input"
              type="number"
              {...register('age')}
              placeholder="Age"
            />
            {errors.age && <p className="error-text">{errors.age.message}</p>}
            <CountriesControlled
              register={register}
              setValue={setValue}
              watch={watch}
            />
            {errors.country && (
              <p className="error-text">{errors.country.message}</p>
            )}
            <div className="gender">
              <p> Gender:</p>
              <input
                id="male"
                className="input-radio"
                type="radio"
                value="male"
                {...register('gender')}
              />
              <label htmlFor="male" className="label gender-label">
                Male
              </label>
              <input
                id="female"
                className="input-radio"
                type="radio"
                value="female"
                {...register('gender')}
              />
              <label htmlFor="female" className="label gender-label">
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="error-text">{errors.gender.message}</p>
            )}
            <label htmlFor="file">Choose an image</label>{' '}
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              {...register('image')}
            />
            {errors.image && (
              <p className="error-text">{errors.image.message}</p>
            )}
          </div>
          <div className="form-block">
            {' '}
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              className="input"
              type="email"
              {...register('email')}
              placeholder="Email"
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              className="input"
              type="password"
              {...register('password')}
              placeholder="Password"
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
            <label htmlFor="repeatPassword">Repeat Password: </label>
            <input
              id="repeatPassword"
              className="input"
              type="password"
              {...register('repeatPassword')}
              placeholder="Repeat Password"
            />
            {errors.repeatPassword && (
              <p className="error-text">{errors.repeatPassword.message}</p>
            )}
          </div>
        </div>
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
