import { Hero } from "../types";
import {useNavigate, useLocation} from "react-router-dom";
import HeroCard from "./HeroCard";

function Header({ heros }: { heros: Hero[] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentID =
    location.pathname
      .split("/")
      .filter((e) => !!e)
      .at(-1) ?? "0";

  return (
    <header>
      <div className="header-wrapper">
        {heros.map((hero) => (
          <HeroCard 
             key={hero.id} 
             hero={hero}
             isActive={currentID === hero.id}
             handleNavigate={() => navigate(`profile/${hero.id}`)}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;
