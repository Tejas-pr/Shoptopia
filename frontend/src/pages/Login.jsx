import React from 'react'


const Login = () => {
  return (
    <>
      <section className='mx-auto px-6 lg:px-20; flexCenter flex-col pt-32 dark:bg-[#1E201E]'>
      <div className='max-w-[555px] h-[600px] rounded-md bg-white m-auto px-14 py-10 dark:bg-[#1E201E] dark:text-white dark:shadow dark:shadow-white'>
        <h3 className='h3'>Sign Up</h3>
        <div className='flex flex-col gap-4 mt-7'>
          <input type="text" placeholder='Your Name' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500'/>
          <input type="email" placeholder='Email Address' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500'/>
          <input type="password" placeholder='Password' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500'/>
        </div>
        <button className='btn_dark_rounded my-5 w-full dark:bg-white dark:text-black'>Continue</button>
        <p className='text-black font-bold dark:text-white'>Already have a account? <span className='text-secondary underline cursor-pointer'>Login</span></p>
        <div className='flexCenter mt-6 gap-3'>
          <input type="checkbox" className='w-6 h-4'/>
          <p>By continuing, I agree to Shoptopia's Terms of Service & Privacy Policy.</p>
        </div>
      </div>
      </section>
    </>
  )
}

export default Login
