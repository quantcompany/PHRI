var scores = {
    chads2: 0,
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

    drawChart();
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

    drawChart();
}



// Register change listener to update the scores

// CHADS2 = Hx of CHF + Hx of HTN + Age>75 + Diabetes + or(Stroke + TIA)
// HASBLED = HTN + Liver Dysfuntion + Stroke + Labile INR + Age>65 + Alcohol > 8 drinks/week

// common fields are HTN, STROKE and AGE
// when any of these change, we must update both chads2 and hasbled scores
$('#stroke').on('switchChange.bootstrapSwitch', function(event, state){
    updateChads2Score();
    updateHasbledScore();
});

$('#htn, #date_of_birth').on('change', function(event, state){
    updateChads2Score();
    updateHasbledScore();
});



// fields specific to chads2 are CHF, TIA and diabetes. 
// when either of these change, ONLY CHADS2 MUST BE UPDATED
$('#chf, #diabetes_mellitus, #tia').on('switchChange.bootstrapSwitch', function(event, state) {
    updateChads2Score();
});



// fields specific to hasbled are liver dysfunction, INR and alcohol abuse
// when these change, ONLY UPDATE HASBLED SCORE
$('#liver_dysfunction, #inr_instabilitiy').on('switchChange.bootstrapSwitch', function(event, state) {
    updateHasbledScore();
});

$('#alcohol_abuse').on('change', function(event, state){
    updateHasbledScore();
});