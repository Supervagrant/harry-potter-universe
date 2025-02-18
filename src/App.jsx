import Navigation from "./components/nav";
import Main from "./components/main";
import CharactersComponent from "./components/characters-component";
import StudentsComponent from "./components/students-component";
import Staff from "./components/staff";
import Spells from "./components/spells";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <div className="inner">
            <header>
              <h1>Harry Potter Universe</h1>
              <Navigation />
            </header>
            <Routes>
              <Route path="/harry-potter-universe/" element={<Main />} />
              <Route
                path="/characters"
                element={<CharactersComponent />}
              ></Route>
              <Route path="/students" element={<StudentsComponent />}></Route>
              <Route path="/staff" element={<Staff />}></Route>
              <Route path="/spells" element={<Spells />}></Route>
              <Route path="*" element={<div>Page not found</div>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
