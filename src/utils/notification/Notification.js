import React from 'react'
import './notification.css'

export const showErrMsg = (msg) => {
    return (
    <div style={{display:'flex',justifyContent:'center'}} >
     <div style={{backgroundColor:'white', border:'1px solid red',width:'100%'}}
                    className='mt-5 tracking-wide font-semibold  text-black w-1/2 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>{msg}
                    </div>
</div>
)}

export const showSuccessMsg = (msg) => {
    return (
        <div style={{display:'flex',justifyContent:'center'}} >
        <div style={{backgroundColor:'white', border:'1px solid green'}}
                       className='mt-5 tracking-wide font-semibold  text-black w-3/4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>{msg}
                       </div>
   </div>
    )
}