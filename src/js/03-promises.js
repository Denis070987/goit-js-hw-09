import Notiflix from 'notiflix';

const startBtn = document.querySelector('button');
const form = document.querySelector('.form');
form.addEventListener('submit', onStart);
let formValue = {};

function onStart(event) {
  event.preventDefault();
  startBtn.setAttribute('disabled', true);
  const { delay, step, amount } = event.currentTarget.elements;
  formValue.delay = Number(delay.value);
  formValue.step = Number(step.value);
  formValue.amount = Number(amount.value);
  for (let i = 1; i <= formValue.amount; i += 1) {
    formValue.delay += formValue.step;
    createPromise(i, formValue.delay).then(onSuccess).catch(onError);
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
