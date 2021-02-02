let currentday = document.getElementById('currentDay')
console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
currentday.innerText = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

for (let keyIdx = 0; keyIdx < 9; ++keyIdx) {
    let local = `textarea${keyIdx}`;
    if (localStorage.getItem(local) !== undefined) {
        document.getElementById(local).value = localStorage.getItem(local);
    }
}


function changeColor() {
    const timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    let presentHr = parseInt(moment().hour());
    console.log(presentHr);
    let ele = document.getElementsByClassName('description');
    timeArray.map((hour, i) => {
        console.log(hour);

        let atts = ele[i].getAttribute('class')
        ele[i].setAttribute('class', `${atts} future`);
        ele[i].setAttribute('data-event', `eventNum${i}`);

        if ((presentHr >= 0 && presentHr < 5) || presentHr >= 18) {
            ele[i].setAttribute('class', `${atts} past`);
        } else if (presentHr >= 7 && presentHr < 9) {
            ele[i].setAttribute('class', `${atts} future`);
        } else if ((presentHr > 12) & (presentHr <= 17)) {
            // FOR PM
            if (hour <= 5) {
                hour += 12;
            }

            if (hour == presentHr) {
                console.log('present time');
                ele[i].setAttribute('class', `${atts} present`);
            } else if (hour < presentHr) {
                console.log('the past');
                ele[i].setAttribute('class', `${atts} past`);
            } else if (hour > presentHr) {
                console.log('the future')
                ele[i].setAttribute('class', `${atts} future`);
            }
        } else if ((presentHr <= 12) & (presentHr >= 9)) {
            // FOR AM
            if (hour <= 5) {
                hour += 12;
            }

            if (hour == presentHr) {
                console.log('present');
                ele[i].setAttribute('class', `${atts} present`);
            } else if (hour > presentHr) {
                console.log('FUTURE');
                ele[i].setAttribute('class', `${atts} future`);
            } else if (hour < presentHr) {
                console.log('PAST');
                ele[i].setAttribute('class', `${atts} past`);
            }
        } else if ((presentHr >= 0) & (presentHr < 6)) {
            console.log("the last past");
        }
    })
}

changeColor();

function saveEvent(evt) {
    evt.preventDefault();
    let eventNoteField = evt.target.previousElementSibling.getAttribute('id');
    let eventNoteValue = evt.target.previousElementSibling.value;
    localStorage.setItem(eventNoteField, eventNoteValue)
    console.log(evt.target.previousElementSibling.value);
    console.log(evt.target.previousElementSibling.getAttribute('id'));
}

let saveBtn = document.getElementsByClassName('saveBtn');
for (var i = 0; i < saveBtn.length; ++i) {
    console.log(saveBtn[i]);
    let tempId = `butId${i}`
    document.getElementById(tempId).addEventListener('click', saveEvent);
}