from datetime import timedelta

from django.test import SimpleTestCase
from django.utils import timezone 

from .models import Patient



# chf
# htn
# diabetes_mellitus
# stroke
# tia
# liver_dysfunction
# inr_instability
# warfarin_intolerance
# renal_dysfunction
# drug_abuse
# hx_of_bleeding
# alcohol_abuse
# stent
# vascular_disease
    
dob74 = timezone.now().date() - timedelta(days=365*74) #date of birth for age 74
dob75 = timezone.now().date() - timedelta(days=365*75) #date of birth for age 75
dob76 = timezone.now().date() - timedelta(days=365*76) #date of birth for age 76

def P(**kwargs):
    # function that builds a patient object using default values where possible.
    # kwargs are expected to only include fields that affect the formula's result. 
    # If any fields are not included in the kwargs, their defaults are used
    dob = kwargs.pop('dob', timezone.now().date())
    gender = kwargs.pop('gender', 'M')

    return Patient(
        identification='123-456-789',
        first_name='Barrack',
        middle_name='Hussein',
        last_name='Obama',
        date_of_birth=dob,
        gender=gender,
        **kwargs
    )

class Chads2TestCase(SimpleTestCase):
    def test_empty(self):
        """Testing empty case (all variables zero/false)"""
        self.assertEqual(P().chads2_score(), 0)

    def test_chf(self):
        """Testing "chf" variable individually"""
        self.assertEqual(P(chf=True).chads2_score(), 1)

    def test_htn(self):
        """Testing "htn" variable individually"""
        # htn has 3 possible choices (0, 1 and 2)
        # if the choice is 0, the value should be 0
        # if the choice is 1 or 2, the value should be 1
        self.assertEqual(P(htn=1).chads2_score(), 1)
        self.assertEqual(P(htn=2).chads2_score(), 1)

    def test_age(self):
        """Testing "age" variable individually"""
        self.assertEqual(P(dob=dob74).chads2_score(), 0)
        self.assertEqual(P(dob=dob75).chads2_score(), 1)
        self.assertEqual(P(dob=dob76).chads2_score(), 1)

    def test_diabetes_melitus(self):
        """Testing "diabetes_melitus" variable individually"""
        self.assertEqual(P(diabetes_mellitus=True).chads2_score(), 1)

    def test_stroke_tia(self):
        """Testing "stroke" and "tia" variables individually"""
        # chads2 score is increased by 2 points for EITHER stroke OR tia
        self.assertEqual(P(stroke=True).chads2_score(), 2)
        self.assertEqual(P(tia=True).chads2_score(), 2)
        # when both are set, score should still be only 2
        self.assertEqual(P(stroke=True, tia=True).chads2_score(), 2)

    def test_formula(self):
        """Testing all variables together"""
        # CHADS2 = CHF + HTN + (Age >= 75) + Diabetes + 2*(Stroke or TIA)
        self.assertEqual(P(
            chf=True,
            htn=1,
            dob=dob76,
            diabetes_mellitus=True,
            stroke=True,
            tia=True
        ).chads2_score(), 6)
