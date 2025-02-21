import { db } from "@/lib/db";

// Méthode GET pour récupérer les consignes
export async function GET(req) {
  try {
    const horsService = await db.horsService.findMany(); // Récupère toutes les consignes
    return new Response(JSON.stringify(horsService), { status: 200 });
  } catch (error) {
    return new Response("Error fetching consignes", { status: 500 });
  }
}

// Méthode POST pour créer une nouvelle consigne
export async function POST(req) {
  const { date, agent, magasin, adresse, localisation, motif  } = await req.json(); // On récupère les données envoyées dans le body de la requête

  console.log("Données reçues:", { date, agent, magasin, adresse, localisation, motif });

  const parsedDate = new Date(date);  // Convertir la chaîne "2025-02-18" en objet Date
  
  try {

    const newHorsService = await db.horsService.create({
      data: {
        date: parsedDate,
        agent,
        magasin,
        adresse,
        localisation,
        motif,
      },
    });

    return new Response(JSON.stringify(newHorsService), { status: 201 });
  } catch (error) {
    return new Response("Error saving hors service", { status: 500 });
  }
}

// Méthode PUT pour mettre à jour une consigne existante
export async function PUT(req) {
  const { id, date, agent, magasin, adresse, localisation, motif  } = await req.json();

  const parsedDate = new Date(date);  // Convertir la chaîne "2025-02-18" en objet Date
  

  try {
    const updatedHorsService = await db.horsService.update({
      where: { id },
      data: {
        date: parsedDate,
        agent,
        magasin,
        adresse,
        localisation,
        motif,
      },
    });

    return new Response(JSON.stringify(updatedHorsService), { status: 200 });
  } catch (error) {
    return new Response("Error updating hors service", { status: 500 });
  }
}

// Méthode DELETE pour supprimer une consigne
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await db.horsService.delete({
      where: { id },
    });

    return new Response(null, { status: 204 }); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    return new Response("Error deleting hors service", { status: 500 });
  }
}