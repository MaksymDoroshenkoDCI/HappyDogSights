'use client'

interface SimpleMapProps {
  viewpoints: Array<{ id: string; name: string; lat: number; lng: number; city: string }>
  title?: string
}

export function SimpleMap({ viewpoints, title }: SimpleMapProps) {
  if (!viewpoints || viewpoints.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        Keine Aussichtspunkte verfügbar
      </div>
    )
  }

  // Calculate bounds
  const lats = viewpoints.map(v => v.lat)
  const lngs = viewpoints.map(v => v.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const centerLat = (minLat + maxLat) / 2
  const centerLng = (minLng + maxLng) / 2

  // Simple projection for SVG
  const width = 100
  const height = 100
  const latRange = maxLat - minLat || 1
  const lngRange = maxLng - minLng || 1

  const latToY = (lat: number) => {
    return ((maxLat - lat) / latRange) * height
  }

  const lngToX = (lng: number) => {
    return ((lng - minLng) / lngRange) * width
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-background border border-border">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-96 bg-blue-50">
        {/* Background */}
        <rect width={width} height={height} fill="#f0f9ff" />

        {/* Grid */}
        {[...Array(5)].map((_, i) => {
          const y = (i / 4) * height
          const x = (i / 4) * width
          return (
            <g key={`grid-${i}`}>
              <line x1="0" y1={y} x2={width} y2={y} stroke="#e0e7ff" strokeWidth="0.2" />
              <line x1={x} y1="0" x2={x} y2={height} stroke="#e0e7ff" strokeWidth="0.2" />
            </g>
          )
        })}

        {/* Markers */}
        {viewpoints.map((viewpoint) => {
          const x = lngToX(viewpoint.lng)
          const y = latToY(viewpoint.lat)
          return (
            <g key={viewpoint.id}>
              {/* Circle background */}
              <circle cx={x} cy={y} r="1.2" fill="#22c55e" opacity="0.8" />
              {/* Outer ring */}
              <circle cx={x} cy={y} r="1.2" fill="none" stroke="#16a34a" strokeWidth="0.3" />
              {/* Inner dot */}
              <circle cx={x} cy={y} r="0.4" fill="white" />
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="p-4 bg-background border-t border-border">
        <div className="text-sm font-semibold mb-3">
          {title || `${viewpoints.length} Aussichtspunkte`}
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {viewpoints.map((viewpoint) => (
            <div key={viewpoint.id} className="flex items-start gap-2 text-xs">
              <div className="w-3 h-3 mt-0.5 text-primary flex-shrink-0 font-bold">📍</div>
              <div className="line-clamp-2">
                <div className="font-medium">{viewpoint.name}</div>
                <div className="text-muted-foreground">{viewpoint.city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
