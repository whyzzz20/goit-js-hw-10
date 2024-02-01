import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const myInput = document.querySelector("#datetime-picker");

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
    onClose(selectedDates){
      userSelectedDate = selectedDates[0]
      if(selectedDates[0] <= Date.now()){
        iziToast.show({
          title: '❌',
          message: 'Please choose a date in the future!',
          position: 'topRight',
          messageColor: '#fff',
          messageSize: '20px',
          backgroundColor: '#f54245',
          close: false,
          closeOnClick: true,
          progressBarEasing: 'linear',
        })
      }else{
        startBtn.disabled = false;
        
      }

    }
  };
  flatpickr(myInput , options);

  startBtn.addEventListener('click', e => {
    const timer = setInterval(() => {
      const result = userSelectedDate - Date.now();
      const timeValue = convertMs(result);
      if (result <= 0) {
        clearInterval(timer);
      } else {
        timerDays.textContent = addLeadingZero(timeValue.days);
        timerHours.textContent = addLeadingZero(timeValue.hours);
        timerMinutes.textContent = addLeadingZero(timeValue.minutes);
        timerSeconds.textContent = addLeadingZero(timeValue.seconds);
      }
    }, 1000);
  });

  function addLeadingZero(value) {
    value = String(value);
    return value.length < 2 ? value.padStart(2, '0') : value;
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