import ProductType from "../models/Product.model";
import OrderType from "../models/Order.model";


export const setProductsData = (products: ProductType[]) => {
    return {
        type: 'SET_PRODUCTS',
        payload: products
    }
}

export const setCartItems = (cart: OrderType[]) => {
    return {
        type: 'SET_CART_ITEMS',
        payload: cart
    }
}

export const deleteCartItem = (index: number) => {
    return {
        type: 'DELETE_CART_ITEM',
        payload: index
    }
}

export const updateFilters = (filters: { [key: string]: boolean | number[] }) => {
    return {
        type: 'UPDATE_FILTERS',
        payload: filters
    }
}

export const setCartLoading = (isLoading: boolean) => {
    return {
        type: 'SET_CART_LOADING',
        payload: isLoading
    }
}