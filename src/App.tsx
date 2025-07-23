import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { CharacterList } from "./Pages/CharacterList";
import { CharacterCard } from "./Pages/CharacterCard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CharacterList />} />
            <Route path="character/:id" element={<CharacterCard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;


