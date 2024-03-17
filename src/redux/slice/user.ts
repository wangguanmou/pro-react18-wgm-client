import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserInfoState {
  token: string
  userInfo: {
    [key: string]: any
  }
}

const initialState: UserInfoState = {
  token: '',
  userInfo: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state = initialState
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    updateUserInfo: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.userInfo = action.payload
    },
  },
})

export const { resetUser, setToken, updateUserInfo } = userSlice.actions

export const selectToken = (state: RootState) => state.user.token
export const selectUserInfo = (state: RootState) => state.user.userInfo

export default userSlice.reducer
