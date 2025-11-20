import {LOGIN,LOGOUT} from "./actionTypes"

interface Loginpayload{
    username:string,
    email:string
} 

export const login = (payload:Loginpayload) =>({
    type:LOGIN,
    payload
})
export const logout = () => ({
    type:LOGOUT
})

export type actions = ReturnType<typeof login> | ReturnType<typeof logout>