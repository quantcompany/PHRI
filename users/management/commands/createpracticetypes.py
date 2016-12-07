from django.core.management.base import BaseCommand, CommandError

from users.models import PracticeType


class Command(BaseCommand):
    help = 'Creates default database values for PracticeType model'
    practices = ['Academic Hospital', 'Community Hospital', 'Group Practice', 'Solo Practice']

    def handle(self, *args, **options):
        for name in self.practices:
            if PracticeType.objects.filter(name=name).exists():
                self.stdout.write(self.style.SUCCESS('"{0}" already exists'.format(name)))
            else:
                PracticeType.objects.create(name=name)
                self.stdout.write(self.style.SUCCESS('"{0}" created'.format(name)))
        self.stdout.write(self.style.SUCCESS('OK!'))
