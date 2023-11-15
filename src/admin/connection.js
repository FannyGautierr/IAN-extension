const id = document.getElementById("ID").value;
const mdp = document.getElementById("mdp").value;
const form = document.querySelector("form");

// Vérification du login
function connexion(e) {
    e.preventDefault();
    // L'idée est d'avoir une base de données dans lequel les comptes admin sont stockés, ce tableau n'est qu'un exemple de moyen de vérification
    const db = [{ username: "admin", password: "adminmdp" }, { username: "admin5", password: "adminmdp5" }, { username: "admin3", password: "adminmdp3" }]

    // Vérification de la correspondance de l'identifiant et mot de passe saisies avec ceux de la base de données 
    db.map((user) => {
        if(user.username === id && user.password === mdp) {
            window.history.back
        } else {
            document.getElementById("errorMessage").hidden = false;
        }
    })
}

// Actionnement de la vérification depuis le formulaire de connexion
form.addEventListener("submit", (e) => {
    connexion(e);
});