import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

type Breadcrumb = any[]
interface PermissionState {
  breadcrumb: Breadcrumb
}

const initialState: PermissionState = {
  breadcrumb: [],
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<Breadcrumb>) => {
      state.breadcrumb = action.payload
    },
  },
})

export const { setBreadcrumb } = permissionSlice.actions

export const selectBreadcrumb = (state: RootState) => state.permission.breadcrumb

export default permissionSlice.reducer
