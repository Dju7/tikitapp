import { db } from "@/lib/db";

export async function GET(req) {
    try {
      const { searchParams } = req.nextUrl;  // Accéder aux paramètres de la requête
      const equipement = searchParams.get("equipement");  // Récupérer le paramètre 'equipement'
  
      if (!equipement) {
        return new Response(
          JSON.stringify({ error: "Equipement parameter is required." }),
          { status: 400 }
        );
      }
  
      // Gestion de la requête
      const anomalies = await db.anomalies.findMany({
        where: equipement ? { equipement: equipement } : {},
      });
  
      // Renvoi des anomalies filtrées
      return new Response(JSON.stringify(anomalies), { status: 200 });
    } catch (error) {
      // Gestion des erreurs
      console.error("Error fetching anomalies:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while fetching anomalies." }),
        { status: 500 }
      );
    }
  }