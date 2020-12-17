import React from 'react';
import {Switch,Route,Link} from 'react-router-dom';
const NestedExample=()=>
<div>
<Link to="/nested-route/test">nested example</Link>
<Switch>
    <Route to="/nested-route">Nested Home</Route>
    <Route exact to="nested-route/test"><h3>nested example</h3></Route>
</Switch>
</div>

export default NestedExample