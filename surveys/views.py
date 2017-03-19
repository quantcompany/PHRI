from django.shortcuts import render

#model import
from .models import Survey
from .models import Question
from .models import ParagraphQuestion
from .models import NumericQuestion
from .models import CheckboxQuestion
from .models import CheckboxChoice
from .models import MultipleChoiceQuestion
from .models import MultipleChoice
from .models import TextQuestion
'''from .models import Response
from .models import AnswerBase
from .models import AnswerText
from .models import AnswerRadio
from .models import AnswerSelect
from .models import AnswerSelectMultiple
from .models import AnswerInteger'''


import json
import math
import itertools

from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, Http404
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.views.decorators.csrf import csrf_exempt



def display_survey(request):

	try:
		survey = Survey.objects.filter(publish=True)
	except Exception as e:
		context_dict={ 'Message: ': "Sorry there are no surveys active right now!" }
		return render(request,'dynamic_survey.html', context_dict)

	questions = survey[0].questions.all()
	for question in questions:
		print(question)

	context_dict={
				'page_title': 'Survey',
				'survey': survey,
				}

	return render(request,'dynamic_survey.html', context_dict)