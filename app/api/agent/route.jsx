import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const agents = await db.agent.findMany({
      orderBy: { nom: "asc" },
    });

    return new Response(JSON.stringify(agents), { status: 200 });
  } catch (error) {
    console.error("[GET /api/agent]", error?.message || error || "Erreur inconnue");
    return new Response("Erreur lors de la récupération des agents", { status: 500 });
  }
}



// ✅ POST : Créer un nouvel agent
export async function POST(req) {
  const { nom, prenom, fonction } = await req.json();

  console.log("Agent reçu:", { nom, prenom, fonction });

  // Validation minimale
  if (!nom || !prenom || !fonction) {
    return new Response("Champs requis manquants", { status: 400 });
  }

  try {
    const newAgent = await db.agent.create({
      data: {
        nom,
        prenom,
        fonction, // Doit être une valeur valide de l'enum Fonction
        statut: "FIN_DE_SERVICE",
        priseService: null,
        finService: null,
      },
    });

    return new Response(JSON.stringify(newAgent), { status: 201 });
  } catch (error) {
    console.error("[POST /api/agents]", error);
    return new Response("Erreur lors de la création de l’agent", { status: 500 });
  }
}


// ✅ PUT : Mis à jour statut
export async function PUT(req) {
  const body = await req.json();
  console.log("Données reçues du front :", body);

  const { nom, statutDemande } = body;

  if (!nom || !statutDemande) {
    return new Response(
      JSON.stringify({ error: "Nom et statutDemandé sont requis" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!["EN_SERVICE", "FIN_DE_SERVICE"].includes(statutDemande)) {
    return new Response(
      JSON.stringify({ error: "Statut demandé invalide" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const agent = await db.agent.findFirst({ where: { nom } });

    if (!agent) {
      return new Response(
        JSON.stringify({ error: "Agent non trouvé" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("agent.id =", agent.id);

    if (agent.statut === statutDemande) {
      return new Response(
        JSON.stringify({ error: `Agent déjà en statut ${statutDemande}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    const dataToUpdate = { statut: statutDemande };

    if (statutDemande === "EN_SERVICE") {
      dataToUpdate.priseService = now;
      dataToUpdate.finService = null;
    } else {
      dataToUpdate.finService = now;
      dataToUpdate.priseService = null;
    }

    const updatedAgent = await db.agent.update({
      where: { id: agent.id },
      data: dataToUpdate,
    });

    return new Response(JSON.stringify(updatedAgent), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PUT /api/agent]", error);
    return new Response(
      JSON.stringify({ error: "Erreur serveur" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


