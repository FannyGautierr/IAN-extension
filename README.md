# Executer le projet

Dans le gestionnaire d'extension de votre navigateur Chrome et Firefox, installer l'extension "Accessibility Extension".

# Stack technique

Langages : HTML/CSS/JS

# Organisation du projet

# _Racine du projet_

manifest.json -> Fichier de configuration générale de l'extension au niveau du gestionnaire d'extension

# _Dossier "src"_

C'est le dossier où se trouve tous le code source de l'extension :

• Dossier "popup"
• background.js -> Fichier de test pour vérifier l'éxécution de l'extension lorsqu'elle est activé
• content.js -> Code fonctionnel des différentes fonctionnalités de l'extension, qui s'éxécuteront sur la page selon la fonctionnalité utilisée

# _Dossier "popup"_

C'est le dossier contenant toutes les ressources (codes, design, etc) lié au Popup :

    • index.html -> Code de la structure html du contenu du Popup
    • popup.js -> Code de la liaison entre la page et les fonctionnalités de l'extension présent dans le Popup
    • setup.html -> Code de la structure html du contenu de la fenêtre de setup pour la lecture à voix haute
    • setup.js -> Code du comportement de la page de setup pour la lecture à voix haute (intéractivité, lancement de la lecture, sélection personnalisé d'un contenu précis...)
    • style.css -> Code de stylisation/design du Popup + Setup et leurs contenus

# _Dossier "admin"_ (optionnel)

C'est le dossier contenant toutes les ressources (codes, design, etc) lié à la page de connexion de l'administrateur SI :

    • login.html -> Code de la structure html du contenu de la page de connexion
    • connection.js -> Code du comportement de la page (intéractivité, vérification des valeurs saisies...)
    • admin.css -> Code de stylisation/design de la page de connexion et son contenu
    
# Objectif de l'extension

L'extension permet à n'importe quel utilisateur ayant un handicap d'ordre visuel (perte de vue, difficulté de perception colorimétrique, trouble de la vue...) de naviguer facilement sur une application ou site web à travers un parcours informatif auditif.
D'autres fonctionnalités sont évidemment comprises comme le changement du positionnement du contenu de la page pour une visualisation personnalisé ainsi que l'agrandissement/rétrécissement de la taille des polices en entier et simultanément. Pour des handicap lié à la perceotion colorimétrique, l'extension offre une saturation automatique de la page pour une meilleure visibilité du contenu.

# Comment l'utiliser ?

Pour agrandir ou rétrécir la police des textes ainsi que la résolution de l'écran simultanément pour une meilleure lisibilité de lecture, deux boutons "+" (agrandir) et "-" (rétrécir) avec au milieu une information sur la taille généralisé de la page (police de texte et résolution de l'écran).

Les boutons fléchés permettent de centrer le contenu souhaiter sans aucune modification vers la gauche ou la droite selon l'envie de l'utilisateur afin de centrer le contenu avec précision.

Le bouton Picker permet tout d'abord au configurateur de l'onboarding de séléctionner le contenu à lire par section afin de mettre en place le parcours de lecture puis la lecture a voix haute est appliqué une fois le Picker désactivé.

Pour une conformité des contrastes adpaté aux utilisateurs avec une perception colorimétrique défaillant se réalisera avec une simple activation du mode de saturation automatique à travers le bouton de la section "Activated defined contrasts"

# Tests technique des fonctionnalités (optionnel)

Si vous souhaitez tester les fonctionnalités au niveau technique, il faut tout d'abord se rendre dans le fichier "content.js" et enlever les morceaux de codes sous forme de commentaires (qui commencent par // ).

Ensuite, faites un clic droit avec la souris ou le pad du clavier. Puis rendez vous sur "Inspecter" (ou outils de développement/Inspection de développement) > rubrique "Console".

Lorsque vous éxécuterez l'extension de manière classique, avec la console toujours ouverte, des messages apparaîtront avec les résultats de tests pour chaque fonctionnalités de l'extension. Et pour cela, aller dans le gestionnaire d'extension de Chrome en cliquant sur le puzzle en haut tout à droite puis activé le mode développeur et importer le dossier "IAN-extension" en allant sur "Charger l'extension non empaquetée".