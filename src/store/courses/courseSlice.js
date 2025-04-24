import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null, // 'basic' or 'pro'
  unlockedCourses: [], // array of course IDs
  maxCourses: 0,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSubscriptionPlan: (state, action) => {
      const plan = action.payload;
      state.plan = plan;
      state.maxCourses = plan === "pro" ? 4 : 2;
      state.unlockedCourses = []; // reset when plaCourseSlicen changes
    },

    unlockCourse: (state, action) => {
      const courseId = action.payload;
      const alreadyUnlocked = state.unlockedCourses.includes(courseId);

      if (!alreadyUnlocked && state.unlockedCourses.length < state.maxCourses) {
        state.unlockedCourses.push(courseId);
      }
    },

    removeUnlockedCourse: (state, action) => {
      const courseId = action.payload;
      state.unlockedCourses = state.unlockedCourses.filter(id => id !== courseId);
    },

    resetCourses: (state) => {
      state.unlockedCourses = [];
    },
  },
});

export const {
  setSubscriptionPlan,
  unlockCourse,
  removeUnlockedCourse,
  resetCourses,
} = courseSlice.actions;

export default courseSlice.reducer;
