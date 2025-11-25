// components/ViewpointInfo.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ViewpointInfoProps {
  urls: (string | undefined)[];
  lat: number;
  lng: number;
}

export function ViewpointInfo({ urls, lat, lng }: ViewpointInfoProps) {
  const [open, setOpen] = useState(false);
  const validUrls = urls.filter((u) => u);

  if (validUrls.length === 0) return null;

  return (
    <div className="w-full">
      <Button
        variant="outline"
        size="sm"
        className="w-full flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>Weitere Informationen</span>
        <span>{open ? "▲" : "▼"}</span>
      </Button>

      {open && (
        <div className="mt-2 p-3 border rounded-lg bg-muted/50 space-y-2 text-sm">
          {/* Breite, Länge und Webseite nebeneinander */}
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-muted-foreground">
              Breite: <span className="font-mono text-primary">{lat.toFixed(4)}</span>
            </span>
            <span className="text-muted-foreground">
              Länge: <span className="font-mono text-primary">{lng.toFixed(4)}</span>
            </span>
            {validUrls[0] && (
              <a
                href={validUrls[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Webseite zum Ausssichtspunkt
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
