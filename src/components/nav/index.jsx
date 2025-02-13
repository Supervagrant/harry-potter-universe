import { Link } from "react-router-dom";
import "./style.css";
const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/characters">All characters</Link>
        </li>
        <li>
          <Link to="/students">Hogwarts students</Link>
        </li>
        <li>
          <Link to="/staff">Hogwarts staff</Link>
        </li>
        <li>
          <Link to="/spells">Spells</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
