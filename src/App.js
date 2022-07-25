import './App.css';
import MiniDrawer from './Componant/Layout';
import { Route, Switch } from 'react-router-dom';
import Medicine from './Container/Medicine';
import Doctor from './Container/Doctor';
import Patient from './Container/Patient';
import { configurestore } from './Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PromisesExample from './Container/Promises/PromisesExample';
import UseMemo_example from './Container/UseMemo/UseMemo_example';
import UseCallBack from './Container/UsecallBack/UseCallBack';
import Apps from './Container/UseContext/Apps';



function App() {
  const {store, persistor} = configurestore()

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MiniDrawer>
            <Switch>
              <Route exact path='/Medicine' component={Medicine} />
              <Route exact path='/Doctor' component={Doctor} />
              <Route exact path='/Patient' component={Patient} />
              <Route exact path='/promises_Example' component={PromisesExample} />
              <Route exact path='/UseMemo_Example' component={UseMemo_example} />
              <Route exact path='/UseCallBack_Example' component={UseCallBack} />
              <Route exact path='/Apps_Example' component={Apps} />
            </Switch>
          </MiniDrawer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
