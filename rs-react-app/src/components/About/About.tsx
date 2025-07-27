import './about.css';

export const About = () => {
  return (
    <div data-testid="about" className="aboutContainer">
      <p>Author: Violetta Batsura</p>
      <p>
        This is application that was developed in scope of React Course to
        master skills in React
      </p>
      <p>
        Course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React course
        </a>
      </p>
    </div>
  );
};
