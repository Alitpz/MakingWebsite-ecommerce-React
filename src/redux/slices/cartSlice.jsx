import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            
            if (existingItem) {
                // Eğer ürün zaten sepette varsa, miktarını artır
                existingItem.quantity += 1
                existingItem.totalPrice = existingItem.price * existingItem.quantity
            } else {
                // Yeni ürün ekle
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            
            // Toplam miktar ve tutarı güncelle
            state.totalQuantity += 1
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
        },
        
        removeFromCart: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // Son ürün ise tamamen kaldır
                    state.items = state.items.filter(item => item.id !== id)
                } else {
                    // Miktarını azalt
                    existingItem.quantity -= 1
                    existingItem.totalPrice = existingItem.price * existingItem.quantity
                }
                
                // Toplam miktar ve tutarı güncelle
                state.totalQuantity -= 1
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
            }
        },
        
        removeItemCompletely: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem) {
                // Ürünü tamamen kaldır
                state.totalQuantity -= existingItem.quantity
                state.items = state.items.filter(item => item.id !== id)
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
            }
        },
        
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        },
        
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem && quantity > 0) {
                const oldQuantity = existingItem.quantity
                existingItem.quantity = quantity
                existingItem.totalPrice = existingItem.price * quantity
                
                // Toplam miktar ve tutarı güncelle
                state.totalQuantity = state.totalQuantity - oldQuantity + quantity
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
            }
        }
    },
})

export const { 
    addToCart, 
    removeFromCart, 
    removeItemCompletely, 
    clearCart, 
    updateQuantity 
} = cartSlice.actions

export default cartSlice.reducer
