from django.contrib import admin
from custom_user.admin import EmailUserAdmin
from .models import User


class UserAdmin(EmailUserAdmin):
    """
    You can customize the interface of your model here.
    """
#    fields = ['user_name', 'first_name', 'last_name', 'institution', 'researcher']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Profile', {'fields': ('user_name', 'first_name', 'last_name', 'institution', 'researcher')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


# Register your models here.
admin.site.register(User, UserAdmin)


