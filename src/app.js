import React, {Suspense} from "react";
import { Switch, Route } from "react-router";
import { useSelector } from "react-redux"
import "antd/dist/antd.css";

import LayoutModel from "./HOC/Layout/Layout";

const Form = React.lazy(() => import(`./Pages/Form`));
// const PostGlVoucher = React.lazy(() => import(`./Modules/Accounts/Forms/${val}`));
// const PostGlVoucher = React.lazy(() => import(`./Modules/Accounts/Forms/${val}`));
// const PostGlVoucher = React.lazy(() => import(`./Modules/Accounts/Forms/${val}`));


const App = () => {
  const route = useSelector ( state => state.menu.route )
  return (
    <LayoutModel>
      <Suspense fallback={<p>Loading.......</p>}>
      <Switch>
        <Route path={`/${route.path}`} exact  render={(props) => <Form {...props}/>}/>
      </Switch>
      </Suspense>
    </LayoutModel>
  );
};
export default App;