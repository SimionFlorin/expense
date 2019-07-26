




export const addCategory=category=>({
    type:'ADD_CATEGORY',
    payload:category
})

export const addTransaction=(transaction,categoryTypeId)=>({
    type:'ADD_TRANSACTION',
    payload:transaction,
})

export const addCategoryType=(categoryType)=>({
    type:'ADD_CATEGORY_TYPE',
    payload:categoryType
})

export const updateCategoryType=(categoryType,typeId)=>({
    type:'UPDATE_CATEGORY_TYPE',
    payload:categoryType,
    typeId
})

export const deleteCategoryType=(typeId)=>({
    type:'DELETE_CATEGORY_TYPE',
    payload:typeId
})

