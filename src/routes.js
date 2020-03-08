import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from "./pages/Login";
import Navigation from "./pages/Navigation";
const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Navigation
  })
);
export default Routes;
