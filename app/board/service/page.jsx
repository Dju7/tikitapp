"use client";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deux états pour différencier les listes
  const [agentsEnService, setAgentsEnService] = useState([]);
  const [agentsFinDeService, setAgentsFinDeService] = useState([]);

  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const fonctionRef = useRef(null);
  const nomStatusRef = useRef(null);

  // Fetch agents en service
  const fetchAgentsEnService = async () => {
    try {
      const res = await fetch("/api/agent", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur récupération agents en service");
      const data = await res.json();
      const filtered = data.filter((agent) => agent.statut === "EN_SERVICE");
      setAgentsEnService(filtered);
    } catch (error) {
      console.error("Erreur fetchAgentsEnService :", error);
    }
  };

  // Fetch agents fin de service
  const fetchAgentsFinDeService = async () => {
    try {
      const res = await fetch("/api/agent", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erreur récupération agents fin de service");
      const data = await res.json();
      const filtered = data.filter((agent) => agent.statut === "FIN_DE_SERVICE");
      setAgentsFinDeService(filtered);
    } catch (error) {
      console.error("Erreur fetchAgentsFinDeService :", error);
    }
  };

  // Fetch initial au chargement
  useEffect(() => {
    fetchAgentsEnService();
    fetchAgentsFinDeService();
  }, []);

  // Ajouter un agent
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nom = nomRef.current?.value.trim();
    const prenom = prenomRef.current?.value.trim();
    const fonction = fonctionRef.current?.value;

    const payload = { nom, prenom, fonction };

    console.log("Payload envoyé au serveur:", payload); 

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Agent ajouté avec succès !");
        nomRef.current.value = "";
        prenomRef.current.value = "";
        fonctionRef.current.value = "SSPIAP1";

        // Refetch pour rafraîchir les listes
        fetchAgentsEnService();
        fetchAgentsFinDeService();

        setIsOpen(false);
      } else {
        const errorText = await res.text();
        console.error("Erreur API :", errorText);
        alert("Erreur lors de l’ajout de l’agent.");
      }
    } catch (error) {
      alert("Une erreur s'est produite lors de l'enregistrement.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Changer le statut (prise ou fin de service)
 const handleStatusChange = async (statutDemande) => {
  const nom = nomStatusRef.current?.value.trim();
  if (!nom) return alert("Veuillez saisir un nom");

  try {
    const res = await fetch("/api/agent", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, statutDemande }),
    });

    console.log("Données envoyées au serveur :", { nom, statutDemande });

    if (!res.ok) {
      // On récupère le texte brut de l'erreur
      const errorText = await res.text();
      alert(errorText || "Erreur lors de la mise à jour");
    } else {
      alert(`Statut mis à jour en ${statutDemande} avec succès.`);
      nomStatusRef.current.value = "";

      // Re-fetch les listes après mise à jour
      fetchAgentsEnService();
      fetchAgentsFinDeService();
    }
  } catch (error) {
    alert("Erreur réseau");
    console.error(error);
  }
};

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative h-full w-full flex flex-col justify-center items-center">
      {/* Modal ajout agent */}
      <div
        className={`${
          isOpen ? "h-[400px]" : "h-0"
        } transition-all duration-500 ease-in-out top-[10%] right-0 w-[700px] flex flex-col justify-start items-center absolute z-10 border bg-orange-400 overflow-hidden rounded-bl-2xl`}
      >
        <p className="text-5xl font-bold m-4 ml-6">Ajouter Agent</p>
        <form
          onSubmit={handleSubmit}
          className="w-[95%] h-[80%] flex flex-col items-center space-y-4 p-6"
        >
          <div className="w-[90%] flex justify-between items-center">
            <div className="w-[45%] flex flex-col justify-center items-center">
              <label htmlFor="nom" className="block text-md font-semibold mb-1">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                ref={nomRef}
                placeholder="Nom"
                className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
              />
            </div>

            <div className="w-[45%] flex flex-col justify-center items-center">
              <label
                htmlFor="prenom"
                className="block text-md font-semibold mb-1"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                ref={prenomRef}
                placeholder="Prénom"
                className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800 placeholder-orange-600"
              />
            </div>
          </div>

          <div className="w-[90%] flex flex-col items-center">
            <label
              htmlFor="fonction"
              className="block text-md mb-1 font-semibold"
            >
              Fonction
            </label>
            <select
              id="fonction"
              ref={fonctionRef}
              defaultValue="SSIAP1"
              className="w-full p-2 bg-orange-200 text-black rounded-xl shadow-xl shadow-orange-800"
            >
              <option value="SSIAP1">SSIAP1</option>
              <option value="SSIAP2">SSIAP2</option>
              <option value="SSIAP3">SSIAP3</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-36 bg-black text-orange-600 py-2 px-4 rounded-xl mt-4 font-semibold shadow-xl shadow-orange-800 disabled:opacity-50"
          >
            AJOUTER
          </button>
        </form>
      </div>

      {/* En-tête */}
      <div className="h-[10%] w-full bg-neutral-800 border-b-4 border-orange-400 flex justify-start items-center">
        <div className="h-full w-full flex justify-between items-center ml-6">
          <h2 className="text-5xl text-orange-500 font-bold">EQUIPE</h2>
          <button
            onClick={handleModal}
            className="h-10 w-10 rounded-xl bg-orange-400 text-black flex justify-center items-center mr-6 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="min-h-[90%] w-full flex justify-center items-center gap-20 px-6">
        {/* Agents en service */}
        <div className="h-[70%] w-[60%] flex flex-col border border-orange-500">
          <div className="h-14 w-full flex justify-center items-center border-b border-orange-400 bg-orange-400/20">
            <p>Nom de famille:</p>
            <input
              type="text"
              placeholder="Insérez votre nom de famille"
              ref={nomStatusRef}
              className="w-[30%] p-2 border border-orange-400 rounded ml-4"
            />
            <div className="h-10 w-[50%] flex justify-end items-center px-2 gap-8 ">
              <button
                onClick={() => handleStatusChange("EN_SERVICE")}
                className="bg-orange-400 px-4 py-2 rounded"
              >
                Prise de Service
              </button>
              <button
                onClick={() => handleStatusChange("FIN_DE_SERVICE")}
                className="bg-orange-400 px-4 py-2 rounded"
              >
                Fin de Service
              </button>
            </div>
          </div>
          <div className="overflow-auto p-4">
            {agentsEnService.length === 0 ? (
              <p className="text-center text-orange-400">Aucun agent en service</p>
            ) : (
              agentsEnService.map((agent) => (
                <div
                  key={agent.id}
                  className="p-2 bg-orange-100 text-black rounded-md shadow-md mb-2"
                >
                  <p className="font-semibold">
                    {agent.nom} {agent.prenom}
                  </p>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm italic text-orange-600">{agent.fonction}</p>
                      <p className="text-xs text-gray-600">
                        Prise de service : {new Date(agent.priseService).toLocaleTimeString()}
                      </p>
                    </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Agents fin de service */}
        <div className="h-[70%] w-[25%] border border-orange-400 overflow-hidden">
          <div className="h-14 w-full flex justify-center items-center border-b border-orange-400 bg-orange-400/20">
            <p>Liste des Agents disponibles</p>
          </div>
          <div className="overflow-auto h-full w-full justify-center items-center p-4">
            {agentsFinDeService.length === 0 ? (
              <p className="text-center w-full text-orange-400">Aucun agent trouvé</p>
            ) : (
              agentsFinDeService.map((agent) => (
                <div
                  key={agent.id}
                  className="p-2 bg-orange-100 text-black rounded-md shadow-md mb-2"
                >
                  <p className="font-semibold">
                    {agent.nom} {agent.prenom}
                  </p>
                  <p className="text-sm italic text-orange-600">{agent.fonction}</p>
                  <p className="text-xs text-gray-600">
                        fin de service : {new Date(agent.finService).toLocaleTimeString()}
                      </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}