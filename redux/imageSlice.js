// // imageSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// // imageActions.js
// import { startUpload, uploadSuccess, uploadFailure } from "./imageSlice";

// export const predictImage = (imageFile) => async (dispatch) => {
//   try {
//     dispatch(startUpload());

//     const formData = new FormData();
//     formData.append("file", imageFile);

//     const response = await fetch("http://127.0.0.1:5000/predict", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Error calling API: ${response.status} ${response.statusText}`
//       );
//     }

//     const apiResponse = await response.json();
//     dispatch(uploadSuccess(apiResponse));
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     dispatch(uploadFailure(error.message || "An error occurred"));
//   }
// };

// export const imageSlice = createSlice({
//   name: "image",
//   initialState: {
//     prediction: null,
//     uploading: false,
//     error: null,
//   },
//   reducers: {
//     startUpload: (state) => {
//       state.uploading = true;
//       state.error = null;
//     },
//     uploadSuccess: (state, action) => {
//       state.uploading = false;
//       state.prediction = action.payload;
//       state.error = null;
//     },
//     uploadFailure: (state, action) => {
//       state.uploading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { startUpload, uploadSuccess, uploadFailure } = imageSlice.actions;

// export default imageSlice.reducer;
