import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CONTRACTS_URL = 'https://mocki.io/v1/9df61979-b2ee-4ab5-bf67-4d2607d43b47';

const initialState = {
    contracts: [],
    searchContracts: [],
    status: 'idle',
    error: null
}

export const fetchContracts = createAsyncThunk('contracts/fetchContracts', async () => {
    try {
        const response = await axios.get(CONTRACTS_URL)
        return response.data;
    } catch (err) {
        return err.message;
    }
})

const contractSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        contractsSearched: {
            reducer(state, action) {
                let str = String(action.payload)
                if (!action.payload) {
                    state.searchContracts = state.contracts
                }
                else if (str.length > 1) {
                    const resultsSearched = state.contracts.filter(contract => contract.customerName.toLowerCase().includes(action.payload.toLowerCase())
                        || contract.address.toLowerCase().includes(action.payload.toLowerCase()))
                    state.searchContracts = resultsSearched
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchContracts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchContracts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedContracts = action.payload.map(contract => {
                    return contract;
                });
                state.contracts = state.contracts.concat(loadedContracts)
                state.searchContracts = state.searchContracts.concat(loadedContracts)
            })
            .addCase(fetchContracts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }

})

export const selectAllContracts = (state) => state.contracts.contracts;
export const selectSearchContracts = (state) => state.contracts.searchContracts;
export const getContractsStatus = (state) => state.contracts.status;
export const getContractsError = (state) => state.contracts.error;

export const { contractsSearched } = contractSlice.actions;
export default contractSlice.reducer