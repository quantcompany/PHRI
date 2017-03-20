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
	exclude = ('type',)

	def save_model(self, request, obj, form, change):
		obj.type = 'multiplechoice'
		super(MultipleChoiceQuestionAdmin, self).save_model(request, obj, form, change)


class CheckboxChoiceInline(admin.TabularInline):
	model = CheckboxChoice
	extra = 1

class CheckboxChoiceQuestionAdmin(admin.ModelAdmin):
	inlines = [CheckboxChoiceInline]
	exclude = ('type',)

	def save_model(self, request, obj, form, change):
		obj.type = 'checkbox'
		super(CheckboxChoiceQuestionAdmin, self).save_model(request, obj, form, change)

class ParagraphQuestionAdmin(admin.ModelAdmin):
	exclude = ('type',)

	def save_model(self, request, obj, form, change):
		obj.type = 'paragraph'
		super(ParagraphQuestionAdmin, self).save_model(request, obj, form, change)


class NumericQuestionAdmin(admin.ModelAdmin):
	exclude = ('type',)

	def save_model(self, request, obj, form, change):
		obj.type = 'numeric'
		super(NumericQuestionAdmin, self).save_model(request, obj, form, change)

class TextQuestionAdmin(admin.ModelAdmin):
	exclude = ('type',)

	def save_model(self, request, obj, form, change):
		obj.type = 'text'
		super(TextQuestionAdmin, self).save_model(request, obj, form, change)

admin.site.register(Survey)
admin.site.register(ParagraphQuestion, ParagraphQuestionAdmin)
admin.site.register(NumericQuestion, NumericQuestionAdmin)
admin.site.register(CheckboxQuestion, CheckboxChoiceQuestionAdmin)
admin.site.register(MultipleChoiceQuestion, MultipleChoiceQuestionAdmin)
admin.site.register(TextQuestion, TextQuestionAdmin)
admin.site.register(Response)




