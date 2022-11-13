import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const choiceDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]')
const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}
  
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let presDate = new Date();
    if(selectedDates[0] < presDate) {
      window.alert("Please choose a date in the future");
      startBtn.setAttribute('disabled', true);
    }
    else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', chooseTimerValue);
    }
  }
};

function chooseTimerValue() {
  let timer = setInterval(() => {
    let amountTime = new Date(choiceDate.value) - new Date;
    if (amountTime > 0) {
      choiceDate.setAttribute('disabled', true);
      startBtn.setAttribute('disabled', true);
    let timerData = convertMs(amountTime);
        timerValue.days.textContent = timerData.days.toString().padStart(2, '0');
        timerValue.hours.textContent = timerData.hours.toString().padStart(2, '0');
        timerValue.minutes.textContent = timerData.minutes.toString().padStart(2, '0');
        timerValue.seconds.textContent = timerData.seconds.toString().padStart(2, '0');
    } else { 
      clearInterval(timer);
  }}, 1000)
  }
 
flatpickr(choiceDate, options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

