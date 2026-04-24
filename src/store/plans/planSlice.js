import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchBackendJson, getContentLoadErrorMessage } from "../../lib/api";
export const fetchPlans = createAsyncThunk(
  "plans/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchBackendJson("/getAllPlans");
      return Array.isArray(data?.plans) ? data.plans : [];
    } catch (error) {
      console.error("Error fetching plans:", error);
      return rejectWithValue(getContentLoadErrorMessage(error, "Failed to load plans"));
    }
  }
);

const initialState = {
  totalPlans: [],
  planId: null,
  plan: null,
  price: 0,
  billingCycle: '',
  loading: false,
  error: null
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setSubscriptionPlan: (state, action) => {
      const { planId, plan, price, billingCycle } = action.payload;
      state.planId = planId;
      state.plan = plan;
      state.price = price;
      state.billingCycle = ['monthly', 'annual'].includes(billingCycle) ? billingCycle : '';
    },
    resetSubscription: (state) => {
      state.plan = null;
      state.planId = null;
      state.price = 0;
      state.billingCycle = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPlans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSubscriptionPlan, resetSubscription } = planSlice.actions;
export default planSlice.reducer;
