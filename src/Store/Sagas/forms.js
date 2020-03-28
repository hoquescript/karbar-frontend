import Axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actions from "../Actions/forms";
import DateHelper from '../../Constants/DateHelper'

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

export function* postFormData({data, chipData, gridControlData}){
    try {
        const formData = DateHelper(data)
        const reportData = yield Axios.post(`http://localhost:8080/form-post`,{formData, chipData, gridControlData});

        console.log(reportData)
    } catch (error) {
        console.log(error)
    }
}

export function* viewReportData({gridSQL, data, chipData}){
    try {
        yield put(actions.initiateFetchReportData())
        const formData = DateHelper(data)
        console.log(formData)
        const reportData = yield Axios.post(`http://localhost:8080/report`,{gridSQL, formData, chipData});

        yield put(actions.storeReportData(reportData.data))

    } catch (error) {
        console.log(error)
    }
}

