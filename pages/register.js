import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router';

export default function Register(){

    const [show, setShow] = useState({ password: false, cpassword: false })
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })

    async function onSubmit(values){
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            })
    }

    return (
        <>
        <Head>
            <title>Register</title>
        </Head>
        <div className="title">
            <h1 className="text-orange-700 text-4xl font-bold py-6 text-center ">
                Student Register
            </h1>
        </div>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='Username'
                    className="input"
                    {...formik.getFieldProps('username')}
                    />
                </div>
                <div className={`${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className="input"
                    {...formik.getFieldProps('email')}
                    />
                </div>
                <div className={`${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className="input"
                    {...formik.getFieldProps('password')}
                    />
                </div>
                <div className={`${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className="input"
                    {...formik.getFieldProps('cpassword')}
                    />
                </div>
                <div className="input-button">
                    <button type='submit' className="bg-orange-600 h-8 w-24 text-white">
                        Sign Up
                    </button>
                </div>
            </form>
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/login'}><a className='text-orange-700'>Sign In</a></Link>
            </p>
        </section>
        <span className="credit text-white ">Developed by<a href='https://github.com/abhinavsaxena2308' className='text-orange-700' target='next'> Abhinav Saxena</a></span>
        </>
    )
}