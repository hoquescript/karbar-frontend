import {
    FETCH_BASIC_MENU,
    FETCH_MASTER_MENU,
    FETCH_MODULES_MENU,
    MENU_PATH_SELECTION,
    ROUTE_FINDING,
    RESET_TAB_MENU_PROPERTY
} from "../Actions/actionTypes";

const initialState = {
    basicMenu: [],
    masterMenu: [], 
    modulesMenu: [],
    menuPathways: {
        first: "",
        second: "",
        third: "",
        icon: "",
        menuButton: "",
        tabButton: [],
        tabParams: [],
    },
    route: {
        path: "",
        menuParams: "",
        displayField: ""
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BASIC_MENU:
            return {
                ...state,
                basicMenu: action.basicMenu
            };
        case FETCH_MASTER_MENU:
            return {
                ...state,
                masterMenu: action.masterMenu
            };
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
                    third: action.thirdMenu,
                    icon: action.icon,
                    menuButton: action.menuButton,
                    tabButton: action.tabButton,
                    tabParams: action.tabParams,
                }
            };

        case ROUTE_FINDING:
            return {
                ...state,
                route: {
                    path: action.path,
                    menuParams: action.menuParams,
                }
            };
        case RESET_TAB_MENU_PROPERTY:
            return {
                ...state,
                menuPathways: {
                    ...state.menuPathways,
                    menuButton: '',
                    tabButton: [],
                    tabParams: [],
                },
            };
        default:
            return state;
    }
};
