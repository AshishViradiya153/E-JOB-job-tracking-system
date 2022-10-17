import main from "../assets/images/main.svg";
import styled from "styled-components";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Wrapper = styled.main`
  background-color: white;
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    .logo {
      /* margin: 65px; */
      width: 261px;
      height: 163px;
    }
  }
  .page {
    /* min-height: calc(100vh - var(--nav-height)); */
    min-height: 95vh;
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

const landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> App
          </h1>
          <p>
            The turtel on the beach is a week and heavy creature, <br />
            but in the water(ocean) it is like a FLYING BIRD...
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="main jobster hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default landing;
