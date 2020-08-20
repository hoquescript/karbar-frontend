import axios from "axios";
import Dexie from "dexie";
import { put } from "redux-saga/effects";
import * as actions from "../Actions/menu";

export function* fetchModulesMenu(action) {
    let basicMenu, masterMenu, modulesMenu;
    // try {
    //     const db = yield new Dexie("Menu").open();

    //     yield db.table('basicMenu').toCollection().keys(async (keys) => {
    //         basicMenu = await db.table('basicMenu').bulkGet(keys)
    //     })

    //     yield db.table('masterMenu').toCollection().keys(async (keys) => {
    //         masterMenu = await db.table('masterMenu').bulkGet(keys)
    //     })

    //     yield db.table('modulesMenu').toCollection().keys(async (keys) => {
    //         modulesMenu = await db.table('modulesMenu').bulkGet(keys)
    //     })
    // } 
    // catch (error) {
        const menu = yield axios.get("http://localhost:8080/api/menu");
        // console.log(menu)
        const record = menu.data;

        const db = yield new Dexie("Menu");
        db.version(1).stores({
            basicMenu: "MenuParams",
            masterMenu: "MenuParams",
            modulesMenu: "MenuParams",
        });

        //Formatting database into Modules
        const basic = [], master = [], modules = [];
        yield record.forEach((el) => {
            if (el.ACode.startsWith("01")) basic.push(el);
            if (el.ACode.length === 4 && el.ACode.startsWith("02"))
                master.push(el);
            if (el.ACode.length === 4 && el.ACode.startsWith("03"))
                modules.push(el);
        });

        basicMenu = yield genaralMenu(db.basicMenu, record, basic)
        masterMenu = yield genaralMenu(db.masterMenu, record, master)
        modulesMenu = yield moduleMenu(db.modulesMenu, record, modules);
    // }
    yield put(actions.storeBasicMenu(basicMenu));
    yield put(actions.storeMasterMenu(masterMenu));
    yield put(actions.storeModulesMenu(modulesMenu));
}

const genaralMenu = (collection, record, menuType) => {
    const data = menuType.map((menu) => {
        if (menu.ACode.length === 4) {
            const children = record.filter(
                (rec) =>
                    rec.ACode.startsWith(menu.ACode) &&
                    rec.ACode.length === 6
            );
            return { ...menu, children };
        }
        return null;
    })
    .filter((menu) => menu)
    collection.bulkPut(data,{allKeys: true});
    return data;
}

const moduleMenu = (collection, record, modules) => {
    const data = modules.map((menu) => {
        const reportExtension = `04${menu.ACode.slice(2, 4)}`;
        const formMenu = record.filter(
            (rec) =>
                rec.ACode.startsWith(menu.ACode) && rec.ACode.length === 6
        );
        const reportMenu = record.filter(
            (rec) =>
                rec.ACode.startsWith(reportExtension) &&
                rec.ACode.length === 6
        );
        return { ...menu, formMenu: formMenu, reportMenu: reportMenu };
    })
    collection.bulkPut(data,{allKeys: true});
    return data;
}