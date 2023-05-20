import React from 'react'
import Link from 'next/link'

const home = () => {
  return (
    <>
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold text-white'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-orange-500 text-gray-50'>Sign In</a></Link>
          </div>
      </main>
    </>
  )
}

export default home
