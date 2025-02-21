'use client'
import { useState, useRef, useEffect } from "react";
import DisplayHorsService from "@/app/component/displayHorsService/DisplayHorsService";

export default function Hs() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [magasin, setMagasin] = useState("");
  const [horsService, setHorsService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const dateRef = useRef(null);
  const agentRef = useRef(null);
  const adresseRef = useRef(null);
  const magasinRef = useRef(null);
  const localisationRef = useRef(null);
  const motifRef= useRef(null)

  // --------------- fonction appelé par les boutons de filtrages ------------------

  const handleFilterChange = (magasinType) => {
    setMagasin(magasinType);
  };

  // ---------------- Fonction pour récupérer les hors service non-filtrées depuis l'API  -----------------------

  const fetchHorsService = async () => {
    
    try {
    setLoading(true);
    const response = await fetch("/api/horsservice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setHorsService(data);  // Met à jour toutes les consignes
    } else {
      setError("Erreur lors de la récupération des hors service");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);  // Fin du chargement
  }
};

//  ----------------------- Fonction pour récupérer les hors service filtrées depuis l'API --------------------------

const fetchFilteredHorsService = async () => {
  try {
    if (!magasin) return; // Si aucun magasin n'est sélectionné, on ne fait pas de requête

    setLoading(true);  // Démarre le chargement

    const response = await fetch(`/api/horsservice/filterHorsService?magasin=${magasin}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setHorsService(data);  // Met à jour les hors service filtrées
    } else {
      setError("Erreur lors du filtrage des hors service");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);  // Fin du chargement
  }
};

useEffect(() => {
    if (magasin) {
      fetchFilteredHorsService();  // Si un équipement est sélectionné, on filtre
    } else {
      fetchHorsService();  // Si aucun équipement n'est sélectionné, on récupère toutes les consignes
    }
  }, [magasin]);
 

  // ---------------- fonction pour ajouter un hors service dans la base de donnée par le biais du formulaire ---------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const horsServiceData = {
      date: dateRef.current.value,
      agent: agentRef.current.value,
      magasin: magasinRef.current.value,
      adresse: adresseRef.current.value,
      localisation: localisationRef.current.value,
      motif: motifRef.current.value
    };
 
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/horsservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horsServiceData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const data = await response.json();
      console.log("Hors service enregistrée avec succès", data);
      alert("hors service enregistrée avec succès !");

      await fetchHorsService()

    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
      setIsOpen(!isOpen)
    }

    // Logique pour envoyer les données ou les afficher
    console.log(horsServiceData);

  };

  const handleModal = () => {
    setIsOpen(!isOpen)
   }

    return (
        <section className="relative h-full w-full flex flex-col justify-center items-center">
          
          <div
        className={`${
          isOpen ? "h-[800px]" : "h-0"
        } transition-all duration-500 ease-in-out top-[10%] right-0 w-[700px] flex flex-col justify-start items-center  absolute z-10 border bg-orange-400 overflow-hidden rounded-bl-2xl`}
        >
        <p className="text-5xl font-bold m-4 ml-6">MISE HORS SERVICE</p>
        <form onSubmit={handleSubmit} className=" w-[95%] h-[80%] flex flex-col items-center space-y-4 p-6">
        <div className="w-[90%] flex justify-between items-center">
            <div className="w-[40%] flex flex-col justify-center items-center">
              <label htmlFor="date" className="block text-md font-semibold mb-1">Date</label>
              <input
                type="date"
                id="date"
                ref={dateRef}
                className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
              />
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center">
              <label htmlFor="agent" className="block text-md mb-1 font-semibold">Agent</label>
              <input
                type="text"
                id="agent"
                ref={agentRef}
                placeholder="Nom de l'agent"
                className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
              />
            </div>
          </div>  

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="magasin" className="block text-md mb-1 font-semibold">Magasin</label>
            <select
              id="magasin"
              ref={magasinRef}
              defaultValue="jour"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
            >
              <option value="mag1">Magasin 1</option>
              <option value="mag2">Magasin 2</option>
              <option value="mag3">Magasin 3</option>
            </select>
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="equipe" className="block text-md mb-1 font-semibold">Adresse</label>
            <input
              id="adresse"
              ref={adresseRef}
              defaultValue="insérer adresse DI"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="contenu" className="block text-md mb-1 font-semibold">Localisation</label>
            <input
              id="localisation"
              ref={localisationRef}
              placeholder="localisation précise"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>  

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="motif" className="block text-md mb-1 font-semibold">Motif</label>
            <textarea
              id="motif"
              ref={motifRef}
              placeholder="Raison de la mise HS"
              className="w-full h-20 p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>     

          <button
            type="submit"
            className="w-36 bg-black text-orange-600 py-2 px-4 rounded-xl mt-4 font-semibold shadow-xl shadow-orange-800"
          >
            VALIDER
          </button>
        </form>
      </div>

          <div className="h-[10%] w-full bg-neutral-800 border-b-4 border-orange-400 flex justify-start items-center">
          <div className="h-full w-full flex justify-between items-center ml-6">
            <h2 className="text-5xl text-orange-500 font-bold">HORS SERVICE</h2>
            <button onClick={handleModal} className="h-10 w-32 rounded-xl bg-orange-400 text-blacj flex justify-center items-center mr-6 font-bold">AJOUTER</button>
          </div>
        </div>
        <div className="min-h-[90%] w-full flex flex-col justify-start items-center px-6">
                   <div className="min-h-[10%] w-full flex gap-8 justify-center items-center">
                    <button onClick={() => handleFilterChange("mag1")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">Magasin 1</button>
                    <button onClick={() => handleFilterChange("mag2")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">Magasin 2</button>
                    <button onClick={() => handleFilterChange("mag3")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">Magasin 3</button>
                   </div>
                  <DisplayHorsService horsService={horsService} loading={loading} error={error} />
                </div>
        </section>
      );
  }