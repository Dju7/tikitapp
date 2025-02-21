'use client'
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DisplayAnomalies from "@/app/component/displayAnomalies/DisplayAnomalies";

export default function Anomalies() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [equipement, setEquipement] = useState("");
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()

  const dateRef = useRef(null);
  const magasinRef = useRef(null);
  const equipementRef = useRef(null);
  const localisationRef = useRef(null);
  const defautRef= useRef(null)
  const gmaoRef= useRef(null)


  // --------------- fonction appelé par les boutons de filtrages ------------------

  const handleFilterChange = (equipementType) => {
    setEquipement(equipementType);
    console.log(equipement)
  };

  // ---------------- Fonction pour récupérer les anomalies filtrées depuis l'API  -----------------------

  const fetchAnomalies = async () => {
    
    try {
    setLoading(true);
    const response = await fetch("/api/anomalies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setAnomalies(data);  // Met à jour toutes les anomalies
    } else {
      setError("Erreur lors de la récupération des anomalies");
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);  // Fin du chargement
  }
};



  //  ----------------------- Fonction pour récupérer les anomalies filtrées depuis l'API --------------------------

  const fetchFilteredAnomalies = async () => {
    try {
      if (!equipement) return; // Si aucun équipement n'est sélectionné, on ne fait pas de requête

      setLoading(true);  // Démarre le chargement

      const response = await fetch(`/api/anomalies/filterAnomalie?equipement=${equipement}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnomalies(data);  // Met à jour les anomalies filtrées
      } else {
        setError("Erreur lors du filtrage des anomalies");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  useEffect(() => {
    if (equipement) {
      fetchFilteredAnomalies();  // Si un équipement est sélectionné, on filtre
    } else {
      fetchAnomalies();  // Si aucun équipement n'est sélectionné, on récupère toutes les anomalies
    }
  }, [equipement]);


  // ---------------- fonction pour ajouter une anomalie dans la base de donnée par le biais du formulaire ---------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const anomalieData = {
      date: dateRef.current.value,
      magasin: magasinRef.current.value,
      equipement: equipementRef.current.value,
      localisation: localisationRef.current.value,
      defauts: defautRef.current.value,
      gmao: gmaoRef.current.value,
    };
 
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/anomalies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anomalieData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const data = await response.json();
      console.log("Anomalie enregistrée avec succès", data);
      alert("Anomalie enregistrée avec succès !");

    
      await fetchAnomalies();

    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
      setIsOpen(!isOpen)
    }

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
        <p className="text-5xl font-bold m-4 ml-6">ANOMALIE</p>
        <form onSubmit={handleSubmit} className=" w-[95%] h-[80%] flex flex-col items-center space-y-4 p-6">
          <div className="w-[90%] flex flex-col justify-start items-center">
              <label htmlFor="date" className="block text-xl font-bold font-semibold mb-1">Date</label>
              <input
                type="date"
                id="date"
                ref={dateRef}
                className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
              />
            
          </div>  

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="magasin" className="block text-xl font-bold mb-1 font-semibold">Magasin</label>
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
            <label htmlFor="equipement" className="block text-xl font-bold mb-1 font-semibold">Equipement</label>
            <select
              id="equipement"
              ref={equipementRef}
              defaultValue="jour"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
            >
              <option value="pcf">Porte coupe-feu</option>
              <option value="bes">BES</option>
              <option value="is">Issue de secours</option>
            </select>
          </div>
          

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="contenu" className="block text-xl font-bold mb-1 font-semibold">Localisation</label>
            <input
              id="localisation"
              ref={localisationRef}
              placeholder="localisation précise"
              className="w-full p-2  bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div>  

          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="defauts" className="block text-xl font-bold mb-1 font-semibold">Defaut(s)</label>
            <textarea
              id="defauts"
              ref={defautRef}
              placeholder="Description de l'anomalie"
              className="w-full h-20 p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
            />
          </div> 
          <div className="w-[90%] flex flex-col items-center">
            <label htmlFor="gmao" className="block text-xl font-bold mb-1 font-semibold">GMAO</label>
            <input
              id="gmao"
              ref={gmaoRef}
              placeholder="numéro GMAO"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
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
          <h2 className="text-5xl text-orange-500 font-bold">ANOMALIES</h2>
          <button onClick={handleModal} className="h-10 w-32 rounded-xl bg-orange-400 text-black flex justify-center items-center mr-6 font-bold">AJOUTER</button>
        </div>
      </div>
      <div className="min-h-[90%] w-full flex flex-col justify-start items-center px-6">
                <div className="min-h-[10%] w-full flex gap-8 justify-center items-center">
                 <button onClick={() => handleFilterChange("pcf")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">PCF</button>
                 <button onClick={() => handleFilterChange("bes")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">BES</button>
                 <button onClick={() => handleFilterChange("is")} className="h-8 w-32 rounded bg-black text-white font-bold shadow-orange-600 shadow-lg">IS</button>
                </div>
                
                  <DisplayAnomalies anomalies={anomalies} loading={loading} error={error} />
                
             </div>
      </section>
    );
  }