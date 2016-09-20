from django.core.management.base import BaseCommand, CommandError

from data_entry.models import VesselsPCI


class Command(BaseCommand):
    help = 'Creates default database values for Vessels PCI model'
    vessels = ['LM', 'LDA', 'D1', 'D2', 'Ramus', 'LCx', 'OM1', 'OM2', 'RCA', 'PDA', 'PL']

    def handle(self, *args, **options):
        for value in self.vessels:
            if VesselsPCI.objects.filter(value=value).exists():
                self.stdout.write(self.style.SUCCESS('"{0}" already exists'.format(value)))
            else:
                VesselsPCI.objects.create(value=value)
                self.stdout.write(self.style.SUCCESS('"{0}" created'.format(value)))
        self.stdout.write(self.style.SUCCESS('OK!'))
