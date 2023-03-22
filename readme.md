
# Concours 4 : Utilisation d'une API REST dans une création web

Ceci est ma réalisation pour le concours numéro 4 du discord Le Repaire du web.

## Instructions

Début du concours     :   Lundi 20 Février,   10h00.
Fin des participations :  Dimanche 5 Mars,  23h59.


 ⚠️  ATTENTION : ⚠️ 

Votre travail doit être ORIGINAL et UNIQUE, autant au niveau du DESIGN que du CODE.
Aucune ressemblance avec quoique ce soit sur le web n'est tolérée, sous peine d'être exclu du concours.
Partez d'une feuille blanche et tentez de tout créer de A à Z, on doit pouvoir sentir instantanément que tout vient de vous.

Votre création doit également être faite spécialement pour le concours, dans le temps imparti.
Il est interdit d'utiliser une création qu'on aurait déjà faite, et de participer à un concours avec.
Ce serait injuste envers ceux qui participent dans le temps imparti.


Description :

Une API REST permet, à l'aide d'une requête HTTP, d'obtenir des données et de les utiliser sur une page web.

À partir de là, tout est possible, vous pouvez coder une page vous montrant les cours de la bourse, le trajet des avions, la météo, des musiques, le résultat des matchs de n'importe quel sport, etc etc ...

Certaines APIs sont payantes, d'autres gratuites.

Pour vous aider, voici plusieurs listes d'APIs gratuites, soyez inventifs et essayez de créer quelque chose d'unique et d'original.

Liste d'APIs gratuites :
- https://github.com/public-apis/public-apis
- https://rapidapi.com/collection/list-of-free-apis
- https://apilist.fun/
- Etc ... (Faîtes vos propres recherches si vous ne trouvez pas votre bonheur).


Technologies :

Vous pouvez choisir les technos web que vous voulez, mais ayez à l'esprit que le choix des technologies est aussi jugé, ne cherchez pas à impressionner le jury en utilisant des technos vues comme complexes alors qu'elles n'ont aucun rapport avec le thème en cours.
L'utilisation d'SVGs ou de médias pour habiller votre page est recommandée, mais essayez de les créer un maximum tout seul, avec Figma ou Illustrator par exemple.

Créer ses propres médias améliorera énormément votre classement.

Si vous utilisez des médias que vous n'avez pas créé, essayez de les personnaliser un maximum.
Ce n'est pas la photo de fond de XXX trouvée sur Unsplash qui est notée, mais votre création 👍 .


Règles :

Tout est expliqué en détail ici : https://discord.com/channels/655077317911117860/1041772919266750616

Bon code, soyez créatif et amusez-vous !

## Mon message de participation

Bonjour à tous,
quand j'ai vu le thème, je me suis dit que je ne pourrais pas mettre le Pokédex que j'ai fais pour mon fils de 3ans, pourtant je le trouve super., mais je l'ai fait trop tôt.. J'ai donc cherché un truc à faire pour ma fille de 6 ans.

J'ai eu beaucoup de mal à trouver quelque chose qui me plaisait. Puis je suis tombé sur l'API restcountries qui donne des infos sur les pays. Du coup, pourquoi pas un peu de géographie !

Je me suis dit pourquoi pas partir des drapeaux ? On clique sur un drapeau et ça nous donne les infos sur le pays. Mais je trouvais qu’il n’y avait pas énormément d’infos intéressantes pour un enfant de 6 ans. Donc pourquoi ne pas mettre la météo avec pour voir la différence entre nos pays. Je fais donc un appel à une API de météo pour donner le temps qu’il fait dans la capital du dit pays.

C’est sympa, mais même moi certains pays je ne saurais les situer sur une carte. Ni une ni deux je rajoute une carte ! Et voilà ce que ça donne !

J'ai voulu ajouter l'heure dans la capitale, mais j'ai une erreur CORS avec l'API timeapi que je n'arrive pas à régler... Si j'amais quelqu'un à la solution. Je vais essayer de trouver de mon coté mais ce sera forcément après la fin du concours...

Site : https://clementbellier.github.io/decouvre-les-pays/
Code : https://github.com/ClementBellier/decouvre-les-pays

Je l’ai fait en pur HTML/CSS/JS (je voulais voir si j’avais encore les bases du JS, et bah ça m’a fait du bien d’en refaire!).
J’ai utilisé Leaflet pour les cartes d’OpenStreetMap.
Pour les icones de météo, je suis parti du travail de Ladalle CS sur https://www.iconfinder.com/iconsets/weather-flat-14 et je les ai retravaillées pour qu'elles soient facilement affichables.

J’espère que ça va vous plaire autant que ça plaît à ma fille !