# Commandes Google Assistant
Ce repository contient des Google Cloud Functions destinées à la base à être appelé via une commande Google Assitant (via IFTTT). 

## Procédure d'installation de la commande "startClimatisation"

### Google Cloud function
Dans un compte [Google Cloud Plateforme](https://console.cloud.google.com/), créer une nouvelle Cloud Functions avec la configuration suivante:
1. Nom de la fonction: `startClimatisation`
2. Type de déclancheur : `http`
3. Authenticaton: `Authoriser les appels non authentifiés`
4. Cocher `Exiger le protocole HTTPS`
5. Cliquer le bouton `Enregistrer`
5. Ouvrir la sous-section "Runtime, build and connections settings"
6. Dans l'onglet Exécution, ajouter les variables d'environnement suivantes: 
* `username`: nom d'utilisateur du compte Bluelink
* `password`: mot de passe du compte Bluelink
* `pin` : pin à 4 chiffres du compte Bluelink
* `vin` : vin du véhicule
* `basic_user` : un identifiant quelconque pour authoriser seulement l'appel via IFTTT
7. Cliquer le bouton `Suivant`
8. Dans "Environnement d'exécution", choisir `Node.js 10`
9. Dans "Point d'entrée", écrire `startclim`
10. Copier le contenu des fichiers `index.js` et `package.json` de ce repository dans les équivalents de l'éditeur Google Cloud Function
11. Cliquer sur `Déployer`
12. Dans la liste, cliquer sur le titre de la fonction
13. Dans l'onglet `Déclencheur`, copier l'url de déclenchement 

# IFTTT
Dans un compte IFTTT, créer un nouvel Applet avec la configuration suivante: 
1. Dans le `IF`, choisir `Google Assistant` suivi de `Say a simple phrase`. Choisir ensuite la phrase désirée tel que "démarre la voiture"
2. Dans le `THEN`, choisir `WEBHOOK`
    1. URL: Coller l'url de déclenchement obtenu à l'étape 13 de la section précédente. Modifier celle-ci afin d'y ajouter la valeur des variables `basic_user` ainsi que `password` de l'étape 6, pour sécuriser l'appel. L'url final aura le format suivant: `https://basic_user:password@us-central1..../startClimatisation` . Par exemple, si le user est `foo` et le password `bar`, l'url sera `https://foo:bar@.../startClimatisation`
    2. Method: `POST`
    3. Content-type: `application/json`
    4. Body: vide
     