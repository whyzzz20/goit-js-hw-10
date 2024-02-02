import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const myInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.addEventListener('click', onBtnStartClick);
let userSelectedDate = null;
btnStart.setAttribute('disabled', 'true');

const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      btnStart.removeAttribute('disabled');
    } else {
      btnStart.setAttribute('disabled', 'true');
      iziToast.error({
        color: 'red',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};

const fp = flatpickr(myInput, options);

function onBtnStartClick() {
  myInput.setAttribute('disabled', 'true');
  const intervalId = setInterval(() => {
    const deltaTime = userSelectedDate.getTime() - Date.now();

    if (deltaTime >= 0) {
      const result = convertMs(deltaTime);
      timerRefs.days.textContent = addLeadingZero(result.days);
      timerRefs.hours.textContent = addLeadingZero(result.hours);
      timerRefs.minutes.textContent = addLeadingZero(result.minutes);
      timerRefs.seconds.textContent = addLeadingZero(result.seconds);
      btnStart.setAttribute('disabled', 'true');
    } else {
      clearInterval(intervalId);
      myInput.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
