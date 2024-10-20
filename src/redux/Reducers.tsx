import { AnyAction } from 'redux';
import ProductType from "../models/Product.model";
import OrderType from "../models/Order.model";
export interface IInitialState {
    products: ProductType[],
    cart: {
        error: string | null,
        isLoading: boolean,
        items: OrderType[]
    },
    filters: {
        priceRange: number[],
        ratingRange: number[],
        inStock: boolean,
        hasReviews: boolean
    }
  }
  
export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 100;
export const DEFAULT_MIN_RATE = 0;
export const DEFAULT_MAX_RATE = 5;

const initialState: IInitialState = {
    products: [],
    cart: {
        error: null,
        isLoading: false,
        items: []
    },
    filters: {
        priceRange: [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE],
        ratingRange: [DEFAULT_MIN_RATE, DEFAULT_MAX_RATE],
        inStock: false,
        hasReviews: false
    }
};

export const Reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'SET_CART_ITEMS':
            return {
                ...state,
                cart: { ...state.cart, items: action.payload }
            }
        case 'SET_CART_LOADING':
            return {
                ...state,
                cart: { ...state.cart, isLoading: action.payload }
            }
        case 'SET_CART_ERROR':
            return {
                ...state,
                cart: { ...state.cart, error: action.payload }
            }
        case 'DELETE_CART_ITEM':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter((item) => item.id !== action.payload)
                }
            }
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            }
        default:
            return state
    }
}