'use client'
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import CardBoard from "../component/cardBoard/CardBoard";
import { GoLaw } from "react-icons/go";
import { FaBriefcaseMedical } from "react-icons/fa";
import { BsFire } from "react-icons/bs";

export default function Board() {
  const [dateTime, setDateTime] = useState("");
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  //gestion modal

  const handleModal= (e) => {
    e.preventdefault
    setIsOpen(!isOpen)
  }

  // Fonction pour formater la date et l'heure
  const formatDate = () => {
    const now = new Date();
    const optionsDate = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    // Formatage de la date : Jour - Mois (en lettres) - Année
    const formattedDate = now.toLocaleDateString('fr-FR', optionsDate);

    // Formatage de l'heure : Heure : Minute (24h)
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formattedTime = now.toLocaleTimeString('fr-FR', optionsTime);

    return { formattedDate, formattedTime };
  };

  // Met à jour la date et l'heure en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      const { formattedDate, formattedTime } = formatDate();
      setDateTime(formattedDate);
      setTime(formattedTime);
    }, 1000); // Met à jour chaque seconde pour l'heure en temps réel

    // Initialiser la date et l'heure au premier rendu
    const { formattedDate, formattedTime } = formatDate();
    setDateTime(formattedDate);
    setTime(formattedTime);

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <section className="relative z-0 h-full w-full flex flex-col justify-center items-center">

      <div
        className={`${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } absolute z-10 text-orange-400 text-xl transition-all duration-500 ease-in-out origin-top flex justify-start items-center gap-6 h-[90px] w-[90%] top-[10%] left-0 bg-black overflow-hidden p-2`}
      >
        <div className="flex justify-center items-center w-1/3 gap-2 cursor-pointer hover:underline">
        <GoLaw className="text-4xl" />
        <p>Declaration juridique</p>
        </div>
        <div className="flex justify-center items-center w-1/3 gap-2 cursor-pointer hover:underline">
        <FaBriefcaseMedical className="text-4xl" />
        <p>Infirmerie fermée</p>
        </div>
        <div className="flex justify-center items-center w-1/3 gap-2 cursor-pointer hover:underline">
        <BsFire className="text-4xl" />
        <p>permis feu vierge</p>
        </div>
      </div>
      

      <div className="h-[10%] w-full bg-neutral-800 border-b-4 border-orange-400 flex justify-between items-center">
        <div className="h-full w-[80%] flex justify-start items-center ml-6">
          <h2 className="text-5xl text-orange-500 font-bold">TABLEAU DE BORD</h2>
        </div>
        <div className="z-0 h-full w-[20%] flex justify-end items-center text-3xl text-orange-400">
          <p className="mr-4 font-bold ">{time}</p> {/* Affiche la date et l'heure en temps réel */}
         
        </div>
      </div>
      <div className="h-[90%] w-full flex flex-col justify-center items-center">
        <div className="h-10%] w-full flex justify-between items-center">

          <div className="h-full w-[95%] flex justify-start items-center text-4xl text-black">
            <p className="ml-6 font-bold"> {dateTime} </p>   
          </div>
          <div className="h-full w-[5%] text-5xl">
           <MdEditDocument onClick={handleModal} className="cursor-pointer bg-black text-orange-400 border border-black p-1 rounded-xl hover:text-white"/>
          </div>
        </div>
        <div className="h-[90%] w-full flex justify-center items-center">

        <CardBoard />
        </div>
      </div>
    </section>
  );
}