import { Hero } from "../types";
import HeroCard from "./HeroCard";

function Header({ heros }: { heros: Hero[] }) {
  return (
    <header>
      <div className="header-wrapper">
        {heros.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </header>
  );
}

export default Header;
