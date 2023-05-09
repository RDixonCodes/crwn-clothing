import { takeLatest, all, call, put } from "redux-saga/effects";

import { createUserDocumentFromAuth, getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { signInFailed } from "../user/user.action";

import { fetchCategoriesSuccess, fetchCategoriesFailure } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        // put in a saga is equal to using dispatch in thunk
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {

        yield put(fetchCategoriesFailure(error))
        
    };
}

export function* onFetchCategories() {

    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])

}