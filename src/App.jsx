import Navigation from "./components/nav";
import MainPage from "./pages/main-page";
import CharactersPage from "./pages/characters-page";
import StudentsPage from "./pages/students-page";
import StaffPage from "./pages/staff-page";
import SpellsPage from "./pages/spells-page";
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
              <Route path="/harry-potter-universe/" element={<MainPage />} />
              <Route path="/characters" element={<CharactersPage />}></Route>
              <Route path="/students" element={<StudentsPage />}></Route>
              <Route path="/staff" element={<StaffPage />}></Route>
              <Route path="/spells" element={<SpellsPage />}></Route>
              <Route path="*" element={<div>Page not found</div>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
