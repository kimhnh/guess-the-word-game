const display = document.querySelector('.display');
const input = document.querySelector('.input');
const tryText = document.querySelector('.try');
const mistakeText = document.querySelector('.mistake');
const allCircles = document.querySelectorAll('.step-circle');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');

const list = ['flower', 'valley', 'lake', 'meadow']; // hard-coded list
let tries = 0;

randomBtn.addEventListener('click', grabWord);
resetBtn.addEventListener('click', removeContent); // how to delete input text?

function grabWord() {
  display.innerHTML = '';
  input.innerHTML = '';
  removeContent();
  showPrompt();
}

function showPrompt() {
  const word = list[randomNum(list.length)];
  const answer = word.split('');
  const shuffleWord = word.shuffle();

  for (let i = 0; i < shuffleWord.length; i++) {
    // Create span
    const letterDisplay = document.createElement('span');
    letterDisplay.textContent = shuffleWord[i];
    letterDisplay.classList.add('letter-display');
    display.appendChild(letterDisplay);

    // Create input
    const letterInput = document.createElement('input');
    letterInput.classList.add('letter-input');
    letterInput.setAttribute('id', `input${i}`);
    letterInput.type = 'text';
    letterInput.maxLength = '1';
    letterInput.value = '';
    input.appendChild(letterInput);
  }

  const allInputs = document.querySelectorAll('input');

  allInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      input.textContent = e.target.value;
      input.setAttribute('value', `${e.target.value}`);

      let letters = /^[a-zA-Z]+$/;
      const nextInputIndex = index + 1;
      if (input.value.match(letters) && nextInputIndex < allInputs.length) {
        document.getElementById(`input${nextInputIndex}`).focus();
        if (input.value === answer[index]) {
          // ALERT: answer = input string
        } else {
          tries++;
          tryText.textContent = `Tries (${tries}/5):`;
          mistakeText.textContent += `${input.value}, `;
          if (tries > 5) {
            // ALERT: failed the game
            grabWord();
          } else {
            document.getElementById(`step${tries}`).classList.add('completed');
          }
        }
      } else {
        document.activeElement.blur();
      }
    });
  });
}

String.prototype.shuffle = function () {
  const a = this.split(''), //split string into array
    n = a.length; // array length

  for (let i = n - 1; i > 0; i--) {
    //cycle through every index
    const k = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[k];
    a[k] = tmp;
  }
  return a.join('');
};

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function removeContent() {
  tries = 0;
  tryText.textContent = 'Tries (0/5):';
  allCircles.forEach((el) => {
    el.classList.remove('completed');
  });
  mistakeText.textContent = '';
}

//fire up a random word when page loads
showPrompt();
