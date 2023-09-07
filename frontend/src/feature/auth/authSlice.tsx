import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteToken,
  getProfile,
  login,
  register,
  storeToken,
} from "./function";

type userType = {
  name: string;
  email: string;
};
type tokenType = {
  access: string;
  refresh: string;
};
export interface UserState {
  user: userType | null;
  profile: userType | null;
  token: tokenType | null;
  loading: boolean;
  error: null | any;
}

const initialState: UserState = {
  user: null,
  profile: null,
  token: null,
  loading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refreshSet: (state, action: PayloadAction<string>) => {
      if (state.token && action.payload) {
        state.token = {
          ...state.token,
          access: action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.token = {
        access: action.payload.accessToken,
        refresh: action.payload.refreshToken,
      };
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.profile = null;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { refreshSet } = counterSlice.actions;

export default counterSlice.reducer;
