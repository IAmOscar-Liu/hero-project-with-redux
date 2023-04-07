import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../types";

export interface SearchState {
  remainPower: number;
  power: Profile;
}

const initialState: SearchState = {
  remainPower: 0,
  power: {
    str: 0,
    int: 0,
    agi: 0,
    luk: 0
  }
};

const searchSlice = createSlice({
  name: "power",
  initialState,
  reducers: {
    setRemainPower: (state, action: PayloadAction<number>) => {
      state.remainPower = action.payload;
    },
    setPower: (state, action: PayloadAction<Partial<Profile>>) => {
      state.power = { ...state.power, ...action.payload };
    }
  }
});

export const { setRemainPower, setPower } = searchSlice.actions;

export default searchSlice.reducer;
