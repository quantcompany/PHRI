var scores = {
    chads2: 0,
    hasbled: 0
};

var therapy = {
    lowChads2: {
        lowHasbled : 'You have low chads2 and low hasbled scores!',
        highHasbled: 'You have low chads2 but high hasbled scores.'
    },

    highChads2: {
        lowHasbled: 'You have high chads2 but low hasbled scores.',
        highHasbled: 'You have high chads2 AND high hasbled scores!'
    }
}

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

function updateEveryting(){
    updateChads2Score();
    updateHasbledScore();
    updateRecommendedTherapy();
    updateChart(); // this function is in plot.js
}

function updateChads2Score(){
    // CHADS2 = Hx of CHF + Hx of HTN + Age>75 + Diabetes + or(Stroke + TIA)
    
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
        var ageValue = calculateAge(birthDate) > 75 ? 1:0;
    }

    // calculate diabetes
    var diabetesValue = $('#diabetes_mellitus').bootstrapSwitch('state') ? 1:0;

    // calculate stroke/TIA
    var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;
    var tiaValue = $('#tia').bootstrapSwitch('state') ? 1:0;
    var strokeTiaValue = strokeValue || tiaValue;

    scores.chads2 = chfValue + htnValue + ageValue + diabetesValue + strokeTiaValue;

    $('#chads2_score').html(scores.chads2);
}

function updateHasbledScore(){
    //HASBLED = HTN + Liver Dysfuntion + Stroke + Labile INR + Age>65 + Alcohol >= 8 drinks/week

    // calculate htn value
    // htn has 3 possible choices (0, 1 and 2)
    // if the choice is 0 or 1, the value should be 0
    // if the choice is 2, the value should be 1
    var htnChoice = parseInt($('#htn').val()) || 0; // in case the selection is empty
    var htnValue = htnChoice == 2 ? 1:0;

    // calculate liver dysfunction
    var liverDysfunctionValue = $('#liver_dysfunction').bootstrapSwitch('state') ? 1:0;

    // calculate stroke
    var strokeValue = $('#stroke').bootstrapSwitch('state') ? 1:0;

    // calculate inr instabilitiy (liable INR)
    var inrValue = $('#inr_instabilitiy').bootstrapSwitch('state') ? 1:0;

    // calculate ageValue
    var birth_timestamp = Date.parse($('#date_of_birth').val());

    if (isNaN(birth_timestamp)){
        var ageValue = 0;
    }else{
        var birthDate = new Date(birth_timestamp);
        var ageValue = calculateAge(birthDate) > 65 ? 1:0;
    }

    // calculate alcohol abules value
    // alcohol abuse has 3 possible choices (0, 1 and 2)
    // if the choice is 0 or 1, the value should be 0
    // if the choice is 2, the value should be 1
    var alcoholAbuseChoice = parseInt($('#alcohol_abuse').val()) || 0; // in case the selection is empty
    var alcoholAbuseValue = alcoholAbuseChoice == 2 ? 1:0;

    scores.hasbled = htnValue + liverDysfunctionValue + strokeValue + inrValue + ageValue + alcoholAbuseValue;

    $('#hasbled_score').html(scores.hasbled);
}

function updateRecommendedTherapy(){
    // chads2: low <= 2 < high
    // hasbled: low <= 3 < high
    var text = '';

    if (scores.chads2 <= 2){
        if (scores.hasbled <= 3){
            text = therapy.lowChads2.lowHasbled;
        }else{
            text = therapy.lowChads2.highHasbled;
        }
    }else{
        if (scores.hasbled <= 3){
            text = therapy.highChads2.lowHasbled;
        }else{
            text = therapy.highChads2.highHasbled;
        }
    }

    $('#therapy_text').html(text);
}   


// Register change listeners to all fields involved in the formula,
// so that the scores, plot, and recommended therapy get updated as the
// form is filled out

$('#chf, #diabetes_mellitus, #tia, #stroke, #liver_dysfunction, #inr_instabilitiy').on('switchChange.bootstrapSwitch', function(event, state){
    updateEveryting();
});

$('#htn, #date_of_birth, #alcohol_abuse').on('change', function(event, state){
    updateEveryting();
});
