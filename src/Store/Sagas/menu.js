import axios from "axios";
import Dexie from "dexie";
import { put } from "redux-saga/effects";
import { storeMenu } from "../menu";

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

export function* fetchModulesMenu(action) {
    let basicMenu, masterMenu, moduleMenu;
    const menuData = yield axios.get("https://karbar.herokuapp.com/api/menu");
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
    yield put(storeMenu({basicMenu, masterMenu, moduleMenu}));
}
