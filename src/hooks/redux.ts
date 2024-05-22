import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/index";
import { useDispatch } from "react-redux";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const useAuth = () => {
    const { id, email, accessToken } = useTypedSelector(state => state.user);
    return { id, email, accessToken };
};