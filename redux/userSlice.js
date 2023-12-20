// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function for handling API requests
const handleApiRequest = async (url, userData, { rejectWithValue }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue({ message: "Request failed" });
  }
};

// Async Thunks for User Registration and Login
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue, dispatch }) => {
    const response = await handleApiRequest(
      "http://localhost:3000/api/auth/register",
      userData,
      { rejectWithValue }
    );

    // Assuming your server returns an object with token and user details
    if (response.token && response.user) {
      await AsyncStorage.setItem("token", response.token);
      dispatch(setToken(response.token));
      return response;
    } else {
      return rejectWithValue({ message: "Invalid response format" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, dispatch }) => {
    const response = await handleApiRequest(
      "http://localhost:3000/api/auth/login",
      userData,
      { rejectWithValue }
    );

    // Assuming your server returns an object with token and user details
    if (response.token && response.user) {
      await AsyncStorage.setItem("token", response.token);
      dispatch(setToken(response.token));
      return response;
    } else {
      return rejectWithValue({ message: "Invalid response format" });
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    error: null,
    token: null,
    userData: null,
  },
  reducers: {
    // Add any synchronous actions here if needed
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? action.payload.message
          : "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.message : "Login failed";
      });
  },
});

export const { setToken, setUserData } = userSlice.actions;

export default userSlice.reducer;
