import { db } from "@/lib/db";

export async function GET(req) {
    try {
      // Récupérer les données des différentes tables via Prisma
      const consignes = await db.consignes.findMany();
      const anomalies = await db.anomalies.findMany();
      const horsService = await db.horsService.findMany();
  
      // Calculer des statistiques basées sur les données récupérées
      const result = {
        totalConsignes: consignes.length,  // Nombre total de consignes
        totalAnomalies: anomalies.length,  // Nombre total d'anomalies
        totalHorsService: horsService.length,  // Nombre total d'éléments hors service
        consignesJour: consignes.filter(c => c.equipe === 'jour').length,  // Nombre de consignes pour l'équipe de jour
        consignesNuit: consignes.filter(c => c.equipe === 'nuit').length,  // Nombre de consignes pour l'équipe de nuit
        horsServiceMag1: horsService.filter(hs=>hs.magasin === 'mag1').length,
        horsServiceMag2: horsService.filter(hs=>hs.magasin === 'mag2').length,
        horsServiceMag3: horsService.filter(hs=>hs.magasin === 'mag3').length,
        anomaliesPcf: anomalies.filter(pcf=> anomalies.equipement === 'pcf').length,
        anomaliesBes: anomalies.filter(pcf=> anomalies.equipement === 'bes').length,
        anomaliesIs: anomalies.filter(pcf=> anomalies.equipement === 'is').length,
      };
  
      // Retourner les résultats sous forme de JSON avec un statut 200 OK
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      // Si une erreur se produit, afficher l'erreur et renvoyer un statut 500 avec un message d'erreur
      console.error('Erreur lors de la récupération des données', error);
      return new Response(
        JSON.stringify({ error: 'Erreur du serveur' }),
        { status: 500 }
      );
    }
  }