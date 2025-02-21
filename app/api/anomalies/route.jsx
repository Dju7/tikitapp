import { db } from "@/lib/db";

// Méthode GET pour récupérer les consignes
export async function GET(req) {
  try {
    const anomalies = await db.anomalies.findMany(); // Récupère toutes les consignes
    return new Response(JSON.stringify(anomalies), { status: 200 });
  } catch (error) {
    return new Response("Error fetching anomalie", { status: 500 });
  }
}

// Méthode POST pour créer une nouvelle anomalie
export async function POST(req) {
  const { date, magasin, equipement, localisation, defauts, gmao } = await req.json(); // On récupère les données envoyées dans le body de la requête

  console.log("Données reçues:", { date, magasin, equipement,localisation, defauts, gmao });
 

  const parsedDate = new Date(date);  // Convertir la chaîne "2025-02-18" en objet Date
  const gmaoNumber = gmao ? parseInt(gmao, 10) : null;
  
  try {

    console.log("parsed:", {parsedDate, gmaoNumber} )

    const newAnomalie = await db.anomalies.create({
      data: {
        date: parsedDate,
        magasin,
        equipement,
        localisation,
        defauts,
        gmao: gmaoNumber,
      },
    });

    return new Response(JSON.stringify(newAnomalie), { status: 201 });
  } catch (error) {
    return new Response("Error saving anomalie", { status: 500 });
  }
}

// Méthode PUT pour mettre à jour une consigne existante
export async function PUT(req) {
  const { id, date, magasin, equipement, localisation, defauts, gmao } = await req.json();

  const parsedDate = new Date(date);  // Convertir la chaîne "2025-02-18" en objet Date
  const gmaoNumber = gmao ? parseInt(gmao, 10) : null;

  try {
    const updatedAnomalies = await db.anomalies.update({
      where: { id },
      data: {
        date: parsedDate,
        magasin,
        equipement,
        localisation,
        defauts,
        gmao: gmaoNumber,
      },
    });

    return new Response(JSON.stringify(updatedAnomalies), { status: 200 });
  } catch (error) {
    return new Response("Error updating anomalies", { status: 500 });
  }
}

// Méthode DELETE pour supprimer une consigne
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await db.anomalies.delete({
      where: { id },
    });

    return new Response(null, { status: 204 }); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    return new Response("Error deleting anomalies", { status: 500 });
  }
}