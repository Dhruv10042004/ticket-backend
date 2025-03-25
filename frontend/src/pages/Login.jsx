import React from 'react'
import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
function Login() {
    const [formData,setFormData] = useState({
        email:'',
        password:'',
    })
    const navigate = useNavigate()

    const{email,password} =formData
    const dispatch=useDispatch()
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)
    useEffect(()=>{
        if(isError)
        {
            toast.error(message)
        }
        if(isSuccess||user)
        {
        navigate('/')
        }
        dispatch(reset())
            },[isError,isSuccess,user,message,navigate,dispatch])
    const onChange=(e)=>{
     setFormData((prevState)=>({
        ...prevState,
        [e.target.id]:e.target.value
    }))
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        const userData={
            email,password,
        }
        dispatch(login(userData))
    }
  return (
    <>
    <section className="heading">
        <h1>
         <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" 
                id='email' value={email} 
                placeholder='Enter your email'
                onChange={onChange} 
                required
                />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" 
                id='password' value={password} 
                placeholder='Enter your password'
                onChange={onChange} 
                required
                />
            </div>
            <div className="form-group">
                <button type='submit' className="btn btn-block">Login</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login