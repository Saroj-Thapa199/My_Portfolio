import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        loading: false,
        messages: [],
        error: null,
        message: null
    },
    reducers: {
        getAllMessagesRequest(state, action) {
            state.messages = [];
            state.error = null
            state.loading = true
        },
        getAllMessagesSuccess(state, action) {
            state.messages = action.payload;
            state.error = null
            state.loading = false
        },
        getAllMessagesFailed(state, action) {
            state.messages = state.message;
            state.error = action.payload
            state.loading = false
        },
        deleteMessageRequest(state, action) {
            state.message = null;
            state.error = null
            state.loading = true
        },
        deleteMessageSuccess(state, action) {
            state.message = action.payload;
            state.error = null
            state.loading = false
        },
        deleteMessageFailed(state, action) {
            state.message = null;
            state.error = action.payload
            state.loading = false
        },
        resetMessageSlice(state, action) {
            state.error = null
            state.messages = state.messages
            state.message = null
            state.loading = false
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.messages = state.messages
        }
    }
})

export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequest())
    try {
        const {data} = await axios.get('https://my-portfolio-backend-79fy.onrender.com/api/v1/message/get-all', {withCredentials: true})
        dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages))
        dispatch(messageSlice.actions.clearAllErrors())
    } catch (error) {
        console.log(error)
        dispatch(messageSlice.actions.getAllMessagesFailed(error.response.data.message))
    }
}

export const deleteMessage = (messageId) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest())
    try {
        const {data} = await axios.delete(`https://my-portfolio-backend-79fy.onrender.com/api/v1/message/delete/${messageId}`, {withCredentials: true})
        dispatch(messageSlice.actions.deleteMessageSuccess(data.message))
        dispatch(messageSlice.actions.clearAllErrors())
    } catch (error) {
        console.log(error)
        dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message))
    }
}

export const clearAllMessagesErrors = () => (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors())
}

export const resetMessageSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice())
}

export default messageSlice.reducer