'use client'
import DisplayConsignes from "@/app/component/displayConsignes/DisplayConsignes";
import { useState, useRef, useEffect } from "react";


export default function Consignes() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equipe, setEquipe] = useState("");
  const [consignes, setConsignes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dateRef = useRef(null);
  const finRef = useRef(null);
  const agentRef = useRef(null);
  const equipeRef = useRef(null);
  const contenuRef = useRef(null);

  // --------------- fonction appelé par les boutons de filtrages ------------------

  const handleFilterChange = (equipeType) => {
    setEquipe(equipeType);
  };

  // ---------------- Fonction pour récupérer les consignes non-filtrées depuis l'API  -----------------------

  const fetchConsignes = async () => {
    
    try {
    setLoading(true);
    const response = await fetch("/api/consignes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setConsignes(data);  // Met à jour toutes les consignes
    } else {
      setError("Erreur lors de la récupération des consignes");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);  // Fin du chargement
  }
};

//  ----------------------- Fonction pour récupérer les consignes filtrées depuis l'API --------------------------

const fetchFilteredconsignes = async () => {
  try {
    if (!equipe) return; // Si aucun équipe n'est sélectionné, on ne fait pas de requête

    setLoading(true);  // Démarre le chargement

    const response = await fetch(`/api/consignes/filterConsigne?equipe=${equipe}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setConsignes(data);  // Met à jour les consignes filtrées
    } else {
      setError("Erreur lors du filtrage des consignes");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);  // Fin du chargement
  }
};


useEffect(() => {
    if (equipe) {
      fetchFilteredconsignes();  // Si un équipement est sélectionné, on filtre
    } else {
      fetchConsignes();  // Si aucun équipement n'est sélectionné, on récupère toutes les consignes
    }
  }, [equipe]);


 // ---------------- fonction pour ajouter une consigne dans la base de donnée par le biais du formulaire ---------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const consigneData = {
      date: dateRef.current.value,
      agent: agentRef.current.value,
      equipe: equipeRef.current.value,
      contenu: contenuRef.current.value,
      fin: finRef.current.value ? finRef.current.value : null,
    };
 
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consignes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consigneData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const data = await response.json();
      console.log("Consigne enregistrée avec succès", data);
      alert("Consigne enregistrée avec succès !"); 

      await fetchConsignes()

    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
      setIsOpen(!isOpen)
      
    }

    // Logique pour envoyer les données ou les afficher
    console.log(consigneData);

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
        <p className="text-5xl font-bold m-4 ml-6">Nouvelle consigne</p>
        <form onSubmit={handleSubmit} className=" w-[95%] h-[80%] flex flex-col items-center space-y-4 p-6">
          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="date" className="block text-xl font-bold font-semibold mb-1">Date</label>
            <input
              type="date"
              id="date"
              ref={dateRef}
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
            />
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="agent" className="block text-xl font-bold mb-1 font-semibold">Agent</label>
            <input
              type="text"
              id="agent"
              ref={agentRef}
              placeholder="Nom de l'agent"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="equipe" className="block text-xl font-bold mb-1 font-semibold">Équipe</label>
            <select
              id="equipe"
              ref={equipeRef}
              defaultValue="jour"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
            >
              <option value="jour">Jour</option>
              <option value="nuit">Nuit</option>
              <option value="les deux">Jour/Nuit</option>
            </select>
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="contenu" className="block text-xl font-bold mb-1 font-semibold">Contenu</label>
            <textarea
              id="contenu"
              ref={contenuRef}
              placeholder="Contenu de la consigne"
              className="w-full h-40 p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="fin" className="block text-xl font-bold mb-1 font-semibold">Fin</label>
            <input
              type="date"
              id="fin"
              ref={finRef}
              className="w-60 p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
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
            <h2 className="text-5xl text-orange-500 font-bold">CONSIGNES</h2>        
            <button onClick={handleModal} className="h-10 w-32 rounded-xl bg-orange-400 text-blacj flex justify-center items-center mr-6 font-bold">AJOUTER</button>
          </div>
        </div>
        <div className="min-h-[90%] w-full flex flex-col justify-start items-center px-6">
           <div className="min-h-[10%] w-full flex gap-8 justify-center items-center">
            <button onClick={() => handleFilterChange("jour")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">Jour</button>
            <button onClick={() => handleFilterChange("nuit")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">Nuit</button>
           </div>
            <DisplayConsignes consignes={consignes} loading={loading} error={error}/>
        </div>
        </section>
      );
  }