import { db } from "@/lib/db";

export async function GET(req) {
    try {
      const { searchParams } = req.nextUrl;  // Accéder aux paramètres de la requête
      const magasin = searchParams.get("magasin");  // Récupérer le paramètre 'equipement'
  
      if (!magasin) {
        return new Response(
          JSON.stringify({ error: "Magasin parameter is required." }),
          { status: 400 }
        );
      }
  
      // Gestion de la requête
      const horsService = await db.horsService.findMany({
        where: magasin ? { magasin: magasin } : {},
      });
  
      // Renvoi des anomalies filtrées
      return new Response(JSON.stringify(horsService), { status: 200 });
    } catch (error) {
      // Gestion des erreurs
      console.error("Error fetching hors service filtred:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while fetching hors service." }),
        { status: 500 }
      );
    }
  }