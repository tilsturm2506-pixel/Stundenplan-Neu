# Stundenplan BWI1 – Pastell

Minimalistische Neuauflage des Stundenplans. Java-Backend aus dem alten Projekt übernommen, Web-Oberfläche neu gestaltet.

## Aufbau
- `src/main/java` – Scraper (`ScheduleParser`), Filter (`EventFilter`), Ausgabe als `stundenplan.json` / `stundenplan.ics`, Push über ntfy (`Notifier`)
- `web/` – App (eine Datei `index.html`, Offline über `sw.js`)
- `.github/workflows/update.yml` – erzeugt alle 15 Min neue Daten und veröffentlicht auf GitHub Pages

## Lokal ansehen
1. `Main` in IntelliJ ausführen (erzeugt `stundenplan.json`)
2. Datei nach `web/` kopieren und z. B. `python3 -m http.server 8642 --directory web` starten

## Einstellungen im Workflow
- Secret `NTFY_TOPIC` – ntfy-Thema für Push
- Variable `LIVE_URL` (optional) – Adresse der veröffentlichten Seite, falls nicht die alte

## Sicherheit (gegenüber der alten Version verbessert)
- **Content-Security-Policy**: Die Seite lädt Skripte nur noch von sich selbst (kein eingebetteter Code), keine fremden Verbindungen, Formulare oder Plugins.
- **Eingabeprüfung**: Plandaten, Notizen, eigene Termine und Symbole werden vor der Anzeige geprüft und maskiert, damit kein Code eingeschleust werden kann.
- **Offline-Cache** speichert nur erfolgreiche Antworten der eigenen Seite.
- **Backend**: Zeitlimits und Statusprüfung beim Abruf, keine Weiterleitung von HTTPS auf HTTP, Schutz gegen Zeileneinschleusung in der `.ics`-Datei, Prüfung von ntfy-Thema und `LIVE_URL`.
- **jsoup** auf 1.24.1 aktualisiert.
- **Workflow**: Standardmäßig keine Rechte, jeder Job bekommt nur die nötigen; Actions sind auf Commit-Hashes festgelegt; Dependabot meldet Updates.
