import { Link } from "react-router-dom";
import { Hero } from "../types";

function HeroCard({
  hero,
  isActive,
  handleNavigate,
}: {
  hero: Hero;
  isActive: boolean;
  handleNavigate: () => void;
}) {
  return (
    <article className={isActive ? "active" : ""}>
      <div className="img-wrapper" onClick={handleNavigate}>
        <img src={hero.image} alt={hero.name} loading="lazy" />
      </div>
      <h2>
        <Link to={`profile/${hero.id}`}>{hero.name}</Link>
      </h2>
    </article>
  );
}

export default HeroCard;
