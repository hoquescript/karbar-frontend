import Axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../Actions/forms";
import Dexie from "dexie";
import DateHelper from "../../Constants/DateHelper";

export function* fetchFormControls(action) {
    try {
        yield put(actions.fetchFormControl());        
        // console.log(dexieOpen)
        // Dexie.getDatabaseNames(database => {
        //     database.map(dbName => {
        //         const db = new Dexie(dbName).open();
        //         console.log(db)
        //         yield db.table('postData').toCollection().keys(async (keys) => {
        //             return await db.table('postData').bulkGet(keys);
        //         })   
        //     })
        // })
    //Checking if database exists or not
        let db;
        const isDbExist = yield Dexie.exists(action.menuParams);
        if(!isDbExist){
            //Creating a new store
            db = yield new Dexie(action.menuParams);
            db.version(1).stores({
                controls: "ControlIndex",
                getData: "MenuParams",
                postData: "id",
            });
            console.log('!isDbExist')
        }
        else if(isDbExist){
            //Opening the store to manipulate
            let controls;
            db = yield new Dexie(action.menuParams).open();
            yield db.table('controls').toCollection().keys(async (keys) => {
                controls = await db.table('controls').bulkGet(keys);
            })   
            yield put(actions.storeFormControl(controls)); 
        }

        //Fetching Data
        const { data } = yield Axios.get(`http://localhost:8080/api/form/${action.menuParams}`)
        yield put(actions.storeFormControl(data));
        yield db.table('controls').bulkPut(data,{allKeys: true});
    } catch (error) {
        console.log(error)
    }
}

export function* postFormData({ data, chipData, gridControlData }) {
    try {
        const formData = DateHelper(data);
        if('serviceWorker' in navigator && 'SyncManager' in window){
            navigator.serviceWorker.ready.then(async (sw) => {
                const db = await new Dexie('GLFree').open();
                await db.table('postData').put({
                    id: new Date().toISOString(),
                    data, chipData, gridControlData
                })
                sw.sync.register('postFormData');
            })
        }else {
            console.log(data, chipData, gridControlData)
            yield Axios.post(`http://localhost:8080/api/form`, {
                formData,
                chipData,
                gridControlData,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* viewReportData({ gridSQL, data, chipData }) {
    try {
        yield put(actions.initiateFetchReportData());
        const formData = DateHelper(data);
        console.log(formData);
        const reportData = yield Axios.post(`http://localhost:8080/report`, {
            gridSQL,
            formData,
            chipData,
        });
        yield put(actions.storeReportData(reportData.data));
    } catch (error) {
        console.log(error);
    }
}
