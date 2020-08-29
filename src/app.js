import React, {Suspense} from "react";
import { Switch, Route, Redirect } from "react-router";
import { useSelector } from "react-redux"
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from './Constants/Theme';
import "antd/dist/antd.css";
import "./style.css"

import Layout from "./Components/Layout";

const Home = React.lazy(() => import(`./Pages/Home`));
const Dashboard = React.lazy(() => import(`./Pages/Dashboard`));
const Form = React.lazy(() => import(`./Pages/Form`));
const Mail = React.lazy(() => import(`./Pages/Settings/Mail`));

const App = () => {
  const path = useSelector( state => state.ui.urlPath)
  console.log(path)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout>
        <Suspense fallback={<p>Loading.......</p>}>
          <Switch>
            {/* <Route path="/mail" render={(props) => <Mail {...props}/>}/> */}
            <Route path={`/dashboard/:${path}`} exact render={(props) => <Dashboard {...props}/>}/>
            <Route path={`/:${path}`} exact render={(props) => <Form {...props}/>}/>
            <Route path="/" exact render={(props) => <Home {...props}/>}/>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
};
export default App;