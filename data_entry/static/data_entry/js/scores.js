var scores = {
    chads2: 0,
    cha2: 0,
    hasbled: 0
};

function calculateAge(birthDate){
    var birthYear = birthDate.getFullYear();
    var birthMonth = birthDate.getMonth();
    var birthDay = birthDate.getDate();

    var todayDate = new Date();
    var todayYear = todayDate.getFullYear();
    var todayMonth = todayDate.getMonth();
    var todayDay = todayDate.getDate();

    var age = todayYear - birthYear;

    if (todayMonth < birthMonth){
        age--;
    }

    if (birthMonth == todayMonth && todayDay < birthDay){
        age--;
    }

    return age;
}

function updateEverything(){
    updateChads2Score();
    updateCha2Score();
    updateHasbledScore();
    
    // these three are in guages.js
    updateChads2Gauges();
    updateCha2Gauges();
    updateHasbledGauges();

    updateChart(); // this one is in plot.js
    
    updateRecommendedTherapy(); // this is in therapy.js
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
    var birth_timestamp = Date.parse($('#date_of_birth').val());

    if (isNaN(birth_timestamp)){
        var ageValue = 0;
    }else{
        var birthDate = new Date(birth_timestamp);
        var ageValue = calculateAge(birthDate) >= 75 ? 1:0;
    }

    // calculate diabetes
    var diabetesValue = $('#diabetes_mellitus').bootstrapSwitch('state') ? 1:0;

    // calculate stroke
    var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;
    
    // calculate TIA
    var tiaValue = $('#tia').bootstrapSwitch('state') ? 1:0;

    // calculate final chads2 score
    scores.chads2 = chfValue + htnValue + ageValue + diabetesValue + 2*(strokeValue || tiaValue);

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
    var birth_timestamp = Date.parse($('#date_of_birth').val());

    if (isNaN(birth_timestamp)){
        var ageValue = 0;
    }else{
        var birthDate = new Date(birth_timestamp);
        var age = calculateAge(birthDate);

        if (age < 65){
            var ageValue = 0;
        }else if (age >= 65 && age < 75){
            var ageValue = 1;
        }else if (age >= 75){
            var ageValue = 2;
        }
    }

    // calculate diabetes
    var diabetesValue = $('#diabetes_mellitus').bootstrapSwitch('state') ? 1:0;

    // calculate stroke
    var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;
    
    // calculate TIA
    var tiaValue = $('#tia').bootstrapSwitch('state') ? 1:0;

    // calculate vascular disease
    // vascular disease has 4 possible choices (0, 1, 2 and 3)
    // if the choice is 0, the value should be 0
    // if the choice is 1, 2 or 3, the value should be 1
    var vascularDiseaseValue = parseInt($('#vascular_disease').val()) ? 1:0;

    // calculate gender
    var genderValue = $('#gender').val() == 'F' ? 1:0;

    // calculate final cha2 score
    scores.cha2 = chfValue + htnValue + ageValue + diabetesValue + 2*(strokeValue || tiaValue) + vascularDiseaseValue + genderValue;

    $('#cha2_score').html(scores.cha2);
}

function updateHasbledScore(){
    //HASBLED = HTN* + Renal Dysfunction + Liver Dysfuntion + Stroke + Bleeding + Labile INR + Age>=65 + Alcohol >= 8 drinks/week + Drugs

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
    var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;

    // Bleeding
    var bleedingChoice = parseInt($('#hx_of_bleeding').val());
    var bleedingValue = bleedingChoice ? 1:0;

    // calculate inr instabilitiy (liable INR)
    var inrValue = $('#inr_instabilitiy').bootstrapSwitch('state') ? 1:0;

    // calculate ageValue
    var birth_timestamp = Date.parse($('#date_of_birth').val());

    if (isNaN(birth_timestamp)){
        var ageValue = 0;
    }else{
        var birthDate = new Date(birth_timestamp);
        var ageValue = calculateAge(birthDate) >= 65 ? 1:0;
    }

    // Drug abuse
    var drugAbuseValue = $('#drug_abuse').bootstrapSwitch('state') ? 1:0;

    // calculate alcohol abuses value
    // alcohol abuse has 3 possible choices (0, 1 and 2)
    // if the choice is 0 or 1, the value should be 0
    // if the choice is 2, the value should be 1
    var alcoholAbuseChoice = parseInt($('#alcohol_abuse').val()) || 0; // in case the selection is empty
    var alcoholAbuseValue = alcoholAbuseChoice == 2 ? 1:0;

    scores.hasbled = htnValue + renalDysfunctionValue + liverDysfunctionValue + strokeValue +
    bleedingValue + inrValue + ageValue + drugAbuseValue + alcoholAbuseValue;

    $('#hasbled_score').html(scores.hasbled);
}

// Register change listeners to all fields involved in the formula,
// so that the scores, plot, and recommended therapy get updated as the
// form is filled out

$('#chf, #diabetes_mellitus, #tia, #stroke, #liver_dysfunction, #inr_instabilitiy, #warfarin_intolerance, #renal_dysfunction').on('switchChange.bootstrapSwitch', function(event, state){
    updateEverything();
});

$('#htn, #date_of_birth, #alcohol_abuse, #gender, #vascular_disease, #stent').on('change', function(event, state){
    updateEverything();
});
