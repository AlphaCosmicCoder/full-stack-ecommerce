import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: [],
    loading: false,
    error: null
}

// card slice
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers: {
        fetchCartStart: (state) => {
            state.loading = true;
        },
        fetchCartSuccess: (state, action) => {
            state.loading = false;
            state.carts = action.payload;
        },
        fetchCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // add to cart
        addToCart: (state, action) => {
            const { _id } = action.payload;
            console.log('1', _id)
            const existingItem = state.carts.find(item => item._id === _id);

            if (existingItem) {
                // Item already exists in cart, increase quantity
                existingItem.qnty += 1;
            } else {
                // Item does not exist in cart, add it with quantity 1
                state.carts.push({ ...action.payload, qnty: 1 });
            }
        },

        // remove perticular iteams
        removeToCart: (state, action) => {
            const data = state.carts.filter((ele) => ele._id !== action.payload);
            state.carts = data
        },

        // remove single iteams
        removeSingleIteams: (state, action) => {
            const IteamIndex_dec = state.carts.findIndex((iteam) => iteam._id === action.payload._id);

            if (state.carts[IteamIndex_dec].qnty >= 1) {
                state.carts[IteamIndex_dec].qnty -= 1
            }

        },

        // clear cart
        emptycartIteam: (state, action) => {
            state.carts = []
        }
    }
});

export const { fetchCartFailure, fetchCartStart, fetchCartSuccess, addToCart, removeToCart, removeSingleIteams, emptycartIteam } = cartSlice.actions;

export default cartSlice.reducer;


