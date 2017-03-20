from .models import Survey
from .models import Question
from .models import Response
from .models import AnswerMultipleChoice
from .models import AnswerCheckbox
from .models import AnswerParagraph
from .models import AnswerNumeric
from .models import AnswerText

import json

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods


@require_http_methods(['GET'])
@login_required
def apply_survey(request):
    return(JsonResponse({ 'apply_survey' : ( (Survey.objects.filter(publish=True).count() > 0) and request.user.apply_survey and not request.user.survey_completed())}, status=200))


@login_required
def display_survey(request):
    try:
        survey = Survey.objects.get(publish=True)
    except Exception as e:
        context_dict={ 'Message: ': "Sorry there are no surveys active right now!" }
        return render(request, 'dynamic_survey.html', context_dict)

    questions = survey.questions.all()

    context_dict = {
        'page_title': 'Survey',
        'survey': survey,
        'questions': questions
    }

    return render(request, 'dynamic_survey.html', context_dict)


@require_http_methods(['POST'])
@login_required
def ajax_save_survey(request):
    survey = get_object_or_404(Survey, id = request.POST.get('survey_id'))
    data = json.loads(request.POST.get('survey_data'))
    new_resp = Response(survey=survey, user=request.user)
    new_resp.save()
    for question in data:
        question_id = question.get('id')
        this_question = get_object_or_404(Question, id=question_id)
        if this_question.type == 'multiplechoice':
            choice_value = []
            for question_reponse in question.get('responses'):
               # choice_id = question_reponse.get('id')
                if question_reponse.get('selected'):
                    choice_value.append(question_reponse.get('value'))
            new_answer_multiplechoice = AnswerMultipleChoice(question=this_question, response=new_resp, body="#@#".join(choice_value))
            new_answer_multiplechoice.save()

        if this_question.type == 'checkbox':
            choice_value = []
            for question_reponse in question.get('responses'):
                choice_id = question_reponse.get('id')
                choice_selected = question_reponse.get('selected')
                if choice_selected:
                    choice_value.append(question_reponse.get('value'))
            new_answer_checkbox = AnswerCheckbox(question=this_question, response=new_resp, body="#@#".join(choice_value))
            new_answer_checkbox.save()

        if this_question.type == 'paragraph':
            data_value = question.get('responses')[0].get('value')
            new_answer_paragraph = AnswerParagraph(question=this_question, response=new_resp, body=data_value)
            new_answer_paragraph.save()

        if this_question.type == 'numeric':
            data_value = question.get('responses')[0].get('value')
            new_answer_numeric = AnswerNumeric(question=this_question, response=new_resp, body=int(data_value))
            new_answer_numeric.save()

        if this_question.type == 'text':
            data_value = question.get('responses')[0].get('value')
            new_answer_text = AnswerText(question=this_question, response=new_resp, body=data_value)
            new_answer_text.save()

    return JsonResponse({}, status=200)

