import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [], // This will hold the job details when a user clicks on a job
  singleJob: null, // This will hold
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery:"",
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload; // update state with fetched jobs
    },
    setSingleJob(state, action) {
      state.singleJob = action.payload; // update state with fetched job details
    },
    setAllAdminJobs(state, action) {
      state.allAdminJobs = action.payload; // update state with fetched admin jobs
    },
    setSearchJobByText(state, action) {
      state.searchJobByText = action.payload; // update state with fetched admin jobs
    },
    setAllAppliedJobs(state, action) {
      state.allAppliedJobs = action.payload; // update state with fetched admin jobs
    },
    setSearchedQuery(state,action){
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
} = jobSlice.actions;

export default jobSlice.reducer;
