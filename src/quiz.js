// Fonction pour afficher l'animation de confettis
function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti');
    document.body.appendChild(confettiContainer);
  
    // Ajouter des morceaux de confettis
    for (let i = 0; i < 100; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.classList.add('confetti-piece');
      confettiPiece.style.left = `${Math.random() * 100}%`;
      confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
      confettiContainer.appendChild(confettiPiece);
    }
  
    // Retirer les confettis après 3 secondes
    setTimeout(() => {
      confettiContainer.remove();
    }, 3000);
  }
  
  // Fonction pour vérifier le score et déclencher l'animation
  function checkScore(totalQuestions, correctAnswers) {
    const score = (correctAnswers / totalQuestions) * 100;
  
    // Si l'utilisateur a plus de 50% de bonnes réponses
    if (score > 2) {
      showConfetti();
    }
  }
  
  // Exemple de calcul de score et déclenchement de l'animation
  const totalQuestions = 10; // Total de questions dans le quiz
  let correctAnswers = 7; // Remplacez cela par le nombre réel de bonnes réponses de l'utilisateur
  
  // Vérification du score à la fin du quiz
  checkScore(totalQuestions, correctAnswers);
  