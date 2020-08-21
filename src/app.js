import React, {Suspense} from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux"
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from './Constants/Theme';
import "antd/dist/antd.css";
import "./style.css"

import Layout from "./Pages/Layout";

const Home = React.lazy(() => import(`./Pages/Home`));
const Form = React.lazy(() => import(`./Pages/Form`));
const Mail = React.lazy(() => import(`./Pages/Settings/Mail`));

const App = () => {
  const path = useSelector( state => state.ui.urlPath)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout>
        <Suspense fallback={<p>Loading.......</p>}>
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props}/>}/>
            <Route path="/mail" exact render={(props) => <Mail {...props}/>}/>
            <Route path={`/${path}`} exact render={(props) => <Form {...props}/>}/>
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
};
export default App;