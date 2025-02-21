'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt, FaSmileWink } from "react-icons/fa";

function LoggedOut() {
    const router = useRouter();
    const { data: session } = useSession()

    const handleSignOut = async () => {
        await signOut({redirect: false});  
        router.push('/');  
      }

  return (
    <>
    <div 
    className='w-full h-full cursor-pointer text-black text-6xl flex flex-col justify-center items-center'
    onClick={handleSignOut}
    >
    <FaSignOutAlt className='hover:text-red-800' />
    {session ? ( 
          <p className="text-orange-800 text-lg mt-2 italic bg-orange-300 px-2 rounded-xl">Pompier en ligne</p>
        ) : (
          <p className="text-orange-800 text-lg mt-2 italic bg-orange-300 px-2 rounded-xl">Hors ligne</p>
        )}
    </div>
   </>
  )
}

export default LoggedOut