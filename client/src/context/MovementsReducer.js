function MovementsReducer (state, actions)  {
    switch(actions.type){
        case 'GET_MOVEMENTS':
            return{
                ...state,
                loading: false,
                movements: actions.payload
            }
        case 'ADD_MOVEMENT':
            return{
                ...state,
                movements: [...state.movements,actions.payload]
            }
        case 'DELETE_MOVEMENT':
            return{
                ...state,
                movements: state.movements.filter((mov) => mov.id !== actions.payload)
            }
        case 'EDIT_MOVEMENT':
            return{
                ...state,
                movements: [state.movements.filter((mov) => mov.id !== actions.payload.id), actions.payload.newMovement]
            }
        case 'MOVEMENT_ERROR':
            return{
                ...state,
                error: actions.payload
            }
        default:
            return state;
    }
}

export default MovementsReducer;