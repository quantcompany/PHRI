function validate_survey(questions)
{
	$('h4').css('color', '#000000');
	$('.question_error').css('display', 'none')
	.html('');
	var data = [];
	$(questions).each(function(i, obj) {
		var responses = [];
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
			current_question.find('input[type=radio]').each(function(key, item){
				
				responses.push(
					{
						"id" : $(item).attr('id').split('question_choice_')[1],
						"value": ($(item).hasClass('free_text')?$(item).next().val() : $(item).val()),
						"selected": $(item).is(':checked')
					}
				);
			});
			data.push({
				"id": current_id.split("question_")[1],
				"type" : type_question,
				"responses": responses
			});
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
			
			current_question.find('input[type=checkbox]').each(function(key, item){
				
				responses.push(
					{
						"id" : $(item).attr('id').split('question_choice_')[1],
						"value": ($(item).hasClass('free_text')?$(item).next().val() : $(item).val()),
						"selected": $(item).is(':checked')
					}
				);
			});
			data.push({
				"id": current_id.split("question_")[1],
				"type" : type_question,
				"responses": responses
			});
		}
		if(type_question === 'numeric')
		{
			var min = $('#'+current_id+' input[type=number]').attr('min');
			var max = $('#'+current_id+' input[type=number]').attr('max');
			var value = $('#'+current_id+' input[type=number]').val();
			//if(!isNaN(value) && value.length > 0)
			if(!isNaN(value) && value.length > 0)
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
			
			responses.push(
				{
					"value": value
				}
			);
			
			data.push({
				"id": current_id.split("question_")[1],
				"type" : type_question,
				"responses": responses
			});
			
		}
		if(type_question === 'paragraph')
		{
			var max = $('#'+current_id+' textarea').attr('maxlength');
			var value = $('#'+current_id+' textarea').val().length;
			if(value > max)
			{
				set_error_message(current_id,'You can only input a maximum of '+ max + 'characters including spaces.');
			}
			responses.push(
				{
					"value": value
				}
			);
			
			data.push({
				"id": current_id.split("question_")[1],
				"type" : type_question,
				"responses": responses
			});
		}
		if(type_question === 'text')
		{
			var max = $('#'+current_id+' input[type=text]').attr('maxlength');
			var value = $('#'+current_id+' input[type=text]').val().length;
			if(value > max)
			{
				set_error_message(current_id,'You can only input a maximum of '+ max + 'characters including spaces.');
			}
			responses.push(
				{
					"value": value
				}
			);
			
			data.push({
				"id": current_id.split("question_")[1],
				"type" : type_question,
				"responses": responses
			});
		}

    }); 
	return data
}

function set_error_message(element_id, message)
{
	$('#'+element_id+' h4').css('color', '#ff1111');
	$('#'+element_id+' .question_error').css({'color': '#ff1111', 'display':'block'})
	.html(message);
	
}

//Ajax Headers
jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});