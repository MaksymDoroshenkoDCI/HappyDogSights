"use client";

import { useState, use } from "react";
import Link from "next/link";
import { viewpointsByState, states } from "@/data/viewpoints";
import { StateMap } from "@/components/state-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronLeft, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StatePage({
  params,
}: {
  params: Promise<{ state: string; locale: string }>;
}) {
  const { state, locale } = use(params);
  const [searchQuery, setSearchQuery] = useState("");
  const decodedState = decodeURIComponent(state);

  const stateInfo = states.find((s) => s.name === decodedState);
  const viewpoints = viewpointsByState[decodedState] || [];

  const filteredViewpoints = viewpoints.filter((v) => {
    const query = searchQuery.toLowerCase();
    return (
      v.name.toLowerCase().includes(query) ||
      v.city.toLowerCase().includes(query) ||
      v.description.toLowerCase().includes(query) ||
      v.id.toLowerCase().includes(query) // пошук по aussichtspunkt (ID/slug)
    );
  });

  if (!stateInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bundesland nicht gefunden</h1>
          <Link href="/">
            <Button>Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Link>
          <h1 className="text-2xl font-bold text-primary">
            {stateInfo.displayName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {stateInfo.description}
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Input
            placeholder="Nach Aussichtspunkt suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <StateMap viewpoints={filteredViewpoints} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredViewpoints.map((viewpoint) => (
            <Link
              key={viewpoint.id}
              href={`/${locale}/aussichtspunkt/${viewpoint.id}`}
            >
              <Card className="h-full hover:shadow-xl transition-all cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">
                        {viewpoint.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {viewpoint.city}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {viewpoint.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredViewpoints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Keine Aussichtspunkte gefunden
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
