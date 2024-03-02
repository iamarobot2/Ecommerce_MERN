
import { useRef } from 'react';
import CTAButton from '../components/CTAButton';
import {object,string} from 'yup'
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Signup() {
    
    const SignupForm = useRef(null)
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const SignupSchema = object(
        {
            cpassword:yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password"),null],"Passwords do not match"),
            password:yup
            .string()
            .required("Password is required")
            .min(8,"Password should be at least 8 characters")
            .matches(passwordRules, { message: "Please create a stronger password" }),
            email:string().required("Email is required").email("Invalid Email"),
            name:string().required("Name is required")

        }
    )
    async function handleLogin(event)
    {
        try
        {
            event.preventDefault()
            const form = SignupForm.current
            const name = form['name'].value
            const email = form['email'].value
            const password = form['password'].value
            const cpassword = form['cpassword'].value
            // eslint-disable-next-line no-unused-vars
            const userDetails = await SignupSchema.validate({name,email,password,cpassword})
            const payload = 
            {
                name:name,
                email:email,
                password:password
            }
            await axios.post("http://localhost:3800/signup",payload)
            .then((response)=>
            {
                if(response.data.newuser)
                    toast.success("SignedUp Successfully !")
                else
                    toast.error("User with email already exists")
            })
            .catch((err)=>{toast.error("Error occured during Signup !");console.log(err)})
            
        }
        catch(error)
        {
           console.log(error)
           toast.error(error.message)
        }
    }

    return (
    <main className='container mx-auto py-12 px-4'>
        <section className='flex flex-col justify-center items-center'>
            <form ref={SignupForm} className='w-full flex flex-col max-w-xl mb-2'>
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' className={'p-2 mt-2 mb-4 border border-violet-600'} required />
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' className={'p-2 mt-2 mb-4 border border-violet-600'} required />
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' className={'p-2 mt-2 mb-4 border border-violet-600'} required/>
                <label htmlFor='cpassword'>Confirm Password</label>
                <input type="password" id='cpassword' className={'p-2 mt-2 mb-4 border border-violet-600'} required/>
                <CTAButton type="submit" action={()=>{handleLogin(event)}} text="Signup" />
            </form>
            <span>Already have an account? <Link className='font-semibold text-purple-900 hover:underline' to={'/login'}>Login</Link></span>
        </section>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition: Flip 
        />
    </main>
    );
}

export default Signup;