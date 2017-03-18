from django import forms

from .models import Survey, SurveyQuestion

class SurveyForm(forms.ModelForm):

	def __init__(self, *args, **kwargs):
	    super(SurveyForm, self).__init__(*args, **kwargs)
	    self.fields['q1'].label = SurveyQuestion.objects.first().l_q1

	class Meta:
		model = Survey
		fields = ('q1',)
		widgets = {
			'q1': forms.RadioSelect(attrs={'class':'form-control'})
		}