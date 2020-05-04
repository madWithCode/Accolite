const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
// const datesElement = document.querySelector('.date-picker .dates');
const datesElement = document.getElementsByClassName('dates');
console.log(datesElement);
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
// const days_element = document.querySelector('.date-picker .dates .days');
const dayElements = document.getElementsByClassName('days');

// const days_of_month_element = document.querySelector('.date-picker .dates .days-of-month');
const daysOfMonthElement = document.getElementsByClassName('days-of-month');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();
populateDaysOfMonth();

date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

function toggleDatePicker (e) {
	for(let dates_element of datesElement){
		if (!checkEventPathForClass(e.path, 'dates')) {
			console.log(dates_element);
			dates_element.classList.toggle('active');
		}
	}
}

function goToNextMonth () {
	month++;
	if (month > 11) {
		month = 0;
		year++;
    }
    date = new Date(year, month, 1);
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function goToPrevMonth () {
	month--;
	if (month < 0) {
		month = 11;
		year--;
    }
    date = new Date(year, month, 1);
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function populateDaysOfMonth () {
	for(let days_of_month_element of daysOfMonthElement){
    days_of_month_element.innerHTML = '';

    daysList.forEach(function(day){
        const day_element = document.createElement('div');
		day_element.classList.add('dom');
        day_element.textContent = day;
        days_of_month_element.appendChild(day_element);
    });
}
}

function populateDates () {
	for (let days_element of dayElements) {

	days_element.innerHTML = '';
	let amount_days = 31;

	if (month == 1 && year % 4 == 0) {
		amount_days = 29;
    }else{
        amount_days = 28;
    }
    const firstDate = new Date(year, month, 1);
    const dayOfWeek = firstDate.getDay();
    console.log(date);
    console.log('days of week',dayOfWeek);
    for (let i = 0; i < dayOfWeek; i++){
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = '';
        days_element.appendChild(day_element);
    }

	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			day_element.classList.add('selected');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			selected_date_element.textContent = formatDate(selectedDate);
			selected_date_element.dataset.value = selectedDate;

			populateDates();
		});

		days_element.appendChild(day_element);
	}
	}
}

function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}
