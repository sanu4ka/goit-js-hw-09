import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let timer = null;
let intervalId = null;
const SECOND_DELAY = 1000;

const refs = {
  inputRef: document.querySelector('#datetime-picker'),
  startBtnRef: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minsRef: document.querySelector('span[data-minutes]'),
  secsRef: document.querySelector('span[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      window.alert('Please choose a date in the future');
      refs.startBtnRef.disabled = true;
    } else {
      refs.startBtnRef.disabled = false;
    }
  },
};
refs.startBtnRef.disabled = true;
const fp = flatpickr('input#datetime-picker', options);

function onStartButtonClick(params) {}

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
