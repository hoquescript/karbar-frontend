import React, {Suspense} from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux"
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from './Constants/Theme';
import "antd/dist/antd.css";
import "./index.css"

import Layout from "./Components/Layout/Layout";

const Home = React.lazy(() => import(`./Pages/Home`));
const Form = React.lazy(() => import(`./Pages/Form`));

const App = () => {
  const path = useSelector ( state => state.menu.route.path )
  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout>
        <Suspense fallback={<p>Loading.......</p>}>
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props}/>}/>
            <Route path={`/${path}`} exact render={(props) => <Form {...props}/>}/>
          </Switch>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
};
export default App;