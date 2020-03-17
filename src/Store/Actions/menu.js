import {
  INITIATE_FETCH_MODULES_MENU,
  FETCH_MODULES_MENU,
  MENU_PATH_SELECTION,
  ROUTE_FINDING
} from "./actionTypes";

export const fetchModulesMenu = () => ({
  type: INITIATE_FETCH_MODULES_MENU
});

export const storeModulesMenu = (modulesMenu) => ({
  type: FETCH_MODULES_MENU,
  modulesMenu
});

export const menuPathSelection = (firstMenu, icon, secondMenu, thirdMenu) => ({
  type: MENU_PATH_SELECTION,
  firstMenu,
  icon,
  secondMenu,
  thirdMenu
});

export const routeFinding = (path, menuParams) => ({
  type: ROUTE_FINDING,
  path,
  menuParams
});

