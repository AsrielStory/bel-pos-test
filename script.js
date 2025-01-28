var startButton = document.getElementById("start");
var nextButton = document.getElementById("next")
var mainPanel = document.getElementById("main");
var questionBlock = document.getElementById("question-block");
var radioGroup = document.querySelectorAll("input[type='radio']");

let activePanel = 0;

let backgroundImages = ["img/background.jpg", "img/Minsk.jpg", "img/Brest.jpg", "img/Vitebsk.jpg", "img/Grodno.jpg", "img/Mogilev.jpg", "img/Gomel.JPG"]

startButton.addEventListener("click", startTest);
nextButton.addEventListener("click", nextPanel);

radioGroup.forEach(radio => {
    radio.addEventListener('input', () => {
        const isAnySelected = Array.from(radioGroup).some(radio => radio.checked);
        nextButton.disabled = !isAnySelected;
    });
});

function startTest() {
    mainPanel.style.opacity = '0';
    mainPanel.style.transform = 'scale(0)';
    mainPanel.addEventListener('transitionend', () => {
        mainPanel.style.display = 'none';
        activePanel = 1;
        questionBlock.style.display = "grid";
        document.getElementById("q1-block").style.display = "grid";
        if (document.getElementById("q1-1").checked || document.getElementById("q1-2").checked || document.getElementById("q1-3").checked) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
        nextButton.textContent = "Дальше";
        questionBlock.style.opacity = '1';
        questionBlock.style.transform = 'scale(1)';
    }, { once: true });
}

function nextPanel() {
    document.getElementById("q" + activePanel + "-block").style.opacity = '0';
    document.getElementById("q" + activePanel + "-block").addEventListener('transitionend', () => {
        document.getElementById("q" + activePanel + "-block").style.display = "none";
        activePanel = activePanel + 1;
        if (activePanel > 20) {
            let res = 0;
            for (let i = 1; i < 21; i++) {
                if (document.getElementById("q" + i + "-1").checked) {
                    res = res + 1;
                    document.getElementById("q" + i + "-1").checked = false;
                } else if (document.getElementById("q" + i + "-2").checked) {
                    res = res + 3;
                    document.getElementById("q" + i + "-2").checked = false;
                } else if (document.getElementById("q" + i + "-3").checked) {
                    res = res + 6;
                    document.getElementById("q" + i + "-3").checked = false;
                } else {
                    console.log("Ошибка проверки!!!");
                }
            }
            console.log("Результат теста - " + res);
            let indPanel = 0;
            if (res == 20) {
                indPanel = 1;
            } else if (res > 20 && res <= 40) {
                indPanel = 2;
            } else if (res > 40 && res <= 60) {
                indPanel = 3;
            } else if (res > 60 && res <= 80) {
                indPanel = 4;
            } else if (res > 80 && res <= 100) {
                indPanel = 5;
            } else if (res > 100 && res <= 120) {
                indPanel = 6;
            } else {
                console.log("Ошибка расчётов результатов!!!");
            }
            questionBlock.style.opacity = '0';
            questionBlock.style.transform = 'scale(0)';
            questionBlock.addEventListener('transitionend', () => {
                questionBlock.style.display = "none";
                document.getElementById("result-block").style.display = "grid";
                document.getElementById("result" + indPanel).style.display = "flex";
                document.body.style.backgroundImage = "url('" + backgroundImages[indPanel] + "')";
            })
        } else if (activePanel == 20) {
            document.getElementById("q" + activePanel + "-block").style.display = "grid";
            nextButton.textContent = "Результаты";
            if (document.getElementById("q" + activePanel + "-1").checked || document.getElementById("q" + activePanel + "-2").checked || document.getElementById("q" + activePanel + "-3").checked) {
                nextButton.disabled = false;
            } else {
                nextButton.disabled = true;
            }
        } else {
            document.getElementById("q" + activePanel + "-block").style.display = "grid";
            if (document.getElementById("q" + activePanel + "-1").checked || document.getElementById("q" + activePanel + "-2").checked || document.getElementById("q" + activePanel + "-3").checked) {
                nextButton.disabled = false;
            } else {
                nextButton.disabled = true;
            }
        }
    }, { once: true });
}
