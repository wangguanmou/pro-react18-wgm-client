import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserInfoState {
  userInfo: any
}

const initialState: UserInfoState = {
  userInfo: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
  },
})

export const { updateUserInfo } = userSlice.actions

export const selectUserInfo = (state: RootState) => state.user

export default userSlice.reducer
