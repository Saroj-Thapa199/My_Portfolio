import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
   name: "softwareApplications",
   initialState: {
      softwareApplications: [],
      loading: false,
      error: null,
      message: null,
   },
   reducers: {
      getAllApplicationsRequest(state, action) {
         state.softwareApplications = [];
         state.loading = true;
         state.error = null;
      },
      getAllApplicationsSuccess(state, action) {
         state.softwareApplications = action.payload;
         state.loading = false;
         state.error = null;
      },
      getAllApplicationsFailed(state, action) {
         state.softwareApplications = state.softwareApplications;
         state.loading = false;
         state.error = action.payload;
      },
      addNewApplicationRequest(state, action) {
         state.loading = true;
         state.error = null;
         state.message = null;
      },
      addNewApplicationSuccess(state, action) {
         state.loading = false;
         state.error = null;
         state.message = action.payload;
      },
      addNewApplicationFailed(state, action) {
         state.loading = false;
         state.error = action.payload;
         state.message = null;
      },
      deleteApplicationRequest(state, action) {
         state.loading = true;
         state.error = null;
         state.message = null;
      },
      deleteApplicationSuccess(state, action) {
         state.loading = false;
         state.error = null;
         state.message = action.payload;
      },
      deleteApplicationFailed(state, action) {
         state.loading = false;
         state.error = action.payload;
         state.message = null;
      },
      resetApplicationSlice(state, action) {
         state.error = null;
         state.loading = false;
         state.message = null;
         state.softwareApplications = state.softwareApplications;
      },
      clearAllErrors(state, action) {
         state.error = null;
         state.softwareApplications = state.softwareApplications;
      },
   },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
   dispatch(softwareApplicationSlice.actions.getAllApplicationsRequest());
   try {
      const { data } = await axios.get(
         "https://my-portfolio-backend-79fy.onrender.com/api/v1/software-application/get-all",
         { withCredentials: true }
      );
      dispatch(
         softwareApplicationSlice.actions.getAllApplicationsSuccess(data.softwareApplications)
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
   } catch (error) {
      console.log(error);
      dispatch(
         softwareApplicationSlice.actions.getAllApplicationsFailed(
            error.response.data.message
         )
      );
   }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
   dispatch(softwareApplicationSlice.actions.addNewApplicationRequest());
   try {
      const response = await axios.post(
         "https://my-portfolio-backend-79fy.onrender.com/api/v1/software-application/add",
         data,
         {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
         }
      );
      dispatch(
         softwareApplicationSlice.actions.addNewApplicationSuccess(
            response.data.message
         )
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
   } catch (error) {
      console.log(error);
      dispatch(
         softwareApplicationSlice.actions.addNewApplicationFailed(
            error.response.data.message
         )
      );
   }
};

export const deleteSoftwareApplication = (skillId) => async (dispatch) => {
   dispatch(softwareApplicationSlice.actions.deleteApplicationRequest());
   try {
      const { data } = await axios.delete(
         `https://my-portfolio-backend-79fy.onrender.com/api/v1/software-application/delete/${skillId}`,
         { withCredentials: true }
      );
      dispatch(
         softwareApplicationSlice.actions.deleteApplicationSuccess(data.message)
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
   } catch (error) {
      console.log(error);
      dispatch(
         softwareApplicationSlice.actions.deleteApplicationFailed(
            error.response.data.message
         )
      );
   }
};

export const clearAllSoftwareApplicationSliceErrors = () => (dispatch) => {
   dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
   dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;
