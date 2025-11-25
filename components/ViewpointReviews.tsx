// components/ViewpointReviews.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ViewpointReviewsProps {
  initialReviews?: number;
  averageRating?: number;
}

export function ViewpointReviews({ initialReviews, averageRating }: ViewpointReviewsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Aufklappbarer Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>Bewertungen & Rezensionen</span>
        <span>{open ? "▲" : "▼"}</span>
      </Button>

      {/* Inhalt beim Aufklappen */}
      {open && (
        <div className="mt-2 p-3 border rounded-lg bg-muted/50 space-y-2 text-sm">
          <p className="text-muted-foreground">
            Hier kommen später alle Bewertungen aus Supabase rein.
          </p>
          {/* Später: Anzeige der Bewertungen, Sterne, Formular zum Schreiben */}
        </div>
      )}
    </div>
  );
}
