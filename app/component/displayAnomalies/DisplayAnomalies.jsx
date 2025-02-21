
export default function DisplayAnomalies({ anomalies, loading, error }) {
 
  // Affichage en fonction de l'état (chargement, erreur ou données)
  if (loading) return <div className="h-[90%] w-full flex justify-center items-center text-5xl">Chargement des anomalies...</div>;
  if (error) return <div className="h-[90%] w-full flex justify-center items-center text-4xl">Erreur : {error}</div>;

  return (
    <div className="min-h-[90%] w-full overflow-auto">
      {anomalies.length > 0 ? (
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-orange-600">
            <th className="w-[8%] border border-black px-4 py-2">Date</th>
            <th className="w-[5%] border border-black px-4 py-2">magasin</th>
            <th className="w-[10%] border border-black px-4 py-2">equipement</th>
            <th className="w-[20%] border border-black px-4 py-2">localisation</th>
            <th className="w-[45%] border border-black px-4 py-2">defaut</th>
            <th className="w-[12%] border border-black px-4 py-2">gmao</th>
          </tr>
        </thead>
        <tbody>  
           {anomalies.map((anomalie) => (
                <tr key={anomalie.id} className="bg-black text-orange-200">
                    <td className="w-[8%] border border-orange-600 px-4 py-2">
                    {new Date(anomalie.date).toLocaleDateString()}
                    </td>
                    <td className="w-[5%] border border-orange-600 px-4 py-2">{anomalie.magasin}</td>
                    <td className="w-[10%] border border-orange-600 px-4 py-2">{anomalie.equipement}</td>
                    <td className="w-[20%] border border-orange-600 px-4 py-2">{anomalie.localisation}</td>
                    <td className="w-[45%] border border-orange-600 px-4 py-2">{anomalie.defauts}</td>
                    <td className="w-[12%] border border-orange-600 px-4 py-2">{anomalie.gmao}</td>
                </tr>
          ))}
        </tbody>
       
      </table>
       ) : (
        <div className="h-[90%] w-full flex flex-col justify-center items-center">
          <img src='/fireman.jpg' className="h-[400px] w-[400px]" />
          <p className="text-3xl text-orange-600 font-bold">Aucune anomalie</p>
          
        </div>
      )
      }
    </div>
  );
}