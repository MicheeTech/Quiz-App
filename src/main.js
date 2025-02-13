import "../style.css";
import { Questions } from './questions';

const app = document.querySelector("#app");
const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    let currentQuestion = 0;
    let score = 0;
    displayQuestion(currentQuestion);

    function clean() {
        while (app.firstElementChild)
            app.firstElementChild.remove();
    }

    function displayQuestion(index) {
        clean();
        const question = Questions[index];

        if (!question) {
            displayFinishMessage();
            return; // Fin du quiz
        }

        const title = getTitleElement(question.question);
        app.appendChild(title);

        const answersDiv = createAnswers(question.answers);
        app.appendChild(answersDiv);

        const progress = getProgressElement(currentQuestion);
        app.appendChild(progress);

        const submitButton = getSubmitButton();
        submitButton.addEventListener("click", submit);

        app.appendChild(submitButton);
    }

    function displayFinishMessage() {
        const h1 = document.createElement("h1");
        h1.innerText = "Félicitations ! Vous avez terminé le quiz";
        const p = document.createElement("h2");
        p.innerText = `Vous avez obtenu ${score} sur ${Questions.length} points`;
        app.appendChild(h1);
        app.appendChild(p);

        const restartButton = document.createElement('button');
        restartButton.innerText = "Recommencer le quiz";
        restartButton.addEventListener("click", () => {
            currentQuestion = 0;
            score = 0;
            displayQuestion(currentQuestion);
        });
        app.appendChild(restartButton);
    }

    function submit() {
        const selectedAnswer = app.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) return; // Si aucune réponse n'est sélectionnée

        const value = selectedAnswer.value;
        const question = Questions[currentQuestion];
        const isCorrect = question.correct === value;

        if (isCorrect) {
            score++;
        }

        // Afficher un message de retour (feedback)
        showFeedback(isCorrect, question.correct, value);

        // Passer à la question suivante après un délai de 2 secondes
        setTimeout(() => {
            currentQuestion++;
            displayQuestion(currentQuestion);
        }, 2000);
    }

    // Créer les éléments pour afficher les réponses
    function createAnswers(answers) {
        const answersDiv = document.createElement("div");
        answersDiv.classList.add("answers");

        for (const answer of answers) {
            const label = getAnswerElement(answer);
            answersDiv.appendChild(label);
        }

        return answersDiv;
    }

    // Créer l'élément pour afficher le titre de la question
    function getTitleElement(text) {
        const title = document.createElement('h3');
        title.innerText = text;
        return title;
    }

    // Formatage de l'ID des éléments de réponse pour l'accessibilité
    function formatId(text) {
        return text.replaceAll(" ", "-").toLowerCase();
    }

    // Créer un élément de réponse avec un input radio
    function getAnswerElement(text) {
        const label = document.createElement("label");
        label.innerText = text;
        const input = document.createElement("input");
        const id = formatId(text);
        input.id = id;
        label.htmlFor = id;
        input.setAttribute("type", "radio");
        input.setAttribute("name", "answer");
        input.setAttribute("value", text);
        label.appendChild(input);
        return label;
    }

    // Créer un bouton pour soumettre la réponse
    function getSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.innerText = "Soumettre";
        return submitButton;
    }

    // Afficher un retour sur la réponse donnée par l'utilisateur
    function showFeedback(isCorrect, correct, answer) {
        const correctAnswerId = formatId(correct);
        const correctElement = document.querySelector(
            `label[for="${correctAnswerId}"]`
        );

        const selectedAnswerId = formatId(answer);
        const selectedElement = document.querySelector(
            `label[for="${selectedAnswerId}"]`
        );

        correctElement.classList.add("correct");
        selectedElement.classList.add(isCorrect ? "correct" : "incorrect");

        // Affichage du message de feedback
        const feedbackMessage = document.createElement('p');
        if (isCorrect) {
            feedbackMessage.innerText = "Bravo, bonne réponse !";
            feedbackMessage.classList.add("feedback-correct");
        } else {
            feedbackMessage.innerText = `Désolé, la bonne réponse était : "${correct}"`;
            feedbackMessage.classList.add("feedback-incorrect");
        }
        app.appendChild(feedbackMessage);
    }

    // Créer un élément de progression pour indiquer l'avancement du quiz
    function getProgressElement(index) {
        const progress = document.createElement('progress');
        progress.max = Questions.length;
        progress.value = index + 1; // Affiche la progression
        return progress;
    }
}



