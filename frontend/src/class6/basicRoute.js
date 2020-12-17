import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SimpleForm from '../class3/SimpleForms';
import FetchApiExample from '../class4';
import NestedRouteExample from './nestedRoute';
import Main from '../App';



export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/class3">Class3</Link>
            </li>
            <li>
              <Link to="/class4">Class4</Link>
            </li>
            <li>
              <Link to="/test">test route</Link>
            </li>
            <li>
              <Link to="/nested-route">nested route</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/class3">
            <SimpleForm />
          </Route>
          <Route path="/class4">
            <FetchApiExample />
          </Route>
          <Route path="/test">
            <h1>test route</h1>
          </Route>
          <Route path="/nested-route">
            <NestedRouteExample />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}