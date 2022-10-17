import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../user/userSlice";
import { getUserToLocalStorage } from "../../utils/localStorage";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      console.log("add job data ", data);
      thunkAPI.dispatch(clearValues());
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...👋");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jodId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const { data } = await customFetch.delete(`/jobs/${jodId}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (payload, thunkAPI) => {
    const { editJobId, job } = payload;
    console.log(
      "🚀 ~ file: jobSlice.js ~ line 67 ~ editJobId, job",
      editJobId,
      job
    );
    try {
      const { data } = await customFetch.patch(`/jobs/${editJobId}`, job, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      thunkAPI.dispatch(clearValues());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    inputChangeHandle: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserToLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: {
    //   createJob
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //   deleteJob
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload.msg);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    //   editJob
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified...");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { inputChangeHandle, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
