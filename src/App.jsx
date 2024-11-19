import Main from "./components/main";
import Characters from "./components/characters";
import Students from "./components/students";
import Staff from "./components/staff";
import Spells from "./components/spells";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <h1>Harry Potter Universe</h1>
          <div className="inner">
            <nav className="main-nav">
              <p>What do you want to see?</p>
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
          </div>
          <Routes>
            <Route path="/harry-potter-universe/" element={<Main />} />
            <Route path="/characters" element={<Characters />}></Route>
            <Route path="/students" element={<Students />}></Route>
            <Route path="/staff" element={<Staff />}></Route>
            <Route path="/spells" element={<Spells />}></Route>
            <Route path="*" element={<div>Page not found</div>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
