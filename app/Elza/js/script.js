$(document).ready(function () {
	var note = $('#note'),
		ts = new Date(2014, 11, 1),
		newYear = true;
	
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		ts = (new Date()).getTime() + 10*24*60*60*1000;
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});
	$('#countdown2').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});
	$('#countdown3').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});



	$('.menu_ico').click(function(){
		$('.hideMenu').toggle();
	});
	$('.magaz').click(function(){
		$('#modalMogaz').show();
		$('#hideBg').show();
	});
	$('.dost').click(function(){
		$('#modalDost').show();
		$('#hideBg').show();
	});
	$('.gor').click(function(){
		$('#modalGor').show();
		$('#hideBg').show();
	});
	$('.faq').click(function(){
		$('#modalFaq').show();
		$('#hideBg').show();
	});
	$('.prem').click(function(){
		$('#modalPrem').show();
		$('#hideBg').show();
	});
	$('#close, .backBottom, #hideBg').click(function(){
		$('#modalMogaz, #modalDost, #modalGor, #hideBg, #modalFaq, #modalPrem').hide();
	});

	$('#footer .pol').click(function(){
		$('#modal_window1').animate({opacity: 'show'}, 300);
	});
	$('#modal_window1').click(function(){
		$('#modal_window1').animate({opacity: 'hide'}, 300);
	});
	$('.countDays').append('<p>дней</p>');
	$('.countHours').append('<p>часов</p>');
	$('.countMinutes').append('<p>минут</p>');
	$('.countSeconds').append('<p>секунд</p>');
});
