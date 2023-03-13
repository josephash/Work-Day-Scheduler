// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	// TODO: Add a listener for click events on the save button. This code should
	// use the id in the containing time-block as a key to save the user input in
	// local storage. HINT: What does `this` reference in the click listener
	// function? How can DOM traversal be used to get the "hour-x" id of the
	// time-block containing the button that was clicked? How might the id be
	// useful when saving the description in local storage?
	function saveButton() {
		let userData = {
			text9: '',
			text10: '',
			text11: '',
			text12: '',
			text13: '',
			text14: '',
			text15: '',
			text16: '',
			text17: '',
		};
		if (localStorage.getItem('userData') != null) {
			userData = JSON.parse(localStorage.getItem('userData'));
		}
		let hour = $(this).parent().attr('id');
		let text = $(this).parent().find('textarea').val();
		userData[hour.replace('hour-','text')] = text;
		localStorage.setItem('userData', JSON.stringify(userData));
		return;
	}
	$('.saveBtn').on('click', saveButton);

	// TODO: Add code to apply the past, present, or future class to each time
	// block by comparing the id to the current hour. HINTS: How can the id
	// attribute of each time-block be used to conditionally add or remove the
	// past, present, and future classes? How can Day.js be used to get the
	// current hour in 24-hour time?
	for (let i = 9; i <= 17; i++) {
		if (i < dayjs().hour()) {
			$('#hour-' + i).addClass('past');
		} else if (i == dayjs().hour()) {
			$('#hour-' + i).addClass('present');
		} else {
			$('#hour-' + i).addClass('future');
		}
	}

	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	for (let i = 9; i <= 17; i++) {
		if (localStorage.getItem('userData') != null) {
			$('#hour-' + i).find('textarea').val(JSON.parse(localStorage.getItem('userData'))['text' + i]);
		}
	}

	// TODO: Add code to display the current date in the header of the page.
	let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$('#currentDay').text(
		dayOfWeek[dayjs().day()] + ', ' +
		months[dayjs().month()] + ' ' +
		dayjs().date()
	);
});
