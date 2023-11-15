# Executer le projet

Dans le gestionnaire d'extension de votre navigateur Chrome et Firefox, installer l'extension "Accessibility Extension".

# Stack technique

Langages : HTML/CSS/JS

# Organisation du projet

# #_Racine du projet_

manifest.json -> Fichier de configuration générale de l'extension au niveau du gestionnaire d'extension

# #_Dossier "src"_

C'est le dossier où se trouve tous le code source de l'extension :

• Dossier "popup"
• background.js -> Fichier de test pour vérifier l'éxécution de l'extension lorsqu'elle est activé
• content.js -> Code fonctionnel des différentes fonctionnalités de l'extension, qui s'éxécuteront sur la page selon la fonctionnalité utilisée

# #_Dossier "popup"_

C'est le dossier contenant toutes les ressources (codes, design, etc) lié au Popup :

    • index.html -> Code de la structure html du contenu du Popup
    • popup.js -> Code de la liaison entre la page et les fonctionnalités de l'extension présent dans le Popup
    • style.css -> Code de stylisation/design du Popup et son contenu

# #_Dossier "admin"_

C'est le dossier contenant toutes les ressources (codes, design, etc) lié à la page de connexion de l'administrateur SI :

    • login.html -> Code de la structure html du contenu de la page de connexion
    • connection.js -> Code du comportement de la page (intéractivité, vérification des valeurs saisies...)
    • admin.css -> Code de stylisation/design de la page de connexion et son contenu
    
# Objectif de l'extension

L'extension permet à n'importe quel utilisateur ayant un handicap d'ordre visuel (perte de vue, difficulté de perception colorimétrique, trouble de la vue...) de naviguer facilement sur une application ou site web à travers un parcours informatif auditif.

# Comment l'utiliser ?

Pour agrandir ou rétrécir la police des textes ainsi que la résolution de l'écran simultanément pour une meilleure lisibilité de lecture, deux boutons "+" (agrandir) et "-" (rétrécir) avec au milieu une information sur la taille généralisé de la page (police de texte et résolution de l'écran).

Chaque clic sur une touche de clavier (ou tactile dans le cas d'un écran de téléphone) guidera l'utilisateur dans la navigation de la solution digitale sur lequel elle a été activée à travers des bulles d'informations visuels dans le cas d'un handicap relevant de troubles ou difficultés liés à la vue et de l'audiodescription dans le cas d'un handicap présentant une incapacité visuelle.

# Tests technique des fonctionnalités (optionnel)

Si vous souhaitez tester les fonctionnalités au niveau technique, il faut tout d'abord se rendre dans le fichier "content.js" et enlever les morceaux de codes sous forme de commentaires (qui commencent par // ).

Ensuite, faites un clic droit avec la souris ou le pad du clavier. Puis rendez vous sur "Inspecter" (ou outils de développement/Inspection de développement) > rubrique "Console".

Lorsque vous éxécuterez l'extension de manière classique, avec la console toujours ouverte, des messages apparaîtront avec les résultats de tests pour chaque fonctionnalités de l'extension. Et pour cela, aller dans le gestionnaire d'extension de Chrome en cliquant sur le puzzle en haut tout à droite puis activé le mode développeur et importer le dossier "IAN-extension" en allant sur "Charger l'extension non empaquetée".