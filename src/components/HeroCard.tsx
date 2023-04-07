import { Hero } from "../types";
import { Link, useNavigate, useLocation } from "react-router-dom";

function HeroCard({ hero }: { hero: Hero }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentID =
    location.pathname
      .split("/")
      .filter((e) => !!e)
      .at(-1) ?? "0";

  return (
    <article className={currentID === hero.id ? "active" : ""}>
      <div
        className="img-wrapper"
        onClick={() => navigate(`profile/${hero.id}`)}
      >
        <img src={hero.image} alt={hero.name} loading="lazy" />
      </div>
      <h2>
        <Link to={`profile/${hero.id}`}>{hero.name}</Link>
      </h2>
    </article>
  );
}

export default HeroCard;
