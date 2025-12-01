# HappyDogSights 🌄🐕

Eine moderne Next.js-Anwendung, die hundefreundliche Aussichtspunkte in allen 16 deutschen Bundesländern präsentiert. Entdecke atemberaubende Panoramen und plane deine nächsten Ausflüge mit deinem Vierbeiner!

## ✨ Features

- **16 Bundesländer abgedeckt**: Von den Alpen bis zur Nordsee - alle Regionen Deutschlands
- **Interaktive Karten**: Leaflet-basierte Karten für genaue Standortanzeige
- **Detaillierte Informationen**: Beschreibungen, Bewertungen und Standortdaten für jeden Aussichtspunkt
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Review-System**: Teile deine Erfahrungen und lies Bewertungen anderer Hundebesitzer
- **Moderne UI**: Gebaut mit shadcn/ui und Tailwind CSS für ein elegantes Erlebnis

## 🚀 Technologien

- **Framework**: Next.js 14 mit App Router
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **UI-Komponenten**: shadcn/ui
- **Karten**: Leaflet mit React-Leaflet
- **Icons**: Lucide React
- **Build-Tool**: pnpm
- **Datenbank: Supabase

## 🛠️ Installation & Setup

### Voraussetzungen

- Node.js 18+
- pnpm

### Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone https://github.com/Miichiiii/HappyDogSights.git
   cd HappyDogSights
   ```

2. **Abhängigkeiten installieren**
   ```bash
   pnpm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   pnpm dev
   ```

4. **App öffnen**
   
   Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

### Build für Produktion

```bash
pnpm build
pnpm start
```

## 📱 Verwendung

### Bundesländer erkunden

- Wähle ein Bundesland aus der Übersicht
- Entdecke alle Aussichtspunkte mit interaktiver Karte
- Klicke auf einen Punkt für detaillierte Informationen

### Einzelne Aussichtspunkte

- Detaillierte Beschreibungen und Standortdaten
- Bewertungen und Erfahrungsberichte anderer Besucher
- Direkte Navigation zu Google Maps

## 📂 Projektstruktur

```
├── app/                    # Next.js App Router
│   ├── bundesland/        # Bundesland-Seiten
│   ├── aussichtspunkt/    # Detailseiten für Punkte
│   ├── globals.css        # Globale Styles
│   └── layout.tsx         # Root Layout
├── components/            # Reusable Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   ├── map.tsx           # Karten-Komponente
│   ├── review-section.tsx # Bewertungssektion
│   └── state-map.tsx     # Bundesland-Karte
├── data/                  # Statische Daten
│   ├── viewpoints.ts     # Aussichtspunkt-Daten
│   └── dog-pensions.ts   # Hundepensionen (zukünftig)
├── hooks/                 # Custom React Hooks
├── lib/                   # Utility-Funktionen
└── public/                # Statische Assets
```

## 🎯 Datenstruktur

Die App verwendet strukturierte Daten für alle Aussichtspunkte:

```typescript
interface Viewpoint {
  id: string
  name: string
  city: string
  lat: number
  lng: number
  description: string
  rating?: number
  reviews?: number
}
```

## 🤝 Beitrag

Beiträge sind herzlich willkommen! Hier sind einige Möglichkeiten:

1. **Neue Aussichtspunkte hinzufügen**: Ergänze weitere hundefreundliche Orte
2. **Features erweitern**: Neue Funktionen wie Routenplaner oder Filter
3. **UI/UX verbessern**: Design-Optimierungen und Accessibility
4. **Bugfixes**: Fehler beheben und Performance optimieren

### Beitrag leisten

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE) Datei für Details.

## 🙏 Danksagungen

- **OpenStreetMap** für die Kartendaten
- **shadcn/ui** für die wunderschönen UI-Komponenten
- **Leaflet** für die Mapping-Library
- **Next.js Team** für das fantastische Framework

## 📞 Kontakt

Bei Fragen oder Vorschlägen:
- GitHub Issues: [Issues](https://github.com/Miichiiii/HappyDogSights/issues)
- E-Mail: [Deine E-Mail hier einfügen]

---

**Happy exploring with your dog! 🐕‍🦺✨**
