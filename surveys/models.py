from django.db import models
from utils.models import CreateModifactionDateMixin
from utils.models import CreatedModificationUserMixin
from utils.models import PublishDataMixin
import shortuuid


class Survey(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    key = models.CharField(max_length=22, null=False, unique=True)
    title = models.CharField(max_length=128, null=False)
    description = models.TextField(null=True)
    def __init__(self, *args, **kwargs):
        super(Survey, self).__init__(*args, **kwargs)
        if not self.key:
            self.key = shortuuid.uuid()
        if kwargs.get('title'):
            self.title = kwargs['title']

    def __str__(self):
        return 'id=%s, title = %s, created = %s, is_published=%s' % (
            self.id,
            self.title,
            self.created.strftime('%H:%M, %d %B, %Y'),
            self.publish)

    def get_absolute_url(self):
        return "/view_survey/%s" % self.key

    def get_report_data(self):
        headers = ["user", "created"]
        rows = []
        
        # creating headers
        for q in self.questions.all():
            if q.type == 'checkbox':
                for ch in q.checkboxquestion.choices.all():
                    headers.append(q.title + ' [' + ch.label + ']')
            else:
                headers.append(q.title)

        # Generating rows
        for r in self.responses.all():
            a_row = [r.user.user_name, r.created]
            for a in r.answers.all():
                if a.question.type == 'multiplechoice':
                    a_row.append(a.answermultiplechoice.body)
                if a.question.type == 'checkbox':


                    options_selected = a.answercheckbox.body.split('#@#')
                    all_checkbox_choices = a.question.checkboxquestion.choices.all()
                    all_checkbox_choices_label = [x.label for x in all_checkbox_choices]

                    for chch in all_checkbox_choices:
                        if chch.free_text:
                            inserted = False
                            for os_str in options_selected:
                                if os_str not in all_checkbox_choices_label:
                                    a_row.append(os_str)
                                    inserted = True
                                    break
                            if not inserted:
                                a_row.append(False)
                        else:
                            a_row.append(chch.label in options_selected)



                if a.question.type == 'paragraph':
                    a_row.append(a.answerparagraph.body)
                if a.question.type == 'numeric':
                    a_row.append(a.answernumeric.body)
                if a.question.type == 'text':
                    a_row.append(a.answertext.body)
            rows.append(a_row)

        return dict(headers=headers, rows=rows)

    class Meta:
        ordering = ['id']


class Question(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    survey = models.ForeignKey(Survey, related_name='questions')
    QUESTION_TYPE_CHOICES = (
        ('multiplechoice', 'MultipleChoiceQuestion'),
        ('checkbox', 'CheckboxQuestion'),
        ('paragraph', 'ParagraphQuestion'),
        ('numeric', 'NumericQuestion'),
        ('text', 'TextQuestion')
    )
    type = models.CharField(choices=QUESTION_TYPE_CHOICES, max_length=25)
    title = models.CharField(max_length=500, null=False)
    important_text = models.CharField(max_length=500, blank=True, null=True)
    help_text = models.CharField(max_length=500, blank=True)
    is_required = models.BooleanField(default=True)

    def __str__(self):
        return 'No.%d, title=%s, type=%s, required=%s' % (self.order, self.title, self.type, self.is_required)

    class Meta:
        ordering = ["order"]


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

    def __str__(self):
        return 'title=%s, min=%f, max=%f' % (self.title, self.min_value, self.max_value)


class CheckboxQuestion(Question):
    min_checked = models.IntegerField(null=True)
    max_checked = models.IntegerField(null=True)

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "checkbox"


class CheckboxChoice(models.Model):
    question = models.ForeignKey(CheckboxQuestion, related_name='choices')
    label = models.CharField(max_length=200)
    order = models.IntegerField()
    free_text = models.BooleanField(default=False)

    def __str__(self):
        return 'label%d: %s' % (self.id, self.label)

    class Meta:
        ordering = ["order"]


class MultipleChoiceQuestion(Question):
    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "multiplechoice"


class MultipleChoice(models.Model):
    question = models.ForeignKey(MultipleChoiceQuestion, related_name='choices')
    label = models.CharField(max_length=200)
    order = models.IntegerField()
    free_text = models.BooleanField(default=False)

    def __str__(self):
        return 'label%d: %s' % (self.order, self.label)

    class Meta:
        ordering = ["order"]


class TextQuestion(Question):
    max_no_characters = models.IntegerField(null=True)

    def __init__(self, *args, **kwargs):
        super(Question, self).__init__(*args, **kwargs)
        self.type = "text"

    def __str__(self):
        return 'title=%s, max_no_characters=%d' % (self.title, self.max_no_characters)


class Response(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    survey = models.ForeignKey(Survey, related_name="responses")
    user = models.ForeignKey('users.User')

    def __str__(self):
        return ("response %s" % self.survey)


class AnswerBase(CreateModifactionDateMixin, CreatedModificationUserMixin, PublishDataMixin):
    question = models.ForeignKey(Question, related_name='answers')
    response = models.ForeignKey(Response, related_name='answers')

    class Meta:
        ordering = ["question__order"]


class AnswerParagraph(AnswerBase):
    body = models.TextField(blank=True, null=True)


class AnswerNumeric(AnswerBase):
    body = models.IntegerField(blank=True, null=True)


class AnswerCheckbox(AnswerBase):
    body = models.TextField(blank=True, null=True)


class AnswerMultipleChoice(AnswerBase):
    body = models.TextField(blank=True, null=True)


class AnswerText(AnswerBase):
    body = models.TextField(blank=True, null=True)