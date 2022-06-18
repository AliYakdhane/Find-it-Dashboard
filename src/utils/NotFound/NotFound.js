import React from 'react'
import { Link } from 'react-router-dom'
import sorry from '../../../assets/sorry.jpg'
function NotFound() {
    return (
        <div className='min-h-screen w-full  text-gray-900 flex justify-center'>
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
    
        <div style={{display:'flex', justifyContent:'center', marginTop:"17rem"}}>
           <h2>404 | Not Found Please <Link to ='/login'>Sign in</Link> or <Link to ='/register'> Register</Link>!</h2> 
        </div>
        <br/>
        <div className="img">
        <img src={sorry} alt="" />
      </div>
        </div></div>
    )
}

export default NotFound
