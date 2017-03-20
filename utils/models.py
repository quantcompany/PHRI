from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now as timezone_now

from datetime import datetime


class CreateModifactionDateMixin(models.Model):
    created = models.DateTimeField(_("Creation Date and Time"), default=datetime.now, editable=False)
    modified = models.DateTimeField(_("Modification Date and Time"), null=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.created = timezone_now()
        else:
            if not self.created:
                self.created = timezone_now()
            self.modified = timezone_now()
        super(CreateModifactionDateMixin, self).save(*args, **kwargs)
    save.alters_data = True

    class Meta:
        abstract = True


class CreatedModificationUserMixin(models.Model):
	"""
		Abstract class for created_by and modified_by fields
	"""

	created_by = models.ForeignKey('users.User', related_name="%(class)s_user_crea", editable=False)
	modified_by = models.ForeignKey('users.User', related_name="%(class)s_user_mod", null=True, editable=False)
	
	class Meta:
		abstract = True


class PublishDataMixin(models.Model):
	"""
		Abstract class to manage the order and publish state of content
	"""
	publish = models.BooleanField(_("Publish"), blank=True, default=True, help_text="Este campo activará el contenido en la pagina.")
	order = models.IntegerField(_("Order"), blank=True, default=0, help_text="Este campo será utilizado para definir el orden del contenido. ")

	class Meta:
		abstract = True