import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/userSlice";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const resp = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 500) {
        return;
      }
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...👋");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const { data } = await customFetch.get("/jobs/stats", {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      return data;
    } catch (error) {
      if (error.response.status === 500) {
        return thunkAPI.rejectWithValue("Something Went Wrong!!");
      }
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...👋");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    cleareAllJobsState: () => initialState,
  },
  extraReducers: {
    //getALLJobs
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      const { jobs, totalJobs, numOfPages } = payload;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
      state.isLoading = false;
      state.jobs = jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //ShowState
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      const { defaultStats, monthlyApplication } = payload;
      state.isLoading = false;
      state.stats = defaultStats;
      state.monthlyApplications = monthlyApplication;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default allJobsSlice.reducer;
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  cleareAllJobsState,
} = allJobsSlice.actions;
