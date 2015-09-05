$(document).ready(function() {
	vectorInit();
});

$(window).on('load', function() {	
	drawCurves();
	$('#button').on('click', function() {
		$(this).hide();
		vectorInit();
		drawCurves();
	});
});

var target = '.svg-layer';

function vectorInit() {
	$(target).each(function() {
		var sequence = $('path', this);
		var iter, vector, length;

		for (iter = 0; iter < sequence.length; iter++) {
			vector = sequence[iter];
			length = vector.getTotalLength();
			$(vector).attr('data-length', length).css({'stroke-dashoffset': length, 'stroke-dasharray': length});
		}
	});
}

var count = 0;

function drawCurves() {
	var sequence = $(target).find('path');
	var total = sequence.length-1;
	var vector = sequence.eq(count);
	var length = vector.attr('data-length');

	vector.animate({'stroke-dashoffset': 0}, {
		duration: 3*length,
		easing: 'linear',
		complete: function() {
			vector.stop(true, true);
			if (count == total) {
				count = 0;
				$('#button').fadeIn().css('display', 'block');
			} else {
				count++; 
				drawCurves();
			}
		}
	});
}