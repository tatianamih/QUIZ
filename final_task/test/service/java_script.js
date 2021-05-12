class Quiz {

    testQuestion
    userAnswers
    rightAnswers


    constructor(testQuestion, userAnswers, rightAnswers) {
        this.testQuestion = testQuestion
        this.userAnswers = userAnswers
        this.rightAnswers = rightAnswers
    }
}

let testQuestions = [
    new Quiz("В HTML не существует … тэгов.",
        ["Одиночных",
            "Парных",
            "Тройных",
            "Четвертных"],
        [3,4]),
    new Quiz(" Какие тэги используются для определения заголовков?",
        ["h1-h6",
            "Header",
            "Heading",
            "Body"],
        [1]),
    new Quiz("Каких методов тестирования не существует?",
        ["Метод белого ящика",
            "Метод золотой шкатулки",
            "Метод игры в ящик",
            "Метод серого ящика ящика"],
        [2,3]),
    ]

function addQuestion() {
    let isExept = false

    let testQuestion = prompt("Введите текст вопроса:").trim()
    if (testQuestion === "") {
        alert("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.")
    } else {
        let userAnswers = []
        for (let i = 1; i <= 4; i++) {
            let userAnswer = prompt("Введите текст " + i + " варианта ответа:").trim()
            if (userAnswer === "") {
                alert("Вы не ввели текст " + i + " варианта ответа.\nПопробуйте добавить вопрос заново")
                isExept = true
                break
            } else {
                userAnswers.push(userAnswer)
            }
        }
        if(!isExept) {
            let rightAnswersStr = prompt("Введите номера правильных ответов через запятую. Нумерация начинается с 1").trim()
            if (rightAnswersStr === "" || /[^1-4,]/.test(rightAnswersStr) || rightAnswersStr[rightAnswersStr.length - 1] === ',') {
                alert("Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново")
                isExept = true
            }
            let rightAnswers = rightAnswersStr.split(',')
            let rightAnswersSet = new Set(rightAnswers)
            if (rightAnswers.length !== rightAnswersSet.size) {
                alert("Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Поробуйте добавить вопрос заново")
                isExept = true
            }
            if (!isExept) {
                for (let i=0; i < rightAnswers.length;i++){
                    rightAnswers[i]= parseInt(rightAnswers[i], 10)
                }
                testQuestions.push(new Quiz(testQuestion, userAnswers, rightAnswers))
            }
        }
    }
}
function validate() {

    let userAnswers
    let incorrectAnswers = []
    let index = -1
    let countRightAnswers = 0
    let isChecked = false
    while ((userAnswers = document.getElementsByName('userAnswers' + (++index))).length !== 0) {
        let rightAnswers = testQuestions[index].rightAnswers
        let isRight = true
        isChecked = false
        for (let i = 0; i < userAnswers.length; i++) {
            let userAnswer = userAnswers[i]
            if (userAnswer.checked) {
                isChecked = true
            }
            if ((rightAnswers.includes(i + 1) && !userAnswer.checked) || (!rightAnswers.includes(i + 1) && userAnswer.checked)) {
                isRight  = false
            }
        }
        if (!isChecked) {
            break
        }
        if (isRight) {
            countRightAnswers++
        } else {
            incorrectAnswers.push(index)
        }
    }
    let result = `Ваш результат ${ countRightAnswers} из ${testQuestions.length}.`
    if (!isChecked) {
        alert('Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.')
    } else if (countRightAnswers === testQuestions.length) {
        alert(`${result} Вы молодец!`)
    } else {
        let message = 'Вы неправильно ответили на вопросы:\n'
        for (let incorrectAnswer of incorrectAnswers) {
            message += `${incorrectAnswer + 1}. ${testQuestions[incorrectAnswer].testQuestion}\n`
        }
        message += result
        alert(message)
    }
    for (let button of document.getElementsByClassName('button')) {
        button.removeAttribute('disabled')
    }
}

function startTest() {
    for (let button of document.getElementsByClassName('button')) {
        button.setAttribute('disabled', 'disabled')
    }
    let form = document.getElementById('form')
    let htmlText = ''
    for (let i = 0; i < testQuestions.length; i++) {
        let testQuestion = testQuestions[i]
        htmlText += `<label>${i + 1}. ${testQuestion.testQuestion}</label>`
        htmlText += '<p>'
        let userAnswers = testQuestion.userAnswers
        for (let j = 0; j < 4; j++) {
            htmlText += `<input type="checkbox" name="userAnswers${i}">${userAnswers[j]}<Br>`
        }
        htmlText  += '</p>'
    }
    htmlText += '<button onclick="validate()">Отправить</button>'
    form.innerHTML = htmlText
}


