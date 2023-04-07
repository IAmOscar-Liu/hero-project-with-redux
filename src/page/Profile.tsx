import { useParams, Navigate } from "react-router-dom";
import { useGetHeroQuery } from "../redux/heroApi";
import HeroProfile from "../components/HeroProfile";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
  const { profileId } = useParams();
  const { data, isLoading, isFetching, error } = useGetHeroQuery(
    { id: +(profileId ?? 0) },
    { skip: !profileId }
  );

  if (!profileId) return <Navigate to="/profile" replace />;

  if (isLoading || isFetching)
    return (
      <main>
        <div className="main-wrapper loading">
          <LoadingSpinner />
        </div>
      </main>
    );
  else if (error)
    return (
      <main>
        <div className="main-wrapper error">{JSON.stringify(error)}</div>
      </main>
    );
  return <HeroProfile id={+profileId} profile={data!} />;
}

export default Profile;
