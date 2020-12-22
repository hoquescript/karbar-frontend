import React, {Suspense} from "react";
import { Switch, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import lightTheme from './Constants/theme-light.js';
import darkTheme from './Constants/theme-dark.js';

import "antd/dist/antd.css";
import "./style.css"

import Layout from "./Components/Layout";

const Login = React.lazy(() => import(`./Pages/Login`));
const Home = React.lazy(() => import(`./Pages/Home`));
const Dashboard = React.lazy(() => import(`./Pages/Dashboard`));
const Form = React.lazy(() => import(`./Pages/Form`));
// const Mail = React.lazy(() => import(`./Pages/Settings/Mail`));

const App = () => {
  const path = useSelector( state => state.ui.urlPath);
  const darkMode = useSelector( state => state.ui.darkMode);
  const isLoggedIn = true;

  const selectedMenu =  useSelector( state => state.menu.selectedMenu);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline/>
      <Suspense fallback={<p>Loading.......</p>}>
        <Switch>
          <Route path={`/login`} exact render={(props) => <Login {...props}/>}/>
        </Switch>
      </Suspense>

      {isLoggedIn && (
        <Layout mode={darkMode}>
          <Suspense fallback={<p>Loading.......</p>}>
            <Switch>
              {/* <Route path="/mail" render={(props) => <Mail {...props}/>}/> */}


              {/* //* The following route is the actual route type. Commenting it for developement Purpose */}
              {/* //* When loading screen will be developed the following line will be uncommented, Page > Home also */}
              {/* <Route path={`/dashboard/:${path}`} exact render={(props) => <Dashboard {...props}/>}/> */}
              <Route path={`/dashboard`} exact render={(props) => <Dashboard {...props}/>}/>

              {/* Route for developement with all selected Menu info */}
              {process.env.REACT_APP_BASE_URL === "development" && (
                <Route 
                  path={`/:${path}/CCode=${selectedMenu.ClientCode}/MCode=${selectedMenu.ModuleCode}/ACode=${selectedMenu.ACode}/MenuParams=${selectedMenu.MenuParams}/MenuType=${selectedMenu.MenuType}`} 
                  exact 
                  render={(props) => <Form {...props}/>}
                />
              )}

              {/* Production Level URL/ Need to modify further like form/form_name or report/form_name */}
              {process.env.REACT_APP_BASE_URL === "production" && (
                <Route path={`/:${path}`} exact render={(props) => <Form {...props}/>}/>
              )}

              <Route path="/" exact render={(props) => <Home {...props}/>}/>
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Layout>
      )}
    </ThemeProvider>
  );
};
export default App;