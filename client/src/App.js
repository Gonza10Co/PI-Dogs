import { Route, Switch } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import DogDetail from "./views/DogDetail";
import Dogs from "./views/Dogs";
import Home from "./views/Home";
import Form from "./views/Form";

export default function App() {
  return (
    <>
      <SearchBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dogs" component={Dogs} />
        <Route exact path="/dogs/create" component={Form} />
        <Route exact path="/dogs/:id" component={DogDetail} />
      </Switch>
    </>
  );
}
