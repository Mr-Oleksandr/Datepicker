'use strict'


document.addEventListener("DOMContentLoaded", () => {


const btnOpenModal = document.querySelector('.btn-datepicker'),
modal = document.querySelector('.modal'),
datepicker = document.querySelector('.datepicker-calendar'),
prevtMonth = document.querySelector('.btn-datepicker-year-left'),
nextMonth = document.querySelector('.btn-datepicker-year-right'),
monthElement = document.querySelector('.datepicker-month'),
yearElement = document.querySelector('.datepicker-today-year'),
dayElement = document.querySelector('.datepicker-day'),
mode = document.querySelector('.mode'),
cheked = document.querySelector('.checkbox')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date = new Date();
let count = 0;


function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

function changeBgColorWhite(){
    datepicker.style.backgroundColor = '#14152a';
    datepicker.style.color = 'white';
    nextMonth.style.color = 'white';
    prevtMonth.style.color = 'white';
};

function changeBgColorDark(){
    datepicker.style.backgroundColor = 'white';
    datepicker.style.color = '#14152a';
    nextMonth.style.color = '#14152a';
    prevtMonth.style.color = '#14152a';
};

function getInputChecked(){
    if(localStorage.getItem('isChecked')){
        cheked.checked = true;
        mode.textContent = 'Dark Mode';
        changeBgColorWhite();
    };
};

function openModal(){
    modal.classList.add('show')
};

function closeModal(){
    modal.classList.remove('show')
};

//function

function setNextMonth(){
    count++
    setDay(1, count)
};

function setPrevMonth(){
    count--
    setDay(-1, count)
};

function setMonthAndYear(){
    monthElement.textContent = months[date.getMonth()];
    yearElement.textContent = date.getFullYear();
};

function renderDays(daysWithEmpty){
    let day = new Date();
    daysWithEmpty.map((item)=> {
        
        if (item) {
            dayElement.innerHTML += `<div class='day' style="cursor: pointer;">${item}</div>`
        } else {
            dayElement.innerHTML += `<div></div>`
        }
    
    });
    const d = document.querySelectorAll('.day')
    const getIsToday = (day) => {
        const d = new Date(date.getFullYear(), date.getMonth(), day)
        return d.getTime() === new Date().setHours(0, 0, 0, 0)
    };

    d.forEach((item) => {
        if(getIsToday(+item.textContent) && cheked.checked){
            item.classList.add('today')
        }else if(getIsToday(+item.textContent) && !cheked.checked){
            item.classList.remove('today')
            item.classList.add('today-white')
        }
    });
};

function getEmptyDays(){
    const days = Array.from({ length: daysInMonth(date.getMonth() + 1, date.getFullYear()) }, (k, v) => v + 1);
    const emptyDays = Array.from({ length: date.getDay() }, (k, v) => 0);
    const daysWithEmpty = [...emptyDays, ...days];
    return daysWithEmpty;
};

function setDay(month){
    dayElement.innerHTML = ''
    let selectedDays = [];
    date = new Date(date.getFullYear(), date.getMonth() + month, 1);

    setMonthAndYear();
    getEmptyDays();
    const daysWith = getEmptyDays();
    renderDays(daysWith);
    
        const d = document.querySelectorAll('.day');
        d.forEach((item)=> {
            item.addEventListener('click', (e)=>{
                const targetDay  = +e.target.textContent;
                const selectedDay = new Date(date.getFullYear(), date.getMonth(), targetDay);
                item.classList.add('selected-day')
                if(!item.classList.contains('today') && !item.classList.contains('today-white')){
                    item.style.borderRadius = '50%'
                };
                selectedDays.push(selectedDay)
                if(selectedDays.length >= 3){
                    selectedDays = [];
                    d.forEach((item)=>{
                        item.classList.remove('selected-day')
                    })
                };
            })
        });
};



cheked.addEventListener('change',()=> {
    if(!cheked.checked){
        setDay(0);
        localStorage.removeItem('isChecked', false)
        mode.textContent = 'Light Mode'
        
        changeBgColorDark();
    }else{
        setDay(0);
        localStorage.setItem('isChecked', true)
        mode.textContent = 'Dark Mode'
        changeBgColorWhite();
    }
});

btnOpenModal.addEventListener('click', () => {
    openModal();
});

document.addEventListener('keydown', (e) => {
    const key = e.keyCode
    if(key === 27 &&  modal.classList.contains('show')) {
        closeModal();
    }
});

modal.addEventListener('click',(e) => {
    if(e.target === modal){
        closeModal();
    }
});

   prevtMonth.addEventListener('click', setPrevMonth);

   nextMonth.addEventListener('click', setNextMonth);

    getInputChecked();
    setDay(0);

});