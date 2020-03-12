import {
  FETCH_MODULES_MENU,
  MENU_PATH_SELECTION,
  ROUTE_FINDING
} from "../Actions/actionTypes";

const initialState = {
  modulesMenu: [],
  menuPathways: {
    first: "",
    second: "",
    third: ""
  },
  route: {
    path: "",
    menuParams: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULES_MENU:
      return {
        ...state,
        modulesMenu: action.modulesMenu
      };

    case MENU_PATH_SELECTION:
      return {
        ...state,
        menuPathways: {
          first: action.firstMenu,
          second: action.secondMenu,
          third: action.thirdMenu
        }
      };

    case ROUTE_FINDING:
      return {
        ...state,
        route: {
          path: action.path,
          menuParams: action.menuParams
        }
      };

    default:
      return state;
  }
};
