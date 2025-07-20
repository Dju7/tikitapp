'use client'
import LoggedOut from "../loggedOut/LoggedOut";
import { useSession } from 'next-auth/react'
import Nav from "../nav/Nav";

export default function SideBar() {
  
    const { data: session } = useSession()

    return (
      <aside className="fixed left-0 h-full w-[15%] bg-orange-400 flex-col ">
        <div className="h-[20%] w-full flex flex-col justify-center items-center ">
            <img src="/logo.png" className="bg-orange-300 p-1 rounded-xl" />
            {session ? ( 
          <p className="text-orange-800 text-md mt-2 italic bg-orange-300 px-2 rounded-xl">Pompier en ligne</p>
        ) : (
          <p className="text-orange-800 text-md mt-2 italic bg-orange-300 px-2 rounded-xl">Hors ligne</p>
        )}
        </div>
        <div className="h-[70%] w-full flex flex-col justify-center items-center">
            <Nav/>
        </div>
        <div className="h-[10%] w-full flex flex-col justify-center items-center">
            <LoggedOut />
        </div>
      </aside>
    );
  }