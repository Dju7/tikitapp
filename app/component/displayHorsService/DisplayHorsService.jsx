
export default function DisplayHorsService({horsService, loading, error}) {
  
  // Affichage en fonction de l'état (chargement, erreur ou données)
  if (loading) return <div className="h-[90%] w-full flex justify-center items-center text-5xl">Chargement des hors services...</div>;
  if (error) return <div className="h-[90%] w-full flex justify-center items-center text-4xl">Erreur : {error}</div>;

  return (
    <div className="min-h-[90%] w-full overflow-auto">
      {horsService.length > 0 ? (
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-orange-600">
            <th className="w-[5%] border border-black px-4 py-2">Date</th>
            <th className="w-[5%] border border-black px-4 py-2">Agent</th>
            <th className="w-[10%] border border-black px-4 py-2">magasin</th>
            <th className="w-[20%] border border-black px-4 py-2">adresse</th>
            <th className="w-[20%] border border-black px-4 py-2">localisation</th>
            <th className="w-[30%] border border-black px-4 py-2">motif</th>
          </tr>
        </thead>
        <tbody>
          {horsService.map((hs) => (
            <tr key={hs.id} className="bg-black text-orange-200">
              <td className="w-[5%] border border-orange-600 px-4 py-2">{new Date(hs.date).toLocaleDateString()}</td>
              <td className="w-[5%] border border-orange-600 px-4 py-2">{hs.agent}</td>
              <td className="w-[10%] border border-orange-600 px-4 py-2">{hs.magasin}</td>
              <td className="w-[20%] border border-orange-600 px-4 py-2">{hs.adresse}</td>
              <td className="w-[20%] border border-orange-600 px-4 py-2">{hs.localisation}</td>
              <td className="w-[30%] border border-orange-600 px-4 py-2">{hs.motif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
        <div className="h-[90%] w-full flex flex-col justify-center items-center">
          <img src='/fireman.jpg' className="h-[400px] w-[400px]" />
          <p className="text-3xl text-orange-600 font-bold">Aucun Hors-service</p>
          
        </div>
      )
      }
    </div>
  );
}