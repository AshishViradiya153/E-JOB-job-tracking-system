import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";
import ChartsContainer from "../../components/ChartsContainer";
import StatsContainer from "../../components/StatsContainer";
import Loading from "../../components/Loading";
const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);
  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
