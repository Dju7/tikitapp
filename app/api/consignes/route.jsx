import { db } from "@/lib/db";

// Méthode GET pour récupérer les consignes
export async function GET(req) {
  try {
    const consignes = await db.consignes.findMany(); // Récupère toutes les consignes
    return new Response(JSON.stringify(consignes), { status: 200 });
  } catch (error) {
    return new Response("Error fetching consignes", { status: 500 });
  }
}

// Méthode POST pour créer une nouvelle consigne
export async function POST(req) {
  const { date, agent, equipe, contenu, fin } = await req.json(); // On récupère les données envoyées dans le body de la requête

  console.log("Données reçues:", { date, agent, equipe, contenu, fin });
  
  try {
  
    const parsedDate = new Date(date);
    const parsedFin = fin ? new Date(fin) : null
    
    console.log("parsed:", {parsedDate, parsedFin} )

    const newConsigne = await db.consignes.create({
      data: {
        date: parsedDate,
        agent,
        equipe,
        contenu,
        fin: parsedFin,
      },
    });

    return new Response(JSON.stringify(newConsigne), { status: 201 });
  } catch (error) {
    return new Response("Error saving consigne", { status: 500 });
  }
}

// Méthode PUT pour mettre à jour une consigne existante
export async function PUT(req) {
  const { id, date, agent, equipe, contenu, fin } = await req.json();

  const parsedDate = new Date(date);  // Convertir la chaîne "2025-02-18" en objet Date
  const parsedFin = fin ? new Date(fin) : null;;    // Convertir la chaîne "2025-02-20" en objet Date ou renvoyer null

  try {
    const updatedConsigne = await db.consignes.update({
      where: { id },
      data: {
        date: new Date(date),
        agent,
        equipe,
        contenu,
        fin: new Date(fin),
      },
    });

    return new Response(JSON.stringify(updatedConsigne), { status: 200 });
  } catch (error) {
    return new Response("Error updating consigne", { status: 500 });
  }
}

// Méthode DELETE pour supprimer une consigne
export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await db.consignes.delete({
      where: { id },
    });

    return new Response(null, { status: 204 }); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    return new Response("Error deleting consigne", { status: 500 });
  }
}