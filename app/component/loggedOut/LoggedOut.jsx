'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt, FaSmileWink } from "react-icons/fa";

function LoggedOut() {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut({redirect: false});  
        router.push('/');  
      }

  return (
    <>
    <div 
    className='w-full h-full cursor-pointer text-black text-4xl flex flex-col justify-center items-center'
    onClick={handleSignOut}
    >
    <FaSignOutAlt className='hover:text-red-800' />
    </div>
   </>
  )
}

export default LoggedOut