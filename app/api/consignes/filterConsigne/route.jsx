import { db } from "@/lib/db";

export async function GET(req) {
    try {
      const { searchParams } = req.nextUrl;  // Accéder aux paramètres de la requête
      const equipe = searchParams.get("equipe");  // Récupérer le paramètre 'equipe'
  
      if (!equipe) {
        return new Response(
          JSON.stringify({ error: "Equipe parameter is required." }),
          { status: 400 }
        );
      }
  
      // Gestion de la requête
      const consignes = await db.consignes.findMany({
        where: equipe ? { equipe: equipe } : {},
      });
  
      // Renvoi des anomalies filtrées
      return new Response(JSON.stringify(consignes), { status: 200 });
    } catch (error) {
      // Gestion des erreurs
      console.error("Error fetching consignes filtred:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while fetching consignes." }),
        { status: 500 }
      );
    }
  }