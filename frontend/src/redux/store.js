import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  repairs: [],
  groupedRepairs: {},
  loading: false,
  alert: false,
  alertType: '',
  alertMessage: ''
};

export const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
        state.alert = true;
        state.alertType = 'success'
        state.alertMessage = 'Success'
      state.repairs = action.payload.repairs;
      state.groupedRepairs = action.payload.groupedRepairs;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.alert = true;
      state.alertType = 'error';
      state.alertMessage = action.payload;
      state.loading = false;
    },
    clearData(state) {
      state.repairs = [];
      state.groupedRepairs = {};
    },
    clearAlert(state) {
      state.alert = false;
      state.alertType = '';
      state.alertMessage = '';
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, clearData, clearAlert } = maintenanceSlice.actions;

// Create the Redux store
const store = configureStore({
  reducer: {
    maintenance: maintenanceSlice.reducer
  }
});

export default store;