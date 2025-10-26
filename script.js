class WebDevAdventure {
    constructor() {
        this.config = {
            audioVolume: 0.3,
            transitionDelay: 400,
            minScoreForCompletion: 0.7
        };

        this.state = {
            currentLevel: 0,
            currentQuestion: 0,
            score: 0,
            userProgress: this.loadProgress(),
            audioEnabled: false // Désactivé par défaut
        };

        this.elements = this.cacheDOM();
        this.levels = this.getLevelsData();
        this.attachEventListeners();
        this.setupAudioControls();
        this.startApplication();
    }

    cacheDOM() {
        return {
            screens: {
                welcome: document.getElementById('welcomeScreen'),
                levels: document.getElementById('levelScreen'),
                course: document.getElementById('courseScreen'),
                quiz: document.getElementById('quizScreen'),
                results: document.getElementById('resultScreen')
            },
            buttons: {
                start: document.getElementById('startBtn'),
                startQuiz: document.getElementById('startQuizBtn'),
                nextQuiz: document.getElementById('nextQuizBtn'),
                prevQuiz: document.getElementById('prevQuizBtn'),
                prevCourse: document.getElementById('prevCourseBtn'),
                replay: document.getElementById('replayBtn')
            },
            content: {
                courseTitle: document.getElementById('courseTitle'),
                courseContent: document.getElementById('courseContent'),
                questionText: document.getElementById('questionText'),
                optionsContainer: document.getElementById('optionsContainer'),
                feedback: document.getElementById('feedback'),
                finalScore: document.getElementById('finalScore'),
                totalQuestions: document.getElementById('totalQuestions'),
                stars: document.getElementById('stars'),
                levelsContainer: document.getElementById('levelsContainer'),
                progressFill: document.getElementById('progressFill')
            },
            media: {
                courseImage: document.getElementById('courseImage'),
                quizImage: document.getElementById('quizImage'),
                welcomeMusic: document.getElementById('welcomeMusic'),
                courseMusic: document.getElementById('courseMusic'),
                quizMusic: document.getElementById('quizMusic'),
                resultMusic: document.getElementById('resultMusic')
            }
        }; 
    }

    setupAudioControls() {
        const audioToggle = document.getElementById('audioToggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                this.toggleAudio();
            });
            this.updateAudioButton();
        }
    }

    toggleAudio() {
        this.state.audioEnabled = !this.state.audioEnabled;
        
        if (this.state.audioEnabled) {
            console.log('Audio activé par utilisateur');
            this.playAudio(this.elements.media.welcomeMusic);
        } else {
            console.log('Audio désactivé');
            this.stopAllAudio();
        }
        
        this.updateAudioButton();
    }

    updateAudioButton() {
        const audioToggle = document.getElementById('audioToggle');
        if (!audioToggle) return;
        
        const icon = audioToggle.querySelector('.audio-icon');
        const text = audioToggle.querySelector('.audio-text');
        
        if (this.state.audioEnabled) {
            audioToggle.classList.add('audio-enabled');
            icon.textContent = '🔊';
            text.textContent = 'Audio Activé';
        } else {
            audioToggle.classList.remove('audio-enabled');
            icon.textContent = '🔇';
            text.textContent = 'Activer l\'Audio';
        }
    }
    getLevelsData() {
        return [
            {
                id: 'html',
                title: 'HTML - Les Legos du Web',
                description: 'Apprends à construire des pages web comme avec des Legos !',
                courseImage: 'html.png',
                content: `APPRENDS HTML COMME DES LEGOS ! 

Salut petit génie ! 
Aujourd'hui, on va apprendre à construire des sites web comme on construit avec des Legos !

    LES BALISES, CE SONT NOS BRIQUES :

&lt;html&gt;   → La grande boîte de Legos
&lt;head&gt;   → Les instructions de montage  
&lt;body&gt;   → La construction principale
&lt;h1&gt;     → Un gros titre important
&lt;p&gt;      → Un paragraphe de texte
&lt;img&gt;    → Une image ou photo

  CONSTRUISONS NOTRE PREMIÈRE MAISON WEB :

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Ma super page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Bonjour les amis !&lt;/h1&gt;
    &lt;p&gt;Je m'appelle [ton prénom]&lt;/p&gt;
    &lt;p&gt;J'adore les jeux vidéo et les glaces !&lt;/p&gt;
    &lt;img src="mon-image.jpg" alt="Ma photo"&gt;
&lt;/body&gt;
&lt;/html&gt;

 COMMENT FAIRE DES LIENS MAGIQUES :

&lt;a href="https://google.com"&gt;
    Clique ici pour aller sur Google !
&lt;/a&gt;

C'est comme un portail magique ! 

 LES LISTES POUR RANGER SES IDÉES :

Liste de mes jeux préférés :
&lt;ul&gt;
    &lt;li&gt;Minecraft&lt;/li&gt;
    &lt;li&gt;Roblox&lt;/li&gt;
    &lt;li&gt;Fortnite&lt;/li&gt;
&lt;/ul&gt;

Liste de choses à faire :
&lt;ol&gt;
    &lt;li&gt;Faire mes devoirs&lt;/li&gt;
    &lt;li&gt;Jouer dehors&lt;/li&gt;
    &lt;li&gt;Manger un goûter&lt;/li&gt;
&lt;/ol&gt;

 AJOUTONS DE LA COULEUR AVEC DES ATTRIBUTS :

&lt;img src="dragon.jpg" alt="Un dragon cool"&gt;
&lt;a href="page2.html" title="Va à la page 2"&gt;Suis-moi !&lt;/a&gt;

 LES TABLEAUX COMME À L'ÉCOLE :

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Prénom&lt;/th&gt;
        &lt;th&gt;Âge&lt;/th&gt;
        &lt;th&gt;Animal préféré&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Léo&lt;/td&gt;
        &lt;td&gt;9 ans&lt;/td&gt;
        &lt;td&gt;Dragon&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Chloé&lt;/td&gt;
        &lt;td&gt;8 ans&lt;/td&gt;
        &lt;td&gt;Licorne&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;

 ASTUCES DE PETIT GÉNIE :
• Chaque balise s'ouvre &lt;commeça&gt; et se ferme &lt;/commeça&gt;
• On peut imbriquer les balises comme des poupées russes
• Le HTML c'est la structure, comme les murs d'une maison

 FÉLICITATIONS ! Tu sais maintenant construire des pages web !`,
                questions: [
                    {
                        question: "Quelle balise utilise-t-on pour un gros titre ?",
                        options: ["&lt;h1&gt;", "&lt;titre&gt;", "&lt;gros&gt;", "&lt;header&gt;"],
                        correctAnswer: 0,
                        explanation: "Bravo ! &lt;h1&gt; c'est pour les titres les plus importants !",
                        quizImage: "html.png"
                    },
                    {
                        question: "Comment fait-on un lien vers un autre site ?",
                        options: ["&lt;a href=...&gt;", "&lt;lien&gt;", "&lt;lien href=...&gt;", "&lt;connect&gt;"],
                        correctAnswer: 0,
                        explanation: "Super ! &lt;a&gt; avec href crée des liens magiques !",
                        quizImage: "html.png"
                    },
                    {
                        question: "Quelle balise montre une image ?",
                        options: ["&lt;img&gt;", "&lt;image&gt;", "&lt;photo&gt;", "&lt;picture&gt;"],
                        correctAnswer: 0,
                        explanation: "Génial ! &lt;img&gt; affiche tes photos et images préférées !",
                        quizImage: "html.png"
                    }
                ]
            },
            {
                id: 'css-enfant',
                title: 'CSS - La Magie des Couleurs',
                description: 'Décore tes pages avec des couleurs et des animations !',
                courseImage: 'css.png',
                content: ` LA MAGIE CSS POUR DÉCORER TES PAGES ! 

Salut artiste ! 
Maintenant que tu sais construire, apprenons à décorer !

 CHANGEONS LES COULEURS COMME PAR MAGIE :

body {
    background-color: lightblue;   ← Fond bleu ciel
    color: darkblue;              ← Texte bleu foncé
}

h1 {
    color: red;                   ← Titres en rouge
    font-size: 40px;             ← Texte très gros
}

 JOUONS AVEC LES POLICES :

.texte-marrant {
    font-family: "Comic Sans MS"; ← Police rigolote
    font-size: 20px;             ← Taille moyenne
    font-weight: bold;           ← En gras
}

.texte-danseur {
    font-style: italic;          ← En italique
    text-decoration: underline;  ← Souligné
}

 ANIMATIONS MAGIQUES :

@keyframes danser {
    0%   { transform: rotate(0deg); }
    25%  { transform: rotate(10deg); }
    75%  { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
}

.titre-danseur {
    animation: danser 1s infinite;
    color: purple;
}

 POSITIONNONS NOS ÉLÉMENTS :

.boite {
    width: 200px;       ← Largeur
    height: 100px;      ← Hauteur
    margin: 20px;       ← Marge extérieure
    padding: 15px;      ← Marge intérieure
    border: 3px solid green; ← Bordure verte
}

  FLEXBOX - LE SUPER POUVOIR :

.container {
    display: flex;
    justify-content: center;   ← Centre horizontalement
    align-items: center;       ← Centre verticalement
    gap: 10px;                 ← Espace entre les éléments
}

.item {
    flex: 1;                  ← Prend la place disponible
    background: orange;
    padding: 10px;
}

🎡 CRÉONS DES BOUTONS MAGIQUES :

.bouton-special {
    background: linear-gradient(to right, red, orange);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 25px;       ← Coins arrondis
    cursor: pointer;
    transition: all 0.3s;      ← Animation fluide
}

.bouton-special:hover {
    transform: scale(1.1);     ← Grossit au survol
    box-shadow: 0 5px 15px rgba(255,0,0,0.3);
}

 DÉGRADÉS DE COULEURS :

.arc-en-ciel {
    background: linear-gradient(45deg, 
        red, orange, yellow, green, blue, purple);
    background-size: 400% 400%;
    animation: arcenciel 3s ease infinite;
}

@keyframes arcenciel {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

 EXEMPLE COMPLET :

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;
        body {
            background: lightyellow;
            font-family: Arial;
            text-align: center;
        }
        
        .titre-magique {
            color: #ff6b6b;
            font-size: 50px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .bouton-fun {
            background: #4ecdc4;
            color: white;
            padding: 15px;
            border-radius: 20px;
            border: none;
            font-size: 20px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1 class="titre-magique"&gt;Ma Page Magique !&lt;/h1&gt;
    &lt;button class="bouton-fun"&gt;Clique-moi !&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;

 ASTUCES DE PETIT ARTISTE :
• CSS c'est comme une boîte de peinture géante
• On peut animer presque tout !
• Les couleurs s'écrivent en anglais ou en code (#FF0000 = rouge)

 FÉLICITATIONS ! Tu es maintenant un magicien du CSS !`,
                questions: [
                    {
                        question: "Comment change-t-on la couleur d'arrière-plan ?",
                        options: ["background-color", "color-background", "bg-color", "back-color"],
                        correctAnswer: 0,
                        explanation: "Excellent ! background-color change la couleur de fond !",
                        quizImage: "css.png"
                    },
                    {
                        question: "Quelle propriété fait bouger un élément ?",
                        options: ["animation", "move", "bouger", "mouvement"],
                        correctAnswer: 0,
                        explanation: "Super ! animation permet de créer des mouvements magiques !",
                        quizImage: "css.png"
                    },
                    {
                        question: "Comment centre-t-on du texte ?",
                        options: ["text-align: center", "center: text", "align: center", "text-center: true"],
                        correctAnswer: 0,
                        explanation: "Génial ! text-align: center centre parfaitement le texte !",
                        quizImage: "css.png"
                    }
                ]
            },
            {
                id: 'javascript-enfant',
                title: 'JavaScript - La Magie Interactive',
                description: 'Rends tes pages vivantes et interactives !',
                courseImage: 'js.png',
                content: ` JAVASCRIPT - LA MAGIE INTERACTIVE ! 

Salut petit magicien ! 
Avec JavaScript, tu vas pouvoir animer tes pages !

 LES VARIABLES - MES PETITS SACS MAGIQUES :

let prenom = "Léo";          ← Un sac avec mon prénom
let age = 9;                 ← Un sac avec mon âge
let estContent = true;       ← Un sac vrai/faux

console.log(prenom);         ← Montre "Léo"
console.log(age);            ← Montre 9

  LES NOMBRES ET CALCULS :

let bonbons = 10;
let amis = 3;
let bonbonsParAmi = bonbons / amis;  ← 3.33 bonbons chacun !

let scoreJeu = 0;
scoreJeu = scoreJeu + 10;    ← Ajoute 10 points
scoreJeu += 5;               ← Ajoute 5 points (raccourci)

 LES FONCTIONS - MES SORTS MAGIQUES :

function direBonjour() {
    alert("Bonjour les amis ! ");
}

function additionner(a, b) {
    return a + b;
}

let resultat = additionner(5, 3);  ← Donne 8

  INTERAGIR AVEC LA PAGE :

// Quand on clique sur le bouton
document.getElementById("monBouton").onclick = function() {
    alert("Youpi ! Tu as cliqué ! ");
};

// Changer le texte d'un élément
document.getElementById("titre").innerHTML = "Nouveau titre !";

// Changer le style
document.body.style.backgroundColor = "lightgreen";

 CRÉONS UN MINI-JEU :

let score = 0;

function ajouterPoint() {
    score += 1;
    document.getElementById("score").innerHTML = "Score : " + score;
    
    if (score >= 10) {
        alert(" Bravo ! Tu as gagné !");
    }
}

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
    &lt;h1&gt;Mon Jeu Super Fun !&lt;/h1&gt;
    &lt;p id="score"&gt;Score : 0&lt;/p&gt;
    &lt;button onclick="ajouterPoint()"&gt;Clique-moi !&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;

 ANIMATIONS AVEC JAVASCRIPT :

let position = 0;

function deplacerDroite() {
    let element = document.getElementById("monImage");
    position += 10;
    element.style.marginLeft = position + "px";
}

function faireClignoter() {
    let element = document.getElementById("titre");
    element.style.color = 
        element.style.color === "red" ? "blue" : "red";
}

// Clignote toutes les 500ms
setInterval(faireClignoter, 500);

 GESTION DES ÉVÉNEMENTS :

// Quand la souris passe sur l'élément
element.onmouseover = function() {
    this.style.transform = "scale(1.2)";
};

// Quand la souris quitte l'élément  
element.onmouseout = function() {
    this.style.transform = "scale(1)";
};

// Quand on tape au clavier
document.onkeypress = function(event) {
    console.log("Touche pressée : " + event.key);
};

  EXEMPLE COMPLET - COMPTEUR MAGIQUE :

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;style&gt;
        .compteur {
            font-size: 60px;
            color: #ff6b6b;
            text-align: center;
        }
        button {
            padding: 15px 30px;
            font-size: 20px;
            margin: 10px;
            border-radius: 15px;
            border: none;
            cursor: pointer;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="compteur" id="nombre"&gt;0&lt;/div&gt;
    &lt;button onclick="augmenter()"&gt;+1&lt;/button&gt;
    &lt;button onclick="diminuer()"&gt;-1&lt;/button&gt;
    &lt;button onclick="reset()"&gt;Recommencer&lt;/button&gt;

    &lt;script&gt;
        let nombre = 0;

        function augmenter() {
            nombre += 1;
            mettreAJour();
        }

        function diminuer() {
            nombre -= 1;
            mettreAJour();
        }

        function reset() {
            nombre = 0;
            mettreAJour();
        }

        function mettreAJour() {
            document.getElementById("nombre").innerHTML = nombre;
            
            // Change la couleur selon le nombre
            if (nombre > 0) {
                document.getElementById("nombre").style.color = "green";
            } else if (nombre < 0) {
                document.getElementById("nombre").style.color = "red";
            } else {
                document.getElementById("nombre").style.color = "#ff6b6b";
            }
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

 ASTUCES DE PETIT MAGICIEN :
• JavaScript rend les pages vivantes
• On peut réagir aux clics, mouvements, etc.
• C'est le langage qui fait bouger le web !

 FÉLICITATIONS ! Tu sais maintenant programmer en JavaScript !`,
                questions: [
                    {
                        question: "Comment stocke-t-on une information ?",
                        options: ["let nom = ...", "variable nom = ...", "info nom = ...", "stock nom = ..."],
                        correctAnswer: 0,
                        explanation: "Parfait ! let permet de créer des variables !",
                        quizImage: "js.png"
                    },
                    {
                        question: "Comment réagit-on à un clic ?",
                        options: ["onclick", "onclicked", "click", "whenclick"],
                        correctAnswer: 0,
                        explanation: "Super ! onclick détecte les clics !",
                        quizImage: "js.png"
                    },
                    {
                        question: "Comment affiche-t-on un message ?",
                        options: ["alert()", "message()", "show()", "display()"],
                        correctAnswer: 0,
                        explanation: "Génial ! alert() montre un message pop-up !",
                        quizImage: "js.png"
                    }
                ]
            },
            {
                id: 'creativite-enfant',
                title: 'Crée Ton Premier Jeu !',
                description: 'Utilise tout ce que tu as appris pour créer un jeu !',
                courseImage: 'game.png',
                content: ` CRÉE TON PREMIER JEU VIDÉO ! 

Salut gameur ! 
Maintenant, créons ensemble un vrai jeu !

  NOTRE JEU : ATTRAPE LES ÉTOILES 

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Attrape les Étoiles !&lt;/title&gt;
    &lt;style&gt;
        body {
            margin: 0;
            background: linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d);
            font-family: 'Comic Sans MS', cursive;
            text-align: center;
            overflow: hidden;
        }
        
        #jeu {
            position: relative;
            width: 800px;
            height: 500px;
            margin: 20px auto;
            border: 4px solid #fff;
            border-radius: 15px;
            background: rgba(0,0,0,0.3);
        }
        
        #score {
            font-size: 40px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        #joueur {
            position: absolute;
            width: 60px;
            height: 60px;
            background: url('vaisseau.png');
            background-size: cover;
            transition: all 0.1s;
        }
        
        .etoile {
            position: absolute;
            width: 30px;
            height: 30px;
            background: gold;
            border-radius: 50%;
            animation: briller 1s infinite;
            box-shadow: 0 0 20px yellow;
        }
        
        @keyframes briller {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
        }
        
        .bouton {
            padding: 15px 30px;
            font-size: 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt; ATTRAPE LES ÉTOILES ! &lt;/h1&gt;
    &lt;div id="score"&gt;Score : 0&lt;/div&gt;
    &lt;div id="jeu"&gt;
        &lt;div id="joueur"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;button class="bouton" onclick="commencerJeu()"&gt;Jouer !&lt;/button&gt;
    &lt;button class="bouton" onclick="reinitialiser()"&gt;Recommencer&lt;/button&gt;

    &lt;script&gt;
        let score = 0;
        let joueur;
        let jeu;
        
        function commencerJeu() {
            jeu = document.getElementById("jeu");
            joueur = document.getElementById("joueur");
            
            // Position initiale du joueur
            joueur.style.left = "370px";
            joueur.style.top = "400px";
            
            // Démarrer la création d'étoiles
            setInterval(creerEtoile, 1000);
            
            // Contrôles du clavier
            document.onkeydown = deplacerJoueur;
        }
        
        function creerEtoile() {
            let etoile = document.createElement("div");
            etoile.className = "etoile";
            
            // Position aléatoire en haut
            etoile.style.left = Math.random() * 750 + "px";
            etoile.style.top = "0px";
            
            jeu.appendChild(etoile);
            
            // Faire tomber l'étoile
            let chute = setInterval(function() {
                let top = parseInt(etoile.style.top);
                etoile.style.top = (top + 5) + "px";
                
                // Vérifier la collision
                if (verifierCollision(joueur, etoile)) {
                    score += 10;
                    document.getElementById("score").innerHTML = "Score : " + score;
                    jeu.removeChild(etoile);
                    clearInterval(chute);
                    joueur.style.transform = "scale(1.3)";
                    setTimeout(() => joueur.style.transform = "scale(1)", 200);
                }
                
                // Supprimer si sort de l'écran
                if (top > 500) {
                    jeu.removeChild(etoile);
                    clearInterval(chute);
                }
            }, 50);
        }
        
        function verifierCollision(element1, element2) {
            let rect1 = element1.getBoundingClientRect();
            let rect2 = element2.getBoundingClientRect();
            
            return !(rect1.right < rect2.left || 
                    rect1.left > rect2.right || 
                    rect1.bottom < rect2.top || 
                    rect1.top > rect2.bottom);
        }
        
        function deplacerJoueur(event) {
            let left = parseInt(joueur.style.left);
            let top = parseInt(joueur.style.top);
            
            switch(event.key) {
                case "ArrowLeft":
                    if (left > 0) joueur.style.left = (left - 15) + "px";
                    break;
                case "ArrowRight":
                    if (left < 740) joueur.style.left = (left + 15) + "px";
                    break;
                case "ArrowUp":
                    if (top > 0) joueur.style.top = (top - 15) + "px";
                    break;
                case "ArrowDown":
                    if (top < 440) joueur.style.top = (top + 15) + "px";
                    break;
            }
        }
        
        function reinitialiser() {
            score = 0;
            document.getElementById("score").innerHTML = "Score : 0";
            // Supprimer toutes les étoiles
            let etoiles = document.getElementsByClassName("etoile");
            while(etoiles[0]) {
                etoiles[0].parentNode.removeChild(etoiles[0]);
            }
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

 COMMENT JOUER :
• Utilise les flèches ← ↑ → ↓ pour bouger
• Attrape les étoiles qui tombent 
• Chaque étoile = 10 points 
• Essaye d'avoir le meilleur score !

 CE QUE TU AS APPRIS :
✅ HTML pour la structure
✅ CSS pour le beau design  
✅ JavaScript pour l'interactivité
✅ Les événements (clics, clavier)
✅ Les animations
✅ La gestion du temps

 IDÉES POUR AMÉLIORER TON JEU :
• Ajouter des obstacles à éviter
• Créer différents types d'étoiles
• Ajouter un compte à rebours
• Créer des niveaux de difficulté
• Ajouter de la musique et des sons

 ASTUCES DE CRÉATEUR :
• Commence simple, améliore après
• Teste souvent ton jeu
• Demande à tes amis d'essayer
• Amuse-toi ! 

 FÉLICITATIONS SUPER CRÉATEUR ! 
Tu as créé ton premier jeu vidéo ! `,
                questions: [
                    {
                        question: "Comment crée-t-on un nouvel élément en JavaScript ?",
                        options: ["document.createElement()", "new Element()", "create.element()", "makeElement()"],
                        correctAnswer: 0,
                        explanation: "Fantastique ! document.createElement() crée de nouveaux éléments !",
                        quizImage: "game.png"
                    },
                    {
                        question: "Comment détecte-t-on les touches du clavier ?",
                        options: ["onkeydown", "onkeypress", "keypressed", "keydown"],
                        correctAnswer: 0,
                        explanation: "Super ! onkeydown détecte quand on appuie sur une touche !",
                        quizImage: "game.png"
                    },
                    {
                        question: "Comment répète-t-on une action ?",
                        options: ["setInterval()", "repeat()", "loop()", "every()"],
                        correctAnswer: 0,
                        explanation: "Génial ! setInterval() répète une action toutes les X millisecondes !",
                        quizImage: "game.png"
                    }
                ]
            }
        ];
    }
    startApplication() {
        this.showScreen('welcome');
    }

    showScreen(screenName) {
        Object.values(this.elements.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });

        const targetScreen = this.elements.screens[screenName];
        if (targetScreen) {
            setTimeout(() => {
                targetScreen.classList.add('active');
                this.onScreenChange(screenName);
            }, this.config.transitionDelay);
        }
    }

    onScreenChange(screenName) {
        switch (screenName) {
            case 'levels':
                this.renderLevelSelection();
                break;
            case 'course':
                this.loadCourseContent();
                break;
            case 'quiz':
                this.startQuiz();
                break;
            case 'results':
                this.showResults();
                break;
        }
    }

    renderLevelSelection() {
        const container = this.elements.content.levelsContainer;
        if (!container) return;

        container.innerHTML = this.levels.map((level, index) => `
            <button class="level-btn" data-level="${index}">
                <strong>${level.title}</strong>
                <span>${level.description}</span>
            </button>
        `).join('');

        container.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const levelIndex = parseInt(btn.dataset.level);
                this.selectLevel(levelIndex);
            });
        });
    }

    selectLevel(levelIndex) {
        this.state.currentLevel = levelIndex;
        this.showScreen('course');
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.courseMusic);
        }
    }

    loadCourseContent() {
        const level = this.levels[this.state.currentLevel];
        if (this.elements.content.courseTitle) {
            this.elements.content.courseTitle.textContent = level.title;
        }
        if (this.elements.content.courseContent) {
            this.elements.content.courseContent.innerHTML = level.content;
        }
        if (this.elements.media.courseImage && level.courseImage) {
            this.elements.media.courseImage.src = level.courseImage;
        }
    }

    startQuiz() {
        this.state.currentQuestion = 0;
        this.state.score = 0;
        this.stopAllAudio();
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.quizMusic);
        }
        this.loadQuestion();
    }

    loadQuestion() {
        const level = this.levels[this.state.currentLevel];
        const question = level.questions[this.state.currentQuestion];
        if (!question) return;

        if (this.elements.content.questionText) {
            this.elements.content.questionText.textContent = question.question;
        }
        if (this.elements.media.quizImage && question.quizImage) {
            this.elements.media.quizImage.src = question.quizImage;
        }

        this.renderOptions(question.options);

        if (this.elements.content.feedback) {
            this.elements.content.feedback.textContent = '';
            this.elements.content.feedback.className = 'feedback';
        }

        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.style.display = 'none';
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.style.display = this.state.currentQuestion > 0 ? 'block' : 'none';
        }

        this.updateProgressBar();
    }

    renderOptions(options) {
        const container = this.elements.content.optionsContainer;
        if (!container) return;

        container.innerHTML = options.map((option, index) => 
            `<div class="option" data-index="${index}">${option}</div>`
        ).join('');
        
        container.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => this.checkAnswer(parseInt(option.dataset.index)));
        });
    }

    checkAnswer(selectedIndex) {
        const level = this.levels[this.state.currentLevel];
        const question = level.questions[this.state.currentQuestion];
        const options = this.elements.content.optionsContainer.querySelectorAll('.option');

        options.forEach(option => option.style.pointerEvents = 'none');

        const isCorrect = selectedIndex === question.correctAnswer;
        if (isCorrect) {
            this.state.score++;
            this.showFeedback('Correct!', 'success');
            options[selectedIndex].classList.add('correct');
        } else {
            this.showFeedback(`Incorrect. ${question.explanation}`, 'error');
            options[selectedIndex].classList.add('incorrect');
            options[question.correctAnswer].classList.add('correct');
        }

        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.style.display = 'block';
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.style.display = this.state.currentQuestion > 0 ? 'block' : 'none';
        }

        this.saveProgress();
    }

    nextQuestion() {
        this.state.currentQuestion++;
        const level = this.levels[this.state.currentLevel];
        if (this.state.currentQuestion < level.questions.length) {
            this.loadQuestion();
        } else {
            this.showScreen('results');
        }
    }

    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.loadQuestion();
        }
    }

    showResults() {
        this.stopAllAudio();
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.resultMusic);
        }

        const level = this.levels[this.state.currentLevel];
        const totalQuestions = level.questions.length;

        if (this.elements.content.finalScore) {
            this.elements.content.finalScore.textContent = this.state.score;
        }
        if (this.elements.content.totalQuestions) {
            this.elements.content.totalQuestions.textContent = totalQuestions;
        }

        const percentage = (this.state.score / totalQuestions) * 100;
        this.renderStars(percentage);

        if (percentage >= this.config.minScoreForCompletion * 100) {
            this.markLevelAsCompleted(level.id);
        }
    }

    renderStars(percentage) {
        const container = this.elements.content.stars;
        if (!container) return;

        const starCount = Math.floor(percentage / 20);
        container.innerHTML = Array.from({ length: 5 }, (_, i) => 
            `<span class="star ${i < starCount ? 'active' : ''}">★</span>`
        ).join('');
    }

    updateProgressBar() {
        const level = this.levels[this.state.currentLevel];
        const progress = ((this.state.currentQuestion + 1) / level.questions.length) * 100;
        if (this.elements.content.progressFill) {
            this.elements.content.progressFill.style.width = `${progress}%`;
        }
    }

    showFeedback(message, type) {
        if (this.elements.content.feedback) {
            this.elements.content.feedback.textContent = message;
            this.elements.content.feedback.className = `feedback ${type}`;
        }
    }

    playAudio(audioElement) {
        if (!audioElement || !this.state.audioEnabled) {
            return;
        }
        
        try {
            console.log('Tentative de lecture audio:', audioElement.src);
            audioElement.volume = this.config.audioVolume;
            audioElement.currentTime = 0;
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio joué avec succès');
                }).catch(error => {
                    console.log('Erreur de lecture audio:', error);
                });
            }
        } catch (error) {
            console.warn('Erreur audio:', error);
        }
    }

    stopAllAudio() {
        Object.values(this.elements.media).forEach(media => {
            if (media instanceof HTMLAudioElement) {
                media.pause();
                media.currentTime = 0;
            }
        });
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('webdev-progress');
            return saved ? JSON.parse(saved) : { completedLevels: [], scores: {} };
        } catch {
            return { completedLevels: [], scores: {} };
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('webdev-progress', JSON.stringify(this.state.userProgress));
        } catch (error) {
            console.warn('Sauvegarde impossible:', error);
        }
    }

    markLevelAsCompleted(levelId) {
        if (!this.state.userProgress.completedLevels.includes(levelId)) {
            this.state.userProgress.completedLevels.push(levelId);
            this.state.userProgress.scores[levelId] = this.state.score;
            this.saveProgress();
        }
    }

    attachEventListeners() {
        if (this.elements.buttons.start) {
            this.elements.buttons.start.addEventListener('click', () => this.showScreen('levels'));
        }
        if (this.elements.buttons.startQuiz) {
            this.elements.buttons.startQuiz.addEventListener('click', () => this.showScreen('quiz'));
        }
        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.addEventListener('click', () => this.nextQuestion());
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.addEventListener('click', () => this.previousQuestion());
        }
        if (this.elements.buttons.prevCourse) {
            this.elements.buttons.prevCourse.addEventListener('click', () => this.showScreen('levels'));
        }
        if (this.elements.buttons.replay) {
            this.elements.buttons.replay.addEventListener('click', () => {
                this.showScreen('welcome');
                if (this.state.audioEnabled) {
                    this.playAudio(this.elements.media.welcomeMusic);
                }
            });
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new WebDevAdventure();
});