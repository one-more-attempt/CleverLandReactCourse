import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { CharactersTable } from "../charactersTable/charactersTable";
import { Comics } from "../comics/comics";
import { PageNotFound } from "../pageNotFound/pageNotFound";
import decoration from "../../resources/img/vision.png";
import { marvelService } from "../../services/marvelService";
import { Skeleton } from "@mui/material";


const App = () => {
  const mainPage = (
    <>
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            {/* <CharactersTable /> */}
          </div>
        </main>
      </div>
    </>
  );

  const pageNotFound = <div>NOT FOUND</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={mainPage} />
        <Route path="/comics" element={<Comics />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
