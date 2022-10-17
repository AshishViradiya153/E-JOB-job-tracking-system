import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;
const ChartsContainer = () => {
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
