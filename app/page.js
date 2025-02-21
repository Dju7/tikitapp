'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState ({
    name: '',
    password:''
  })

  const [error, setError] = useState('');

  const loginUser = async (e) => {
    e.preventDefault()
    console.log(data)
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });
  
    if (result?.ok) { 
      alert("authentification réussi, vous allez être redirigé vers le Board dans quelques instants")
      router.push('/board');
    } else {
      setError("L'utilisateur n'existe pas");
    }
  };

  return (
    <main className="relative z-0 h-screen w-full bg-orange-400 flex flex-col justify-center items-center">
      <img src="background.jpg" className="absolute z-1 h-full w-full object-cover opacity-50" />
      <section className="z-10 w-[25%] h-[55%]  flex flex-col lg:flex-row justify-center items-center overflow-hidden bg-white/90 p-4 rounded-xl shadow-xl shadow-black/80">  
        <div className="h-[50%] lg:h-full w-full lg:w-[70%] flex flex-col justify-center items-center">
        <img src='913.png' />
        <h2 className="text-3xl text-orange-600 font-bold mt-1">PC POMPIER</h2>
        <div className="min-h-14 w-full flex justify-center items-center">
        {error && (
                <p className="w-full bg-red-600 text-white font-bold text-center p-1 rounded">{error}</p>
              )}

        </div>
        <form 
        className="mt-1 flex flex-col justify-start items-center gap-4 w-full h-[70%] "
        onSubmit={loginUser} method="POST"
        >
          <label className="text-zinc-800 font-bold">
           LOGIN
          </label>
          <input 
          id="name" 
          name="name" type="name"   
          onChange={(e) => { setData({ ...data, name: e.target.value }) }} 
          className="w-full p-1 border-2 border-black focus:bg-orange-400 text-black font-bold rounded"
          />
         
          <label className="text-zinc-800 font-bold">
            PASSWORD
          </label>
          <input 
          className="w-full p-1 border-2 border-black focus:bg-orange-400 rounded "
          id="password" 
          name="password" 
          type="password"          
          onChange={(e) => { setData({ ...data, password: e.target.value }) }}
          />
          <button type="submit" className="mt-2 h-12 w-40 text-white font-bold rounded-xl bg-orange-500 hover:bg-red-600 ">SE CONNECTER</button>
        </form>
        </div>
        
      </section>
    </main>
  );
}
