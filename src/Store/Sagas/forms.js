import Axios from 'axios';
import datefns from 'date-fns'
import { put } from 'redux-saga/effects'
import * as actions from "../Actions/forms";

export function* fetchFormControls(action){
    try {
        yield put(actions.fetchFormControl())

        const formData = yield Axios.get(`http://localhost:8080/control/${action.menuParams}`);
        const controls = formData.data;

        yield put(actions.storeFormControl(controls))
        
    } catch (error) {
        console.log(error)
    }
}

export function* viewReportData({gridSQL, data, chipData}){
    try {
        yield put(actions.initiateFetchReportData())
        for (const key in data) {
            if(Object.prototype.toString.call(data[key]) === '[object Date]'){
                const date = data[key];
                const day = date.getDate()
                const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                data[key] = `${day} ${month} ${year}`
            }
        }

        const reportData = yield Axios.post(`http://localhost:8080/report`,{gridSQL, data, chipData});

        yield put(actions.storeReportData(reportData.data))

    } catch (error) {
        console.log(error)
    }
}
