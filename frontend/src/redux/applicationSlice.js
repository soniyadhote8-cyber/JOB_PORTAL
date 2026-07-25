import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice ({
    name: "application",
    initialState:{
        applicants:null,
    },
    reducers: {
        setSingleApplication : (state, action) => {
            state.singleApplication = action.payload;
        },
        setAllApplicants : (state, action) => {
            state.applicants = action.payload;
        },
    },
});

export const { setSingleApplication, setAllApplicants } = applicationSlice.actions;

export default applicationSlice.reducer;

export const applicationSliceReducer = applicationSlice.reducer;