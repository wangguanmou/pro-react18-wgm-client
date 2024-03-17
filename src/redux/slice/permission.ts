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
    breadcrumbCreator: (state, action: PayloadAction<Breadcrumb>) => {
      state.breadcrumb = action.payload
    },
  },
})

export const { breadcrumbCreator } = permissionSlice.actions

export const selectBreadcrumb = (state: RootState) => state.permission.breadcrumb

export default permissionSlice.reducer
