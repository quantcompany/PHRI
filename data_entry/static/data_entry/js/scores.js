var scores = {
    chads2: 0,
    cha2: 0,
    hasbled: 0
};

// function calculateAge(birthDate){
//     var birthYear = birthDate.getFullYear();
//     var birthMonth = birthDate.getMonth();
//     var birthDay = birthDate.getDate();
//
//     var todayDate = new Date();
//     var todayYear = todayDate.getFullYear();
//     var todayMonth = todayDate.getMonth();
//     var todayDay = todayDate.getDate();
//
//     var age = todayYear - birthYear;
//
//     if (todayMonth < birthMonth){
//         age--;
//     }
//
//     if (birthMonth == todayMonth && todayDay < birthDay){
//         age--;
//     }
//
//     return age;
// }

function updateEverything(){
    updateChads2Score();
    updateCha2Score();
    updateHasbledScore();

    // these three are in guages.js
    updateChads2Gauges();
    updateCha2Gauges();
    updateHasbledGauges();

    updatePlots(); // this one is in plot.js

    updateRecommendedTherapy(); // this is in therapy.js
    renderGFR();
}

function updateChads2Score(){
    // CHADS2 = CHF + HTN + (Age >= 75) + Diabetes + 2*(Stroke or TIA)
    // MIN:0, MAX possible score: 6

    // calculate chf value
    var chfValue = $('#chf').bootstrapSwitch('state') ? 1:0;

    // calculate htn value
    // htn has 3 possible choices (0, 1 and 2)
    // if the choice is 0, the value should be 0
    // if the choice is 1 or 2, the value should be 1
    var htnValue = parseInt($('#htn').val()) ? 1:0;

    // calculate ageValue
    var age = parseInt($('#age').val()) || 0;
    var ageValue = age >= 75 ? 1:0;

    // calculate diabetes
    var diabetesValue = parseInt($('#diabetes_mellitus').val()) ? 1 : 0;

    // calculate stroke
    //var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;

    // calculate TIA
    //var tiaValue = $('#tia').bootstrapSwitch('state') ? 1:0;
    
    var tia_stroke_or_sysemb_value = $('#tia_stroke_or_sysemb').bootstrapSwitch('state') ? 1:0;

    // calculate final chads2 score
    scores.chads2 = chfValue + htnValue + ageValue + diabetesValue + 2*(tia_stroke_or_sysemb_value);

    // var score = scores.chads2;
    // var risk = risks.stroke.chads2Score(score);

    // $('#chads2_score').html(score);
    // $('#chads2_rp').html(risk.percentage + '%');
    // $('#chads2_ci').html(risk.ci.lower + ' - ' + risk.ci.upper);
}

function updateCha2Score(){
    // CHA2-DS2-VASc = CHF + HTN + (Age value in 65-74) + Diabetes + 2*(Stroke or TIA) + Vascular Disease + female + (Age >=75)
    // MIN:0, MAX possible score: 9

    // calculate chf value
    var chfValue = $('#chf').bootstrapSwitch('state') ? 1:0;

    // calculate htn value
    // htn has 3 possible choices (0, 1 and 2)
    // if the choice is 0, the value should be 0
    // if the choice is 1 or 2, the value should be 1
    var htnValue = parseInt($('#htn').val()) ? 1:0;

    // calculate ageValue
    var age = parseInt($('#age').val()) || 0;

    if (age < 65){
        var ageValue = 0;
    }else if (age >= 65 && age < 75){
        var ageValue = 1;
    }else if (age >= 75){
        var ageValue = 2;
    }

    // calculate diabetes
    var diabetesValue = parseInt($('#diabetes_mellitus').val()) ? 1 : 0;

    // calculate stroke
    //var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;

    // calculate TIA
    //var tiaValue = $('#tia').bootstrapSwitch('state') ? 1:0;

    var tia_stroke_or_sysemb_value = $('#tia_stroke_or_sysemb').bootstrapSwitch('state') ? 1:0;

    // calculate vascular disease
    // vascular disease has 4 possible choices (0, 1, 2 and 3)
    // if the choice is 0, the value should be 0
    // if the choice is 1, 2 or 3, the value should be 1
    var vascularDiseaseValue = parseInt($('#vascular_disease').val()) ? 1:0;

    // calculate gender
    var genderValue = $('#gender').val() == 'F' ? 1:0;

    // calculate final cha2 score
    scores.cha2 = chfValue + htnValue + ageValue + diabetesValue + 2*(tia_stroke_or_sysemb_value) + vascularDiseaseValue + genderValue;

    $('#cha2_score').html(scores.cha2);
}

function updateHasbledScore(){
    //HASBLED = HTN* + Renal Dysfunction + Liver Dysfuntion + Stroke + Bleeding + Labile INR + Age>=65 + Alcohol >= 8 drinks/week + Drugs
    /**
        HASBLED = HTN* (only Yes, uncontrolled on meds SBP>160 mmHg) + Renal Dysfunction + Liver Dysfuntion + Stroke + History of bleeding + Labile INR + Age>=65 + 1*(Alcohol >= 8 drinks/week OR Drugs) 
    **/

    // calculate htn value
    // htn has 3 possible choices (0, 1 and 2)
    // if the choice is 0 or 1, the value should be 0
    // if the choice is 2, the value should be 1
    var htnChoice = parseInt($('#htn').val());
    var htnValue = htnChoice == 2 ? 1:0;

    // calculate renal dysfunction
    var renalDysfunctionValue = $('#renal_dysfunction').bootstrapSwitch('state') ? 1:0;

    // calculate liver dysfunction
    var liverDysfunctionValue = $('#liver_dysfunction').bootstrapSwitch('state') ? 1:0;

    // calculate stroke
    //var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;

    var tia_stroke_or_sysemb_value = $('#tia_stroke_or_sysemb').bootstrapSwitch('state') ? 1:0;

    //Use of antiplatelet agents, NSAIDs, or other anti-inflammatory meds
    var aimValue = $('#aim').bootstrapSwitch('state') ? 1:0;

    // Bleeding
    var bleedingChoice = parseInt($('#hx_of_bleeding').val());
    var bleedingValue = bleedingChoice ? 1:0;

    // calculate inr instability (liable INR)
    var inrValue = $('#inr_instability').bootstrapSwitch('state') ? 1:0;

    // calculate ageValue
    var age = parseInt($('#age').val()) || 0;
    var ageValue = age >= 65 ? 1:0;

    // Drug abuse
    var drugAbuseValue = $('#drug_abuse').bootstrapSwitch('state') ? 1:0;
    var alcoholAbuseChoice = parseInt($('#alcohol_abuse').val()) || 0; // in case the selection is empty
    var alcoholAbuseValue = alcoholAbuseChoice == 2 ? 1:0;
    scores.hasbled = htnValue + renalDysfunctionValue + liverDysfunctionValue + tia_stroke_or_sysemb_value +
    bleedingValue + inrValue + ageValue + (drugAbuseValue || alcoholAbuseValue) + aimValue;

    $('#hasbled_score').html(scores.hasbled);
}



function computeGFR(){
    var weight = getWeight();
    var age = getAge();
    var creatinina = getCreatinine_mgdL();

    var numerator = (140 - age) * weight;
    var denominator = 72 * creatinina;

    var GFR = (numerator / denominator);

    if( getGender() == 'F' ) {
        GFR *= 0.85;
    }

    return GFR;

}

function clasifyGFR(value){
    var stages = [
        {
            id : 1,
            label: "Stage 1 Kidney Disease",
            description: "Healthy Kidneys or kidney damage with normal or high eGFR",
            level: "90 mL/min or more",
            color: '#35a338',
        },
        {
            id : 2,
            label: "Stage 2 Kidney Disease",
            description: "Kidney damage and mild decrease in eGFR",
            level: "60 to 89 mL/min",
            color: '#85c12f',
        },
        {
            id : 3,
            label: "Stage 3A & 3B Kidney Disease",
            description: "Moderate decrease in eGFR",
            level: "30 to 59 mL/min",
            color: '#f19a12',
        },
        {
            id : 4,
            label: "Stage 4 Kidney Disease",
            description: "Severe decrease in eGFR",
            level: "15 to 29 mL/min",
            color: '#f16b1a',
        },
        {
            id : 5,
            label: "Stage 5 Kidney Disease",
            description: "Kidney failure",
            level: "Less than 15 mL/min or on dialysis",
            color: '#9f0a1a',
        },
    ];
    var stage = {
        id : -1,
        label: "",
        description: "...",
        level: "",
        color: 'white',
    };

    if( value >= 90 ){
        stage = stages[0];
    } else if ( value >=60 && value < 90 ) {
        stage = stages[1];
    } else if ( value >=30 && value < 60 ) {
        stage = stages[2];
    } else if ( value >=15 && value < 30 ) {
        stage = stages[3];
    } else if ( value < 15 ) {
        stage = stages[4];
    } else {
        console.log('404: No clasifyGFR found');
    }

    return stage;
}

// Register change listeners to all fields involved in the formula,
// so that the scores, plot, and recommended therapy get updated as the
// form is filled out

$('#prior_acute_cs, #prior_stent_thrombosis, #frailty, #chf, #tia_stroke_or_sysemb, #liver_dysfunction, #inr_instability, #warfarin_intolerance, #doac_allergy_or_intolerance, #renal_dysfunction, #drug_abuse, #aim').on('switchChange.bootstrapSwitch', function(event, state){
    updateEverything();
});

$('#htn, #diabetes_mellitus #age, #alcohol_abuse, #gender, #vascular_disease, #bms_stent, #des_stent, #poba, #deb, #drug_coated_stent, #bvs, #hx_of_bleeding, #elective_pci, input[type="checkbox"][name^="pci_risk_"], #weight, [name^="creatinine_"], input[type="checkbox"][name="anemia"]').on('change', function(event, state){
    updateEverything();
});

$('#creatinine_measure').on('change', function(){
    var measure = $(this).val();
    $('input[name^="creatinine_"]')
    .stop(true, true).hide(0, function(){
        $('#creatinine_'+measure).stop(true, true).show(0);
    });
    $('label[for^="creatinine_"]')
    .stop(true, true).hide(0, function(){
        $('label[for^="creatinine_'+measure+'"]').stop(true, true).show(0);
    });
});
/*$('#hemoglobin_measure').on('change', function(){
    var measure = $(this).val();
    $('input[name^="hemoglobin_"]')
    .stop(true, true).hide(0, function(){
        $('#hemoglobin_'+measure).stop(true, true).show(0);
    });
    $('label[for^="hemoglobin_"]')
    .stop(true, true).hide(0, function(){
        $('label[for^="hemoglobin_'+measure+'"]').stop(true, true).show(0);
    });
});*/

/**
    Compute the transformation of values over the measure based on the input the user is using
    For: Hemoglobin & Creatinine
**/
/*$('#hemoglobin_mgdL').on('keyup', function(){
    var _value = parseFloat($(this).val(), 10);
    if( isNaN(_value) ) {
        $('#hemoglobin_gL').attr('value','');
        return;
    }
    var calc = _value * 0.01;
    $('#hemoglobin_gL').val( calc.toFixed(2) );
});
$('#hemoglobin_gL').on('keyup', function(){
    var _value = parseFloat($(this).val(), 10);
    if( isNaN(_value) ) {
        $('#hemoglobin_mgdL').attr('value','');
        return;
    }
    var calc = _value / 0.01;
    $('#hemoglobin_mgdL').val( calc.toFixed(2) );
});
*/

$('#creatinine_mgdL').on('keyup', function(){
    var _value = parseFloat($(this).val(), 10);
    if( isNaN(_value) ) {
        $('#creatinine_umolL').attr('value','');
        return;
    }
    var calc = _value * 88.5;
    $('#creatinine_umolL').val( calc.toFixed(2) );
});
$('#creatinine_umolL').on('keyup', function(){
    var _value = parseFloat($(this).val(), 10);
    if( isNaN(_value) ) {
        $('#creatinine_mgdL').attr('value','');
        return;
    }
    var calc = _value / 88.5;
    $('#creatinine_mgdL').val( calc.toFixed(2) );
});
