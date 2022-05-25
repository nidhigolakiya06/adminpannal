import './App.css';
import MiniDrawer from './Componant/Layout';
import { Route,Switch } from 'react-router-dom';
import Medicine from './Container/Medicine';
import Doctor from './Container/Doctor';



function App() {
  return (
    <>
      <MiniDrawer>
      <Switch>
        <Route exact path='/Medicine' component={Medicine} />
        <Route exact path='/Doctor' component={Doctor}/>
      </Switch> 
      </MiniDrawer>
    </>
  );
}

export default App;
