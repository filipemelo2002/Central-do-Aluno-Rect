import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from "./pages/Login";
import Main from "./pages/Main";
const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      Main
    },
    { unmountInactiveRoutes: true }
  )
);
export default Routes;
