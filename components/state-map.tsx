'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Map } from '@/components/map'

interface StateMapProps {
  viewpoints: Array<{ id: string; name: string; lat: number; lng: number; city: string }>
}

export function StateMap({ viewpoints }: StateMapProps) {
  if (!viewpoints || viewpoints.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Übersichtskarte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
            Keine Aussichtspunkte verfügbar
          </div>
        </CardContent>
      </Card>
    )
  }

  const centerLat = viewpoints.reduce((sum, v) => sum + v.lat, 0) / viewpoints.length
  const centerLng = viewpoints.reduce((sum, v) => sum + v.lng, 0) / viewpoints.length

  const markers = viewpoints.map(v => ({
    lat: v.lat,
    lng: v.lng,
    title: v.name,
    type: 'viewpoint' as const,
    id: v.id
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Übersichtskarte - {viewpoints.length} Aussichtspunkte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96">
          <Map latitude={centerLat} longitude={centerLng} zoom={7} markers={markers} />
        </div>
      </CardContent>
    </Card>
  )
}
