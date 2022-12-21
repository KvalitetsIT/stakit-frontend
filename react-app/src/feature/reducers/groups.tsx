import { createSlice } from "@reduxjs/toolkit"
import { mock } from "../../MockedData"
import { Group } from "../../models/types"

const state: {
    groups: Group[]
} = {
    groups: []
}

export const groupsSlice = createSlice({
    name: 'groups',
    initialState: state,
    reducers: {
        load: (state) => {
            console.log("LOADIng")
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.groups = mock.groups
        },

    },
})