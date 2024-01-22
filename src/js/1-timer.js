//Імпорти бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

//Посилання на елементи сторінки
const btnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
const datePickerRef = document.querySelector('#datetime-picker');
btnRef.disabled = true;

//Дата, що обрав користувач
let userSelectedDate;

//Налаштування календаря
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      // window.alert('Please choose a date in the future');
      iziToast.error({
        title: 'Wrong Date',
        message: 'Please choose a date in the future',
      });
      btnRef.disabled = true;

      return;
    }

    userSelectedDate = selectedDates[0];
    btnRef.disabled = false;
  },
};
//Встановлення календаря
flatpickr('#datetime-picker', flatpickrOptions);

//Запуск таймера

btnRef.addEventListener('click', startTimer);

function startTimer(e) {
  const timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      userSelectedDate - Date.now()
    );
    btnRef.disabled = true;
    datePickerRef.disabled = true;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      btnRef.disabled = false;
      datePickerRef.disabled = false;
    }

    daysRef.textContent = days.toString().padStart(2, 0);
    hoursRef.textContent = hours.toString().padStart(2, 0);
    minutesRef.textContent = minutes.toString().padStart(2, 0);
    secondsRef.textContent = seconds.toString().padStart(2, 0);
  }, 1000);
}

//Конвертер часу

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
