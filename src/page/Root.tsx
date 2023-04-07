import { Outlet } from "react-router-dom";
import { useGetHerosQuery } from "../redux/heroApi";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

function Root() {
  const { data, error, isLoading } = useGetHerosQuery();

  let headerComponent;

  if (isLoading)
    headerComponent = (
      <header>
        <div className="header-wrapper loading">
          <LoadingSpinner />
        </div>
      </header>
    );
  else if (error)
    headerComponent = (
      <header>
        <div className="header-wrapper error">{JSON.stringify(error)}</div>
      </header>
    );
  else headerComponent = <Header heros={data!} />;

  return (
    <>
      {headerComponent}
      <Outlet />
    </>
  );
}

export default Root;
