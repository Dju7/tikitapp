import { FaHome } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { FaFireExtinguisher } from "react-icons/fa";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import Link from "next/link";

export default function Nav() {
    return (
      <nav className="h-full w-full flex flex-col items-center justify-center gap-1 ">
        <div className="h-1/4 w-full bg-black flex flex-col text-orange-400 justify-center items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
          <Link href="/board"><FaHome className="text-6xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"/></Link>
          <p className="text-2xl">ACCUEIL</p>
        </div>
        <div className="h-1/4 w-full bg-black flex flex-col text-orange-400 justify-center items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
          <Link href="/board/consignes"><FaGavel className="text-6xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" /></Link>
          <p className="text-2xl">CONSIGNES</p>
        </div>
        <div className="h-1/4 w-full bg-black flex flex-col text-orange-400 justify-center items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
        <Link href="/board/anomalies"><FaHouseMedicalFlag className="text-6xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" /></Link>
          <p className="text-2xl">ANOMALIES</p>
        </div>
        <div className="h-1/4 w-full bg-black flex flex-col text-orange-400 justify-center items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
        <Link href="/board/hs"><FaFireExtinguisher className="text-6xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110" /></Link>
          <p className="text-2xl">HORS SERVICE</p>
        </div>
      </nav>
    );
  }