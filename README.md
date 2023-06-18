## Description
- Un jeu fonctionnel se jouant sur un seul écran.
- Une interface lisible qui correspond à la maquette fournie.

## Fonctionnalités
- Le jeu comprend 2 joueurs sur un seul et même écran.
- Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
- À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d’un lancer est ajouté au ROUND.
- Lors de son tour, le joueur peut décider à tout moment de :
  - Cliquer sur l’option "Hold", qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l’autre joueur.
  - Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
- Le premier joueur qui atteint les 100 points sur GLOBAL gagne le jeu.
- Un bouton est disponible pour activer ou désactiver le son du jeu.

## Configuration des joueurs
Lorsque le jeu démarre pour la première fois, les joueurs sont invités à saisir leurs noms.
Lorsque le jeu est relancé, il vérifie si les noms des joueurs sont déjà stockés dans le localStorage. Si c'est le cas, il les récupère et les affiche à l'écran. Sinon, il demande aux joueurs de saisir à nouveau leurs noms.
Si les joueurs laissent le champ vide ou ne saisissent aucun nom, une valeur par défaut sera utilisée à la place. Ainsi, si aucun nom n'est saisi, les valeurs par défaut "Player 1" et "Player 2" seront affichées respectivement pour les joueurs 1 et 2. Veuillez noter que pour modifier les noms des joueurs une fois qu'ils ont été stockés, il suffit de cliquer sur le bouton "New Game" pour réinitialiser le jeu et permettre la saisie de nouveaux noms.

## Utilisation du son
Le jeu comprend un bouton permettant d'activer ou de désactiver le son du jeu. Les joueurs peuvent utiliser ce bouton pour ajuster leurs préférences sonores pendant le jeu.

## Technologies utilisées
- Framework : Bootstrap
- Langages : HTML, CSS, JavaScript
- Outils de développement : GitHub (pour la gestion des branches et le versionnage du projet)