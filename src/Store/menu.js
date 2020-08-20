import { createAction, createSlice } from '@reduxjs/toolkit'
import {takeEvery} from 'redux-saga/effects';
import axios from "axios";
import { put } from "redux-saga/effects";


export const fetchMenu = createAction('fetchMenu');

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


const genaralMenu = (records, modules) => {
    const module = {};
    modules.forEach(menu => {
        const children = {}
        records.forEach(record => {
            if(record.ACode.startsWith(menu.ACode) && record.ACode.length === 6)
                children[`${record.MenuParams}`] = record;
        })
        module[`${menu.MenuParams}`] = { ...menu, children }
    })
    return module;
}

const modulesMenu = (records, modules) => {
    const module = {}
    modules.forEach((menu) => {
        const reportExtension = `04${menu.ACode.slice(2, 4)}`;
        const formMenu = {}, reportMenu = {};
        records.forEach(record => {
            if(record.ACode.startsWith(menu.ACode) && record.ACode.length === 6){
                formMenu[`${record.MenuParams}`] = record
            }
            else if(record.ACode.startsWith(reportExtension) && record.ACode.length === 6){
                reportMenu[`${record.MenuParams}`] = record
            }
        })
        module[`${menu.MenuParams}`] = { ...menu, formMenu: formMenu, reportMenu: reportMenu };
    })
    return module;
}

function* fetchModulesMenu(action) {
    let basicMenu, masterMenu, moduleMenu;
        const menuData = yield axios.get("http://localhost:8080/api/menu");
        const record = menuData.data;

        //Formatting database into Modules
        const basic = [], master = [], modules = [];
        record.forEach((el) => {
            if (el.ACode.length === 4 && el.ACode.startsWith("01")){
                basic.push(el);
            }   
            else if (el.ACode.length === 4 && el.ACode.startsWith("02")){
                master.push(el);
            }
            else if (el.ACode.length === 4 && el.ACode.startsWith("03")){
                modules.push(el);
            }
        });
        basicMenu = genaralMenu(record, basic)
        masterMenu = genaralMenu(record, master)
        moduleMenu = modulesMenu(record, modules);
        yield put(menu.actions.storeMenu({basicMenu, masterMenu, moduleMenu}));
}

export function* watchMenu(){
    yield takeEvery(fetchMenu, fetchModulesMenu)
}

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
  

  