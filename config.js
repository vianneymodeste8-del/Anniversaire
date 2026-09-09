/* ============================================================
   CONFIG — modifiez uniquement ce fichier pour personnaliser
   le site : prénom, date, souvenirs, vœux, messages d'amour.
   ============================================================ */

const CONFIG = {
  // Prénom de la personne fêtée (affiché partout dans le site)
  name: "Inès",

  // Nom complet — utilisé uniquement sur la toute dernière page
  fullName: "Inès Samirath",

  // Mots doux affichés un par un dans le miroir enchanté (scène 5)
  mirrorWords: [
    "Ma princesse, tu es la plus belle chose qui me soit arrivée.",
    "Ce miroir a tout vu, mais rien d'aussi précieux que toi.",
    "Ma princesse, ton sourire suffit à illuminer mes journées les plus sombres.",
    "Il n'existe pas de reflet plus doux que celui de ton cœur.",
    "Tu es unique, ma princesse, et je remercie la vie de t'avoir mise sur mon chemin.",
    "Mon amour pour toi grandit un peu plus à chaque regard que tu me lances.",
    "Ma reine, ma princesse, mon tout : voilà ce que tu es pour moi.",
    "Si ce miroir pouvait parler, il ne ferait que répéter à quel point je t'aime."
  ],

  // Souvenirs affichés dans la galerie (scène 3)
  // Pour chaque souvenir, remplissez SOIT "image", SOIT "video" (pas les deux) :
  //   - image : chemin vers une photo, ex. "assets/photos/photo1.jpg"
  //   - video : chemin vers une vidéo courte, ex. "assets/videos/clip1.mp4" (sans son, en boucle)
  // Si les deux sont vides, un cadre doré décoratif s'affiche à la place.
  memories: [
    { title: "Le jour où je t'ai vue", text: "J'ai su, en une seconde, que rien ne serait plus jamais pareil. Tu es entrée dans ma vie et tu y es restée.", image: "assets/photos/photo_2026-09-09_17-47-12.jpg", video: "" },
    { title: "Ton rire", text: "Celui qui me désarme à chaque fois, qui me fait tout oublier autour de nous deux.", image: "assets/photos/photo_2026-09-09_17-48-05.jpg", video: "" },
    { title: "Nos nuits à parler", text: "Ces heures où le temps s'arrêtait, où je découvrais un peu plus à quel point je t'aime.", image: "assets/photos/photo_2026-09-09_17-48-10.jpg", video: "" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-25.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-30.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-34.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-38.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-46.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-50.mp4" },
    { title: "Ta main dans la mienne", text: "Le geste le plus simple du monde, et pourtant celui qui me rassure le plus.", image: "assets/photos/photo_2026-09-09_17-48-55.jpg", video: "" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-48-59.mp4" },
    { title: "", text: "", image: "", video: "assets/videos/video_2026-09-09_17-49-12.mp4" },
    { title: "Aujourd'hui", text: "Et me voilà, plus amoureux que jamais, prêt à célébrer la femme extraordinaire que tu es.", image: "assets/photos/photo_2026-09-09_17-49-20.jpg", video: "" },
    { title: "", text: "", image: "assets/photos/photo_2026-09-09_17-52-43.jpg", video: "" },
    { title: "", text: "", image: "assets/photos/photo_2026-09-09_17-52-46.jpg", video: "" }
  ],

  // Vœux cachés dans les ballons (scène 4) — un ballon = un vœu, révélé au tap
  wishes: [
    "Tu es la plus belle chose qui me soit arrivée. Joyeux anniversaire, mon amour.",
    "Chaque jour à tes côtés est un cadeau que je ne prends jamais pour acquis.",
    "Ton sourire est mon endroit préféré au monde.",
    "Je t'aime plus aujourd'hui qu'hier, et bien moins que demain.",
    "Tu mérites un amour aussi grand que celui que tu donnes — je ferai tout pour te le rendre.",
    "Avec toi, même les journées ordinaires deviennent mes plus beaux souvenirs.",
    "Tu es mon rêve devenu réalité, et je le réalise chaque matin en me réveillant près de toi.",
    "Mon amour pour toi n'a ni limite, ni fin — juste comme cet anniversaire, il ne fait que commencer."
  ],

  // Message de la scène 7 (avant la lettre finale)
  finalMessage: "Que cette nouvelle année t'apporte tout l'amour que tu mérites — et je compte bien y contribuer chaque jour.",

  // ------------------------------------------------------------
  // LETTRE D'AMOUR — scène 8, la toute dernière page du site
  // Modifiez ce texte librement, il s'affiche paragraphe par paragraphe.
  // ------------------------------------------------------------
  loveLetter: {
    heading: "Ma plus belle histoire",
    paragraphs: [
      "Inès,",
      "Il y a des mots qu'on n'arrive jamais tout à fait à écrire, parce qu'ils sont trop grands pour tenir sur une page. Ce que je ressens pour toi en fait partie.",
      "Tu es la personne qui rend mes journées plus douces, mes silences plus paisibles, et mon avenir plus clair. Avant toi, je ne savais pas qu'on pouvait aimer quelqu'un à ce point, sans réserve, sans peur, juste en entier.",
      "Je t'aime pour ta force et pour ta douceur, pour ta manière de voir la beauté là où personne ne la cherche, pour ce regard que tu poses sur moi et qui me fait me sentir invincible.",
      "Aujourd'hui, c'est ton jour. Mais je veux que tu saches que chaque jour à tes côtés est une raison de plus de t'aimer davantage. Tu es mon présent, et j'espère de tout mon cœur être ton avenir.",
      "Joyeux anniversaire, mon amour. Merci d'exister, merci de m'avoir choisi, merci d'être toi.",
      "Je t'aime. Aujourd'hui, demain, et pour toutes les années à venir."
    ],
    signature: "Pour toujours à toi"
  },

  // Chemin du fichier audio (déposez votre fichier dans assets/musique.mp3)
  audioSrc: "assets/musique.mp3"
};
