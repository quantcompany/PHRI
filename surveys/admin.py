from django.contrib import admin
 
# Model import

from .models import Survey
from .models import ParagraphQuestion
from .models import NumericQuestion
from .models import CheckboxQuestion
from .models import CheckboxChoice
from .models import MultipleChoiceQuestion
from .models import MultipleChoice
from .models import TextQuestion
from .models import Response
from .models import AnswerBase
from .models import AnswerParagraph
from .models import AnswerNumeric
from .models import AnswerCheckbox
from .models import AnswerMultipleChoice
from .models import AnswerText

# Model registration in the admin

class MultipleChoiceInline(admin.TabularInline):
	model = MultipleChoice
	extra = 1

class MultipleChoiceQuestionAdmin(admin.ModelAdmin):
	inlines = [MultipleChoiceInline]


class CheckboxChoiceInline(admin.TabularInline):
	model = CheckboxChoice
	extra = 1

class CheckboxChoiceQuestionAdmin(admin.ModelAdmin):
	inlines = [CheckboxChoiceInline]

admin.site.register(Survey)
admin.site.register(ParagraphQuestion)
admin.site.register(NumericQuestion)
admin.site.register(CheckboxQuestion, CheckboxChoiceQuestionAdmin)
admin.site.register(CheckboxChoice)
admin.site.register(MultipleChoiceQuestion, MultipleChoiceQuestionAdmin)
admin.site.register(TextQuestion)
admin.site.register(Response)
admin.site.register(AnswerBase)
admin.site.register(AnswerParagraph)
admin.site.register(AnswerNumeric)
admin.site.register(AnswerCheckbox)
admin.site.register(AnswerMultipleChoice)
admin.site.register(AnswerText)



