import { Route, Switch } from 'react-router-dom';
import './App.css';
import DogDetail from './views/DogDetail';
import Dogs from './views/Dogs';
import Home from './views/Home';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/dogs' component={Dogs} />
      <Route exact path='/dogs/:id' component={DogDetail} />
      
    </Switch>
  );
}

