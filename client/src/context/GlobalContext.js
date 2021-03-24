import React, {createContext, useReducer} from 'react';
import MovementsReducer from './MovementsReducer';

import axios from 'axios';

const initialState = {
    movements: [],
    error: null,
    loading: true,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(MovementsReducer, initialState);

    //context actions
    async function getMovements(){
        try {
            const res = await axios.get('/api/movements');

            dispatch({
                type: 'GET_MOVEMENTS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'MOVEMENT_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addMovement(movement){
        try {
            const res = await axios.post('/api/movements', movement);

            dispatch({
                type: 'ADD_MOVEMENT',
                payload: res.data.data,
            })
        } catch (err) {
            dispatch({
                type: 'MOVEMENT_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteMovement(id){
        try {
            await axios.delete(`/api/movements/${id}`);
            dispatch({
                type: 'DELETE_MOVEMENT',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'MOVEMENT_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function editMovement(id, movement){
        try {
            const res = await axios.patch(`/api/movements/${id}`, movement);
            dispatch({
                type: 'EDIT_MOVEMENT',
                payload: {
                    id: id,
                    newMovement: res.data.newdata
                }
            }) 

        } catch (err) {
            dispatch({
                type: 'MOVEMENT_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return(
        <GlobalContext.Provider  value={{
            movements: state.movements,
            error: state.error,
            loading: state.loading,
            getMovements,
            addMovement,
            deleteMovement,
            editMovement
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
