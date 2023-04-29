import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selecCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) =>  categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selecCategories],
    (categories) =>
    categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);


