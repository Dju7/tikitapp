import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // Middleware personnalisé (optionnel)
  function middleware(req) {
    // Tu peux ici ajouter des règles personnalisées si nécessaire
    return NextResponse.next()
  },
  {
    // Protection des routes spécifiques
    pages: {
      signIn: '/', // Redirige ici si non connecté
    },
  }
)

// Spécifie les routes protégées
export const config = {
  matcher: ['/board/:path*'], // Protège /board et toutes ses sous-pages
}