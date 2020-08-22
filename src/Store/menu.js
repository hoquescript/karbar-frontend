import { createAction, createSlice } from '@reduxjs/toolkit'

export const fetchMenu = createAction('menu/fetchMenu');

const menu = createSlice({
    name: 'menu',
    initialState: {
        allMenu: {
            basic: {},
            master: {},
            module: {}
        },
        selectedMenu: {}
    },
    reducers: {
        storeMenu: (menu, action) => {
            menu.allMenu.basic = action.payload.basicMenu;
            menu.allMenu.master = action.payload.masterMenu;
            menu.allMenu.module = action.payload.moduleMenu;
        },
        selectMenu: (menu, action) => {
            menu.selectedMenu = action.payload.selectedMenu;
        }
    }
})


export default menu.reducer;
export const { storeMenu, selectMenu } = menu.actions;




// export default (state = initialState, action) => {
//     switch (action.type) {

//         case MENU_PATH_SELECTION:
//             return {
//                 ...state,
//                 menuPathways: {
//                     first: action.firstMenu,
//                     second: action.secondMenu,
//                     third: action.thirdMenu,
//                     icon: action.icon,
//                     menuButton: action.menuButton,
//                     tabButton: action.tabButton,
//                     tabParams: action.tabParams,
//                 }
//             };

//         case ROUTE_FINDING:
//             return {
//                 ...state,
//                 route: {
//                     path: action.path,
//                     menuParams: action.menuParams,
//                 }
//             };
//         case RESET_TAB_MENU_PROPERTY:
//             return {
//                 ...state,
//                 menuPathways: {
//                     ...state.menuPathways,
//                     menuButton: '',
//                     tabButton: [],
//                     tabParams: [],
//                 },
//             };
//         default:
//             return state;
//     }
// };

  
//   export const fetchModulesMenu = () => ({
//     type: INITIATE_FETCH_MODULES_MENU
//   });
  
//   export const storeBasicMenu = (basicMenu) => ({
//     type: FETCH_BASIC_MENU,
//     basicMenu
//   });
  
//   export const storeMasterMenu = (masterMenu) => ({
//     type: FETCH_MASTER_MENU,
//     masterMenu
//   });
  
//   export const storeModulesMenu = (modulesMenu) => ({
//     type: FETCH_MODULES_MENU,
//     modulesMenu
//   });
  
//   export const menuPathSelection = (firstMenu, icon, secondMenu, thirdMenu, menuButton, tabButton, tabParams) => ({
//     type: MENU_PATH_SELECTION,
//     firstMenu,
//     icon,
//     secondMenu,
//     thirdMenu,
//     menuButton,
//     tabButton,
//     tabParams
//   });
  
//   export const routeFinding = (path, menuParams,displayField) => ({
//     type: ROUTE_FINDING,
//     path,
//     menuParams,
//   });
  
//   export const resetTabMenuProperty = () => ({
//     type: RESET_TAB_MENU_PROPERTY
//   });
  

  