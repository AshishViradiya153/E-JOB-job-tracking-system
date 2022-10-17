import styled from "styled-components";
import Logo from "./Logo";
import Navlink from "./Navlink";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
      color: var(--grey-900);
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--grey-900);
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`;

const BigSidebar = ({ isSidebarOpen }) => {
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlink />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
