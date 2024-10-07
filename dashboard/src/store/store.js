import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotResetPassReducer from './slices/forgotResetPassword.js'
import messagesReducer from "./slices/messagesSlice.js";
import timelineReducer from "./slices/timelineSlice.js";
import skillReducer from "./slices/skillSlice.js";
import softwareApplicationReducer from "./slices/softwareApplicationSlice.js";
import projectReducer from "./slices/projectSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        messages: messagesReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        application: softwareApplicationReducer,
        project: projectReducer,
    }
})