import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { clearValues } from "../job/jobSlice";
import { cleareAllJobsState } from "../allJobs/allJobsSlice";
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

//Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

//Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

//Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token} `,
        },
      });
      console.log("updated data", data);
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

export const clearStoreThunk = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message));
      thunkAPI.dispatch(clearValues());
      thunkAPI.dispatch(cleareAllJobsState());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const initialState = {
  user: getUserToLocalStorage(),
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state, { payload }) {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    //registerUserExtraReduser
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      // state.user = user
      // addUserToLocalStorage(user)
      toast.success(`Hello There ${user.name}😀`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //loginUserExtraReduser
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back ${user.name}!!`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    //updateUserExtraReduser
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      console.log("🚀 ~ file: userSlice.js ~ line 117 ~ payload", payload);
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("User Updated!");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [clearStoreThunk.rejected]: () => {
      toast.error("there was an error...");
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
