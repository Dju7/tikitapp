'use client'
import { useState, useEffect } from 'react';

export default function CardBoard() {
    const [data, setData] = useState({
        totalConsignes: 0,
        totalAnomalies: 0,
        totalHorsService: 0,
        consignesJour: 0,
        consignesNuit: 0,
        horsServiceMag1: 0,
        horsServiceMag2: 0,
        horsServiceMag3: 0,
        anomaliesPcf: 0,
        anomaliesBes: 0,
        anomaliesIs: 0,
      });

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/alldata');
    
            // Vérifier si la réponse est valide
            if (!response.ok) {
              throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
            }
    
            // Vérifier si la réponse est vide
            const text = await response.text(); // Utilisez .text() pour inspecter le contenu brut
            if (!text) {
              throw new Error('La réponse est vide.');
            }
    
            // Si la réponse contient des données, essayez de la convertir en JSON
            const result = JSON.parse(text); 
    
            // Mettre les données dans le state
            setData(result);
          } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
          }
        };
    
        fetchData();
      }, []);
    


    return (
      <article className="h-full w-full flex justify-center items-center gap-6 px-6">
        <div className="relative z-0 h-[70%] w-1/3 flex justify-center item-center bg-card bg-cover bg-center rounded-xl overflow-hidden shadow-xl shadow-orange-400"> 
            <div className="absolute z-2 bg-orange-600 bg-opacity-60 h-full w-full"/>
            <div className="z-10 text-white text-5xl flex flex-col justify-center items-center">
                <p className="text-white text-9xl">{data.totalConsignes}</p>
                <p>CONSIGNES</p>
                <div className='h-[60%] w-full flex flex-col justify-center items-center gap-4'>
                  <p className='text-3xl underline mb-4'>EQUIPE:</p>
                  <div className="text-2xl h-[20%] w-full flex justify-between items-center gap-6">
                      <p>nuit: {data.consignesJour}</p>
                      <p>jour: {data.consignesNuit}</p>
                  </div>
                </div>
            </div>
        </div>
        <div className="relative z-0 h-[70%] w-1/3 flex justify-center item-center bg-card1 bg-cover bg-center rounded-xl overflow-hidden shadow-xl shadow-orange-400"> 
            <div className="absolute z-2 bg-orange-600 bg-opacity-70 h-full w-full"/>
            <div className="z-10 text-white text-5xl flex flex-col justify-center items-center">
                <p className="text-9xl">{data.totalAnomalies}</p>
                <p>ANOMALIES</p>
                  <div className='h-[60%] w-full flex flex-col justify-center items-center gap-6'>
                    <p className='text-3xl underline mb-4'>EQUIPEMENT:</p>
                    <div className="text-2xl h-[5%] w-full flex justify-between items-center gap-6">
                        <p>PCF: {data.anomaliesPcf}</p>
                        <p>BES: {data.anomaliesBes}</p>
                    </div>
                    <div className="text-2xl h-[5%] w-full flex justify-between items-center gap-6">
                        <p>IS: {data.anomaliesIs}</p>
                        <p>FUITES: 0</p>
                    </div>
                  </div>
            </div>
        </div>
        <div className="relative z-0 h-[70%] w-1/3 flex justify-center item-center bg-card2 bg-cover bg-center rounded-xl overflow-hidden shadow-xl shadow-orange-400"> 
            <div className="absolute z-2 bg-orange-600 bg-opacity-70 h-full w-full"/>
            <div className="z-10 text-white text-5xl flex flex-col justify-center items-center">
                <p className="text-9xl">{data.totalHorsService}</p>
                <p>HORS SERVICE</p>
                <div className='h-[60%] w-full flex flex-col justify-center items-center gap-4'>
                <p className='text-3xl mt-6 underline mb-4'>MAGASIN:</p>
                <div className="text-2xl h-[20%] w-full flex justify-between items-center gap-8">
                    <p>Mag 1: {data.horsServiceMag1}</p>
                    <p>Mag 2: {data.horsServiceMag2}</p>
                    <p>Mag 3: {data.horsServiceMag3}</p>
                </div>
              </div>
            </div>
        </div>
      </article>
    );
  }