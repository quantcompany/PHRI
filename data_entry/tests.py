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

def P(**kwargs):
    # function that builds a Patient object using default values where possible.
    # kwargs are expected to only include fields that affect the formula's result.
    # If any fields are not included in the kwargs, their defaults are used
    age = kwargs.pop('age', 0)
    gender = kwargs.pop('gender', 'M')

    return Patient(
        identification='123-456-789',
        first_name='Barrack',
        middle_name='Hussein',
        last_name='Obama',
        age=age,
        gender=gender,
        **kwargs
    )

class Chads2TestCase(SimpleTestCase):
    def test_empty(self):
        """Testing empty case (all variables zero/false)"""
        self.assertEqual(P().chads2_score(), 0)

    def test_chf(self):
        """Testing "chf" variable """
        self.assertEqual(P(chf=False).chads2_score(), 0)
        self.assertEqual(P(chf=True).chads2_score(), 1)

    def test_htn(self):
        """Testing "htn" variable """
        # htn has 3 possible choices (0, 1 and 2)
        # if the choice is 0, the value should be 0
        # if the choice is 1 or 2, the value should be 1
        self.assertEqual(P(htn=0).chads2_score(), 0)
        self.assertEqual(P(htn=1).chads2_score(), 1)
        self.assertEqual(P(htn=2).chads2_score(), 1)

    def test_age(self):
        """Testing "age" variable """
        self.assertEqual(P(age=74).chads2_score(), 0)
        self.assertEqual(P(age=75).chads2_score(), 1)
        self.assertEqual(P(age=76).chads2_score(), 1)

    def test_diabetes_melitus(self):
        """Testing "diabetes_melitus" variable """
        self.assertEqual(P(diabetes_mellitus=False).chads2_score(), 0)
        self.assertEqual(P(diabetes_mellitus=True).chads2_score(), 1)

    def test_stroke_tia(self):
        """Testing "stroke" and "tia" variables """
        # chads2 score is increased by 2 points for EITHER stroke OR tia
        self.assertEqual(P(stroke=True, tia=False).chads2_score(), 2)
        self.assertEqual(P(stroke=False, tia=True).chads2_score(), 2)
        # when both are set, score should still be only 2
        self.assertEqual(P(stroke=True, tia=True).chads2_score(), 2)
        # when neither are set, score should be 0
        self.assertEqual(P(stroke=False, tia=False).chads2_score(), 0)

    def test_formula(self):
        """Testing all variables together"""
        # CHADS2 = CHF + HTN + (Age >= 75) + Diabetes + 2*(Stroke or TIA)
        self.assertEqual(P(
            chf=True,
            htn=1,
            age=76,
            diabetes_mellitus=True,
            stroke=True,
            tia=True
        ).chads2_score(), 6)


class Cha2TestCase(SimpleTestCase):
    def test_empty(self):
        """Testing empty case (all variables zero/false)"""
        self.assertEqual(P().cha2_score(), 0)

    def test_chf(self):
        """Testing "chf" variable """
        self.assertEqual(P(chf=False).cha2_score(), 0)
        self.assertEqual(P(chf=True).cha2_score(), 1)

    def test_htn(self):
        """Testing "htn" variable """
        # htn has 3 possible choices (0, 1 and 2)
        # if the choice is 0, the value should be 0
        # if the choice is 1 or 2, the value should be 1
        self.assertEqual(P(htn=0).cha2_score(), 0)
        self.assertEqual(P(htn=1).cha2_score(), 1)
        self.assertEqual(P(htn=2).cha2_score(), 1)

    def test_age(self):
        """Testing "age" variable """
        # < 65 = 0
        # >= 65 < 75 = 1
        # >= 75 = 2
        self.assertEqual(P(age=64).cha2_score(), 0)
        self.assertEqual(P(age=65).cha2_score(), 1)
        self.assertEqual(P(age=66).cha2_score(), 1)
        self.assertEqual(P(age=74).cha2_score(), 1)
        self.assertEqual(P(age=75).cha2_score(), 2)
        self.assertEqual(P(age=76).cha2_score(), 2)

    def test_diabetes_melitus(self):
        """Testing "diabetes_melitus" variable """
        self.assertEqual(P(diabetes_mellitus=False).cha2_score(), 0)
        self.assertEqual(P(diabetes_mellitus=True).cha2_score(), 1)

    def test_stroke_tia(self):
        """Testing "stroke" and "tia" variables """
        # cha2 score is increased by 2 points for EITHER stroke OR tia
        self.assertEqual(P(stroke=True).cha2_score(), 2)
        self.assertEqual(P(tia=True).cha2_score(), 2)
        # when both are set, score should still be only 2
        self.assertEqual(P(stroke=True, tia=True).cha2_score(), 2)
        # when neither are set, score should be 0
        self.assertEqual(P(stroke=False, tia=False).cha2_score(), 0)

    def test_vascular_disease(self):
        """Testing "vascular_disease" variable"""
        # vascular_disease has 4 possible choices (0, 1, 2 and 3)
        # if the choice is 0, the value should be 0
        # if the choice is 1, 2 or 3, the value should be 1
        self.assertEqual(P(vascular_disease=0).cha2_score(), 0)
        self.assertEqual(P(vascular_disease=1).cha2_score(), 1)
        self.assertEqual(P(vascular_disease=2).cha2_score(), 1)
        self.assertEqual(P(vascular_disease=3).cha2_score(), 1)

    def test_gender(self):
        """Testing "gender" variable"""
        self.assertEqual(P(gender='M').cha2_score(), 0)
        self.assertEqual(P(gender='F').cha2_score(), 1)

    def test_formula(self):
        """Testing all variables together"""
        # CHA2-DS2-VASc = CHF + HTN + (Age value in 65-74) + Diabetes + 2*(Stroke or TIA) + Vascular Disease + female + (Age >=75)
        # MIN:0, MAX possible score: 9
        self.assertEqual(P(
            chf=True,
            htn=1,
            age=64, # age 64
            diabetes_mellitus=True,
            stroke=True,
            tia=True,
            vascular_disease=1,
            gender='F'
        ).cha2_score(), 7)

        self.assertEqual(P(
            chf=True,
            htn=1,
            age=66, # age 66
            diabetes_mellitus=True,
            stroke=True,
            tia=True,
            vascular_disease=1,
            gender='F'
        ).cha2_score(), 8)

        self.assertEqual(P(
            chf=True,
            htn=1,
            age=76, # age 76
            diabetes_mellitus=True,
            stroke=True,
            tia=True,
            vascular_disease=1,
            gender='F'
        ).cha2_score(), 9)


class HasbledTestCase(SimpleTestCase):
    # HASBLED = HTN* + Renal Dysfunction + Liver Dysfuntion + Stroke + Bleeding + Labile INR + Age>=65 + Alcohol >= 8 drinks/week + Drugs
    def test_empty(self):
        """Testing empty case (all variables zero/false)"""
        self.assertEqual(P().hasbled_score(), 0)

    def test_htn(self):
        """Testing "htn" variable """
        # htn has 3 possible choices (0, 1 and 2)
        # if the choice is 0 or 1, the value should be 0
        # if the choice is 2, the value should be 1
        self.assertEqual(P(htn=0).hasbled_score(), 0)
        self.assertEqual(P(htn=1).hasbled_score(), 0)
        self.assertEqual(P(htn=2).hasbled_score(), 1)

    def test_renal_dysfunction(self):
        """Testing "renal_dysfunction" variable"""
        self.assertEqual(P(renal_dysfunction=False).hasbled_score(), 0)
        self.assertEqual(P(renal_dysfunction=True).hasbled_score(), 1)

    def test_liver_dysfunction(self):
        """Testing "liver_dysfunction" variable"""
        self.assertEqual(P(liver_dysfunction=False).hasbled_score(), 0)
        self.assertEqual(P(liver_dysfunction=True).hasbled_score(), 1)

    def test_stroke(self):
        """Testing "stroke" variable"""
        self.assertEqual(P(stroke=False).hasbled_score(), 0)
        self.assertEqual(P(stroke=True).hasbled_score(), 1)

    def test_bleeding(self):
        """Testing "hx_of_bleeding" variable"""# htn has 3 possible choices (0, 1 and 2)
        # if the choice is 0, the value should be 0
        # if the choice is 1 or 2, the value should be 1
        self.assertEqual(P(hx_of_bleeding=0).hasbled_score(), 0)
        self.assertEqual(P(hx_of_bleeding=1).hasbled_score(), 1)
        self.assertEqual(P(hx_of_bleeding=2).hasbled_score(), 1)

    def test_inr_instability(self):
        """Testing "inr_instability" variable"""
        self.assertEqual(P(inr_instability=False).hasbled_score(), 0)
        self.assertEqual(P(inr_instability=True).hasbled_score(), 1)

    def test_age(self):
        """Testing "age" variable """
        self.assertEqual(P(age=64).hasbled_score(), 0)
        self.assertEqual(P(age=65).hasbled_score(), 1)
        self.assertEqual(P(age=66).hasbled_score(), 1)

    def test_alcohol_abuse(self):
        """Testing "alcohol_abuse" variable """
        # alcohol_abuse has 3 possible choices (0, 1 and 2)
        # if the choice is 0 or 1, the value should be 0
        # if the choice is 2, the value should be 1
        self.assertEqual(P(alcohol_abuse=0).hasbled_score(), 0)
        self.assertEqual(P(alcohol_abuse=1).hasbled_score(), 0)
        self.assertEqual(P(alcohol_abuse=2).hasbled_score(), 1)

    def test_drug_abuse(self):
        """Testing "drug_abuse" variable """
        self.assertEqual(P(drug_abuse=False).hasbled_score(), 0)
        self.assertEqual(P(drug_abuse=True).hasbled_score(), 1)

    def test_formula(self):
        """Testing all variables together"""
        # HASBLED = HTN* + Renal Dysfunction + Liver Dysfuntion + Stroke + Bleeding + Labile INR + Age>=65 + Alcohol >= 8 drinks/week + Drugs
        # MIN:0, MAX possible score: 9
        self.assertEqual(P(
            htn=2,
            renal_dysfunction=True,
            liver_dysfunction=True,
            stroke=True,
            hx_of_bleeding=1,
            inr_instability=True,
            age=64, # age 64
            alcohol_abuse=1,
            drug_abuse=True
        ).hasbled_score(), 7)

        self.assertEqual(P(
            htn=2,
            renal_dysfunction=True,
            liver_dysfunction=True,
            stroke=True,
            hx_of_bleeding=1,
            inr_instability=True,
            age=65, # age 65
            alcohol_abuse=1,
            drug_abuse=True
        ).hasbled_score(), 8)

        self.assertEqual(P(
            htn=2,
            renal_dysfunction=True,
            liver_dysfunction=True,
            stroke=True,
            hx_of_bleeding=1,
            inr_instability=True,
            age=64, # age 64
            alcohol_abuse=2,
            drug_abuse=True
        ).hasbled_score(), 8)

        self.assertEqual(P(
            htn=2,
            renal_dysfunction=True,
            liver_dysfunction=True,
            stroke=True,
            hx_of_bleeding=1,
            inr_instability=True,
            age=65, # age 65
            alcohol_abuse=2,
            drug_abuse=True
        ).hasbled_score(), 9)
