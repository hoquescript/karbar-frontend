import Axios from "axios";
import { put } from "redux-saga/effects";
import * as actions from "../Actions/forms";

import { storeControl, resetFormState } from '../form'
import Dexie from "dexie";
import DateHelper from "../../Constants/DateHelper";

export function* fetchFormControls(action) {
    let { menuParams, tabParams } = action.payload;
    console.log(menuParams)
    try {
        yield put(resetFormState());        
        tabParams = `', '${tabParams.join("', '")}`
        const records = yield Axios.post(`https://karbar.herokuapp.com/api/form/${menuParams}/`, {
            // menuParams, //! Have to upgrade it later
            tabParams
        })
        yield put(storeControl({controls: records.data}));
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
