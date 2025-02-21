

export default function DisplayConsignes({consignes, loading, error}) {

  async function handleDelete(id) {
    
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette consigne ?");
    if (!confirmation) return; 
    
    try {
      const response = await fetch("/api/consignes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Envoi de l'ID dans le corps de la requête
      });
  
      if (response.ok) {
        
        alert("Consigne supprimée avec succès. Veuillez rafraîchir la page");
        
      } else {
       
        alert("Erreur lors de la suppression de la consigne.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de suppression :", error);
      alert("Une erreur s'est produite lors de la suppression.");
    }
  }

  // Affichage en fonction de l'état (chargement, erreur ou données)
  if (loading) return <div className="h-[90%] w-full flex justify-center items-center text-5xl">Chargement des consignes...</div>;
  if (error) return <div className="h-[90%] w-full flex justify-center items-center text-4xl">Erreur : {error}</div>;

  return (
    <div className="min-h-[90%] w-full overflow-auto">
      {consignes.length > 0 ? (
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-orange-600">
            <th className="w-[10%] border border-black px-4 py-2">Date</th>
            <th className="w-[10%] border border-black px-4 py-2">Agent</th>
            <th className="w-[10%] border border-black px-4 py-2">Équipe</th>
            <th className="w-[60%] border border-black px-4 py-2">Contenu</th>
            <th className="w-[10%] border border-black px-4 py-2">Fin</th>
          </tr>
        </thead>
        <tbody>
          {consignes.map((consigne) => (
            <tr key={consigne.id} className="bg-black text-orange-200">
              <td className="w-[10%] border border-orange-600 px-4 py-2">{new Date(consigne.date).toLocaleDateString()}</td>
              <td className="w-[8%] border border-orange-600 px-4 py-2">{consigne.agent}</td>
              <td className="w-[8%] border border-orange-600 px-4 py-2">{consigne.equipe}</td>
              <td className="w-[59%] border border-orange-600 px-4 py-2">{consigne.contenu}</td>
              <td className="w-[10%] border border-orange-600 px-4 py-2">{new Date(consigne.fin).toLocaleDateString()}</td>
              <td onClick={() => handleDelete(consigne.id)} className="cursor-pointer w-[5%] bg-orange-600 text-white border border-orange-600 px-4 py-2"> X </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <div className="h-[90%] w-full flex flex-col justify-center items-center">
          <img src='/fireman.jpg' className="h-[400px] w-[400px]" />
          <p className="text-3xl text-orange-600 font-bold">Aucune Consigne</p>
          
        </div>
      )
      }
    </div>
  );
}