import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoNotFound from "../assets/images/not-found.svg";
// import Logo from "../components/Logo";
const Wrraper = styled.main`
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.4rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    font-size: larger;
  }
`;
const Error = () => {
  return (
    <Wrraper className="full-page">
      <div>
        <img src={LogoNotFound} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you are looking for...</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrraper>
  );
};

export default Error;
