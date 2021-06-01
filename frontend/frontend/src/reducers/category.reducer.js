const initState = {
    alert : "",
    categories : [],
    categoriesAsList : [],
}

const getAllCategoriesInAList = (allCategories) => {
    const categoryList = [];
    for (var i of allCategories) {
        categoryList.push(i);
        if(i.children.length > 0){
            categoryList.push(...getAllCategoriesInAList(i.children));
        }
    }
    return categoryList;
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case "got_all_categories":
            const categoriesAsList = getAllCategoriesInAList(action.payload.categories);
            state = {
                ...state,
                categories : action.payload.categories,
                categoriesAsList : categoriesAsList,
            }
            break;

        case "get_all_categories_failed":
            state.categories = null;
            state.alert = "Could not get the categories";
            break;

        case "Failed" :
            state.alert = "Failed to add a new category!"
            break;
    
        default:
            break;
    }
    return state
};

export default categoryReducer;