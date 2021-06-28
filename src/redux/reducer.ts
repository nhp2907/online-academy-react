import {CombinedState, combineReducers, Reducer} from 'redux'
import authReducer from "./auth/auth.slice";
import categoriesReducer from "./categories/categorySlice";
import homeReducer from "./home/homeSlice";
import cartReducer from "./cart/cartSlice";
import AuthState from "./auth/AuthState";
import CategoryState from "./categories/CategoryState";
import HomeState from "./home/HomeState";
import CartState from "./cart/CartState";
import instructorReducer from "./instructor/instructSlice";
import InstructorState from "./instructor/InstructorState";

export interface RootReducer {
    auth: AuthState
    categories: CategoryState
    home: HomeState
    cart: CartState
    instructor: InstructorState
}

const reducers: Reducer<CombinedState<RootReducer>> = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    home: homeReducer,
    cart: cartReducer,
    instructor: instructorReducer
})


export default reducers;