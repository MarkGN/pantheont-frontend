import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LoadScreen from "./LoadScreen";
import NotFound from "./NotFound";
import Search from "./Search";

const CharacterSheet = lazy(() => import('./character-sheet/CharacterSheet'));

function App() {
  // It's a bit ugly enumerating routes like this. Refactor somehow?

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/boon" element={<Search contentType="boon" />} />
          <Route path="/item" element={<Search contentType="item" />} />
          <Route path="/plant" element={<Search contentType="plant" />} />
          <Route path="/spell" element={<Search contentType="spell" />} />
          <Route path="/tag" element={<Search contentType="tag" />} />
          <Route path="/character" element={<Suspense fallback={<LoadScreen/>}><CharacterSheet /></Suspense>} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

