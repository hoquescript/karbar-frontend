import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes'

import { fetchMenu } from '../menu';
import { fetchModulesMenu } from './menu'

import { fetchControl } from '../form'
import { fetchFormControls, viewReportData, postFormData } from '../Sagas/forms';

export function* watchMenu(){
    yield takeEvery(fetchMenu, fetchModulesMenu)
}

export function* watchControl(){
    yield takeEvery(fetchControl, fetchFormControls)
    // yield takeEvery(actionTypes.POST_FORM_DATA, postFormData)
    // yield takeEvery(actionTypes.VIEW_REPORT_DATA, viewReportData)
}