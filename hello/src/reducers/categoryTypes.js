


const initialState = []

export default  (state = initialState, {type, payload}) => {
    switch (type) {

    case 'ADD_CATEGORY_TYPE':
        console.log(payload)
        return [
             ...state,
             payload 
            ]

    default:
        return state
    }
}


// export default (state=initialState,{ type , payload })=>{
//     switch(type){
//         case 'ADD_CATEGORY':
//             console.log(payload);
//             return [
//                 ...state,
//                 payload    
//             ];
//         default :
//             return state
//     }
// }


