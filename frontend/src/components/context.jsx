import { createContext, useState } from "react";


export const DataContext=createContext(null);

export const DataFunction=({children})=>{
    const [id,setId]=useState('')
    const [In,setIn]=useState('')
    const [out,setOut]=useState('')
    const [name,setname]=useState('')
    const [status,setStatus]=useState(true)
    const [Time,setTime]=useState('00:00:00')
    

    return(
        <DataContext.Provider value={{id,setId,In,setIn,out,setOut,name,setname,status,setStatus,Time,setTime}}>
            {children}
        </DataContext.Provider>

    )
}