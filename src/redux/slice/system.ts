import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface SystemState {
  collapsed: boolean
}

const initialState: SystemState = {
  collapsed: false,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    switchCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload
    },
  },
})

export const { switchCollapsed } = systemSlice.actions

export const selectCollapsed = (state: RootState) => state.system.collapsed

export default systemSlice.reducer
