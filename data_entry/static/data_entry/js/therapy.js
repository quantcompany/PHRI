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

function getStent(){
    // STENT_CHOICES = (
    //     (0, 'No Stent'),
    //     (1, 'BMS'),
    //     (2, 'BVS'),
    //     (3, 'DEB'),
    //     (4, 'DES'),
    // )
    if ($('#des_stent').is(':checked')){
        return 'des';
    }else if ($('#bms_stent').is(':checked')){
        return 'bms';
    }else{
        return null;
    }
}

function getWarfarinIntolerance(){
    return $('#warfarin_intolerance').bootstrapSwitch('state') ? 1:0;
}

function OAC(){
    if (getWarfarinIntolerance() == 0){
        return 'Continue Warfarin';
    }else {
        return 'Reduced dose NOAC: dabigatran 110 mg BID, apixaban 2.5 mg BID, rivaroxaban 15 mg qd';
    }
}

function updateRecommendedTherapy(){
    // chads2: low <= 2 < high
    // hasbled: low <= 3 < high
    var text = [];
    var stent = getStent();

    if (scores.chads2 <= 2){
        if (scores.hasbled <= 3){
            switch(stent){
                case 'bms':
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;                    
                case 'des':
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;
                case null:
                    text.push('');
            }
        }else{
            switch(stent){
                case 'bms':
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;    
                case 'des':
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;
                case null:
                    text.push('');
            }
        }
    }else{
        if (scores.hasbled <= 3){
            switch(stent){
                case 'bms':
                    text.push('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet');
                    break;
                case 'des':
                    text.push('Triple Rx for 6 months, then oral anticoagulation plus one antiplatelet');
                    break;
                case null:
                    text.push('');
            }
        }else{
            switch(stent){
                case 'bms':
                    text.push('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet');
                    break;
                case 'des':
                    text.push('Triple Rx for 3-6 months, then oral anticoagulation plus one antiplatelet');
                    break;
                case null:
                    text.push('');
            }
        }
    }

    text.push(OAC());
    
    $('#therapy_text_1').html(text[0]);
    $('#therapy_text_2').html(text[1]);
}   