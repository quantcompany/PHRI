from django.db import models
from django.utils.timezone import now as timezone_now
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

# Extra models imports


#utils
from utils.models import CreateModifactionDateMixin
from utils.models import CreatedModificationUserMixin
from utils.models import PublishDataMixin

import shortuuid

class Survey(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    user = models.ForeignKey('users.User')
    key = models.CharField(max_length=22, null=False, unique=True)
    title = models.CharField(max_length=128, null=False)
    description = models.TextField(null=True)
    deadline = models.DateTimeField(null=True)
    # create a unique id for the survey
    def __init__(self, *args, **kwargs):
        super(Survey, self).__init__(*args, **kwargs)
        if not self.key:
            self.key = shortuuid.uuid()
        if not self.last_modified:
            self.last_modified = datetime.now()
        if kwargs.get('title'):
            self.title = kwargs['title']

    def __unicode__(self):
        return 'id=%s, key = %s, user=%s, title = %s, last_modified = %s, is_published=%s' % (
            self.id,
            self.key,
            self.user.username,
            self.title,
            self.modified.strftime('%H:%M, %d %B, %Y'),
            self.is_published)

    def get_absolute_url(self):
        return "/view_survey/%s" % self.key

    class Meta:
        ordering = ['id']


class Question(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    '''base question class'''
    survey = models.ForeignKey(Survey, related_name='questions')
    id_in_survey = models.IntegerField()
    QUESTION_TYPE_CHOICES = (
        ('multiplechoice', 'MultipleChoiceQuestion'),
        ('checkbox', 'CheckboxQuestion'),
        ('paragraph', 'ParagraphQuestion'),
        ('numeric', 'NumericQuestion'),
        ('text', 'TextQuestion')
    )
    type = models.CharField(choices=QUESTION_TYPE_CHOICES, max_length=25)
    title = models.CharField(max_length=500, null=False)
    help_text = models.CharField(max_length=500, null=True)
    is_required = models.BooleanField(default=False)

    def __unicode__(self):
        return 'No.%d, title=%s, type=%s, required=%s' % (self.id_in_survey, self.title, self.type, self.is_required)

    class Meta:
        ordering = ["id_in_survey"]




class ParagraphQuestion(Question):
    max_no_characters = models.IntegerField()

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "paragraph"


class NumericQuestion(Question):
    min_value = models.FloatField(null=True)
    max_value = models.FloatField(null=True)

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "numeric"

    def __unicode__(self):
        return 'title=%s, min=%f, max=%f' % (self.title, self.min_value, self.max_value)


class CheckboxQuestion(Question):
    max_checked = models.IntegerField(null=True)
    min_checked = models.IntegerField(null=True)

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "checkbox"


class CheckboxChoice(models.Model):
    question = models.ForeignKey(CheckboxQuestion, related_name='choices')
    label = models.CharField(max_length=200)
    id_in_question = models.IntegerField()

    def __unicode__(self):
        return 'label%d: %s' % (self.id, self.label)


class MultipleChoiceQuestion(Question):
    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "multiplechoice"


class MultipleChoice(models.Model):
    question = models.ForeignKey(MultipleChoiceQuestion, related_name='choices')
    label = models.CharField(max_length=200)
    id_in_question = models.IntegerField()

    def __unicode__(self):
        return 'label%d: %s' % (self.id_in_question, self.label)


class TextQuestion(Question):
    max_no_characters = models.IntegerField(null=True)

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "text"

    def __unicode__(self):
        return 'title=%s, max_no_characters=%d' % (self.title, self.max_no_characters)



class Response(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
	survey = models.ForeignKey(Survey)

	def __unicode__(self):
		return ("response %s" % self.survey)

class AnswerBase(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
	question = models.ForeignKey(Question)
	response = models.ForeignKey(Response)

# these type-specific answer models use a text field to allow for flexible
# field sizes depending on the actual question this answer corresponds to. any
# "required" attribute will be enforced by the form.
class AnswerText(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerRadio(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerSelect(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerSelectMultiple(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerInteger(AnswerBase):
	body = models.IntegerField(blank=True, null=True)