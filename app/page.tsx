'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { states, viewpointsByState } from '@/data/viewpoints'
import { Search, MapPin, Heart } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Aussichtspunkte.de</h1>
              <p className="text-sm text-muted-foreground">Schöne Ausblicke & Hundepensionen</p>
            </div>
            <nav className="flex gap-2">
              <Button variant="outline" size="sm">DE</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Entdecke Deutschlands schönste Aussichtspunkte</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Über 320 Aussichtspunkte in 16 Bundesländern. Mit detaillierten Informationen zu Hundepensionen in der Nähe.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Nach Bundesland oder Aussichtspunkt suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white"
            />
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((state) => (
            <Link key={state.name} href={`/bundesland/${state.name}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-primary group-hover:text-accent transition-colors">
                    {state.displayName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{viewpointsByState[state.name]?.length || 0} Aussichtspunkte</span>
                    </div>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {state.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredStates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Keine Bundesländer gefunden</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-secondary/10 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-12">Warum Aussichtspunkte.de?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Interaktive Karten</h4>
              <p className="text-sm text-muted-foreground">Finde Aussichtspunkte und Hundepensionen auf der Karte</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Bewertungen</h4>
              <p className="text-sm text-muted-foreground">Lese Erfahrungen anderer Besucher und gib selbst Bewertungen</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Hundepensionen</h4>
              <p className="text-sm text-muted-foreground">Zuverlässige Betreuung für deinen Hund in der Nähe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Aussichtspunkte.de. Alle Rechte vorbehalten.</p>
            <nav className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Datenschutz</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Impressum</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Kontakt</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
