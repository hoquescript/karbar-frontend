import React, {Suspense} from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux"
import "antd/dist/antd.css";

import Layout from "./Components/Layout/Layout";

const Home = React.lazy(() => import(`./Pages/Home`));
const Form = React.lazy(() => import(`./Pages/Form`));

const App = () => {
  const path = useSelector ( state => state.menu.route.path )
  return (
      <Layout>
        <Suspense fallback={<p>Loading.......</p>}>
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props}/>}/>
            <Route path={`/${path}`} exact render={(props) => <Form {...props}/>}/>
          </Switch>
        </Suspense>
      </Layout>
  );
};
export default App;