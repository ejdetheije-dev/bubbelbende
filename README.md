# Bubbelbende

Arcadespel voor de telefoon: een mix van Pong, Bubble Bobble en Space Invaders.

Vang invaders met je bal in een bubbel en knal die bubbel voordat hij ontsnapt. Het tempo blijft gelijk, elke golf brengt een nieuw monster of een nieuwe vaardigheid.

## Spelen
Open `index.html` in een browser, of zet de repo op Netlify of GitHub Pages. Er is geen build-stap nodig.

## Besturing
Schuif met je duim (de paddle volgt je beweging), tik om de bal te lanceren. Op een computer: muis of pijltjestoetsen en spatie.

## Pushover-melding
Als iemand anders 45 seconden speelt of golf 2 haalt, stuurt `netlify/functions/ping.mjs` een Pushover-bericht, plus een bericht met de eindscore.
Zet in Netlify de omgevingsvariabelen `PUSHOVER_TOKEN` en `PUSHOVER_USER`.
Open op je eigen apparaten eenmalig `https://bubbelbende.netlify.app/#ik`, dan tellen die niet mee. Terugdraaien met `#niet-ik`.
