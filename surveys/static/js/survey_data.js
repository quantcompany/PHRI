function processSurvey()
{
	var questions = $('.question.required');
	var validation_result = validate_survey(questions);

	if(!$('.question_error').is(':visible'))
	{

	}
	else
	{
		$('html, body').animate({
        scrollTop: $('.question_error').first().offset().top - 200
    	}, 700);
	}

}

function validate_survey(questions)
{
	$('h4').css('color', '#000000');
	$('.question_error').css('display', 'none')
	.html('');
	var 
	$(questions).each(function(i, obj) {
		var current_question = $(this);
		var current_id = this.id;
		var type_question = current_question.attr('question-type');
		//var text_input = current_question.find('input[type=text]');

		//validate MultipleChoices
		if(type_question === 'multiplechoice')
		{
			if(current_question.find('input[type=radio]').is(':checked') == false)
			{
				set_error_message(current_id,'Please select on of the choices below or fill out the free text option.');
			}
			else if(current_question.find('input[type=radio].free_text').is(':checked') && current_question.find('input[type=radio].free_text').first().next().val().length < 1 )
			{
				set_error_message(current_id,'Please fill out the free text option.');
			}
		}
		if(type_question === 'checkbox')
		{
			var min = $('#'+current_id+' div.choices').attr('min');
			var max = $('#'+current_id+' div.choices').attr('max');
			if(current_question.find('input[type=checkbox]:checked').length < min || current_question.find('input[type=checkbox]:checked').length > max )
			{

				set_error_message(current_id,'You can only select a minimum of ' + min +' option and a maximum of ' + max+' options.');
			}
			else if(current_question.find('input[type=checkbox].free_text').is(':checked') && current_question.find('input[type=checkbox].free_text').first().next().val().length < 1 )
			{
				set_error_message(current_id,'Please fill out the free text option.');
			}
		}
		if(type_question === 'numeric')
		{
			var min = $('#'+current_id+' input[type=number]').attr('min');
			var max = $('#'+current_id+' input[type=number]').attr('max');
			var value = parseInt($('#'+current_id+' input[type=number]').val(),10);
			if(!isNaN(value))
			{
				value = parseInt(value,10);
				if(value < min || value > max || value === NaN)
				{
					set_error_message(current_id,'You can only input a number between ' + min +' and ' + max);
				}
			}
			else
			{
				set_error_message(current_id,'Please fill out the field.');
			}
			
		}
		if(type_question === 'paragraph')
		{
			var max = $('#'+current_id+' textarea').attr('maxlength');
			var value = $('#'+current_id+' textarea').val().length;
			if(value > max)
			{
				set_error_message(current_id,'You can only input a maximum of '+ max + 'characters including spaces.');
			}
		}
		if(type_question === 'text')
		{
			var max = $('#'+current_id+' input[type=text]').attr('maxlength');
			var value = $('#'+current_id+' input[type=text]').val().length;
			if(value > max)
			{
				set_error_message(current_id,'You can only input a maximum of '+ max + 'characters including spaces.');
			}
		}

    }); 
}

function set_error_message(element_id, message)
{
	$('#'+element_id+' h4').css('color', '#ff1111');
	$('#'+element_id+' .question_error').css({'color': '#ff1111', 'display':'block'})
	.html(message);
	
}