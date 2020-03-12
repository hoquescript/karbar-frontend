import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes'
import { fetchModulesMenu } from '../Sagas/menu';
import { fetchFormControls } from '../Sagas/forms';

export function* watchMenu(){
    yield takeEvery(actionTypes.INITIATE_FETCH_MODULES_MENU,fetchModulesMenu)
}

export function* watchControl(){
    yield takeEvery(actionTypes.INITIATE_FETCH_FORM_CONTROL,fetchFormControls)
}