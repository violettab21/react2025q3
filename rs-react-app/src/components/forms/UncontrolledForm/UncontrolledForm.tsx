import { CountriesUncontrolled } from '../../Countries/CountriesUncontrolled';
import '../form.css';
import { useUncontrolledForm } from './useUncontrolledForm';

export const UncontrolledForm = ({ onClose }: { onClose: () => void }) => {
  const {
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
  } = useUncontrolledForm(onClose);

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
            {errors.country && <p className="error-text">{errors.country}</p>}
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
              type="text"
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
