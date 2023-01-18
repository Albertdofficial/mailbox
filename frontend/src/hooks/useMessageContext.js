import { MessageContext } from "../context/MessageContext";
import {useContext} from 'react'

export const useWorkoutContext = ()=>{
    const context = useContext(MessageContext)

    if(context === undefined){
        throw Error('useMessageContext must be used inside a MessageContextProvider')
    }
    return context
}