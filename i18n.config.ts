export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      menu: {
        howtoplay: 'How to play',
        start: 'Start',
        restart: 'Restart',
        about: 'About',
        highscore: 'Highscore'
      },
      howtoplay: {
        start: 'Guess 4 UNIQUE digits. You have 6 attempts only. And the clock is ticking!',
        yellow: 'Invalid placement',
        red: 'Invalid digit',
        green: 'Valid digit',
        controls: 'Use WASD (arrows on mobile) to navigate and increase/decrease digits. Press Enter to check validity.'
      },
      about: {
        text1: 'It is recreation of',
        text2: 'camera hacking mini-game which is also a variation of',
        text3: 'Buy the game on',
        text4: 'Tech stack',
        text5: 'I had to practice Vue 3 and the world needs anything but another ToDo list.',
        text6: 'Idea and images are properties of Square Enix Ltd.',
        text7: 'Source code'
      },
      highscore: {
        title: 'Highscores',
        averageTime: 'Average time',
        averageAttempts: 'Average attempts',
        wins: 'Wins',
        lost: 'Lost'
      },
      gameScreen: {
        attempts: 'Attempts remaining',
        time: 'Time'
      },
      scoreForm: {
        name: 'Your name',
        number: 'Your lucky number',
        time: 'Time spent',
        attempts: 'Attempts used',
        date: 'Date',
        comment: 'Leave a comment',
        submit: 'Submit your score',
        submitted: 'Form was submitted'
      },
      gameOver: {
        title: 'Game Over',
        number: 'Your unlucky number is'
      },
      state: {
        loading: 'Loading...'
      }
    },
    ru: {
      menu: {
        howtoplay: 'Правила',
        start: 'Начать',
        restart: 'Заново',
        about: 'Об игре',
        highscore: 'Рекорды'
      },
      howtoplay: {
        start: 'Угадай код из 4 УНИКАЛЬНЫХ цифр. У тебя только 6 попыток. И время идёт!',
        yellow: 'Цифра есть, но в другом месте',
        red: 'Цифры в коде нет',
        green: 'Цифра угадана верно',
        controls: 'Используй клавиши WASD или стрелки для перемещения и увеличения/уменьшения значения. Нажми Enter для проверки кода.'
      },
      about: {
        text1: 'Это воссоздание мини-игры по взлому камер наблюдения из игры',
        text2: ', которая является вариацией игры',
        text3: 'Купить игру в ',
        text4: 'Стек',
        text5: 'Мне нужно было попрактиковаться с Vue 3, поэтому мне нужно было себя чем-то замотивировать и вот вы здесь.',
        text6: 'Идея и изображения принадлежат Square Enix Ltd.',
        text7: 'Код'
      },
      highscore: {
        title: 'Рекорды',
        averageTime: 'Среднее время',
        averageAttempts: 'Среднее кол-во попыток',
        wins: 'Победы',
        lost: 'Проигрыши'
      },
      gameScreen: {
        attempts: 'Осталось попыток',
        time: 'Время'
      },
      scoreForm: {
        name: 'Имя',
        number: 'Твой счастливый номер',
        time: 'Время',
        attempts: 'Попыток',
        date: 'Дата',
        comment: 'Комментарий',
        submit: 'Отправить',
        submitted: 'Форма отправлена'
      },
      gameOver: {
        title: 'Конец игры',
        number: 'Твой несчастливый номер'
      },
      state: {
        loading: 'Загрузка...'
      }
    }
  }
}))