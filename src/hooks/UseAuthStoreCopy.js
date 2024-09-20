import { useDispatch, useSelector } from "react-redux"
import calendarAPI from "../api/calendarAPI";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const UseAuthStoreCopy = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarAPI.post('/auth',{ email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({email, password, name}) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarAPI.post('/auth/newUser',{ email, password, name });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if(!token) return dispatch(onLogout());

        try {
            const { data } = await calendarAPI.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        errorMessage,
        status, 
        user, 
     
        //* Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
     }
}