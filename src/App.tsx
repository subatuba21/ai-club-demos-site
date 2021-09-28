import "./App.css";
import Navbar from "./components/navbar";
import MiniHero from "./components/mini-hero";
import Showcase from "./components/showcase";
import { Route, Switch } from "react-router-dom";
import HandwritingDemo from "./components/handwritingdemo";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MiniHero></MiniHero>
          <Showcase></Showcase>
        </Route>
        <Route exact path="/demo/handwriting">
          <Navbar></Navbar>
          <HandwritingDemo></HandwritingDemo>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
