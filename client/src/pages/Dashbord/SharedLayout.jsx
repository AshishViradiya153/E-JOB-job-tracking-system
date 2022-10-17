import styled from "styled-components";

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SmallSidebar from "../../components/SmallSidebar";
import BigSidebar from "../../components/BigSidebar";
import { useState } from "react";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar
          setIsSidebarOpen={setIsSidebarOpen}
          toggle={toggle}
          isSidebarOpen={isSidebarOpen}
        />
        <BigSidebar isSidebarOpen={isSidebarOpen} />
        <div>
          <Navbar setIsSidebarOpen={setIsSidebarOpen} toggle={toggle} />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
