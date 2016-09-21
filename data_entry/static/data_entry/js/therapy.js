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
    return parseInt($('#stent').val(), 10);
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

    if (scores.chads2 <= 2){
        if (scores.hasbled <= 3){
            switch(getStent()){
                case 0: // No Stent
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 1: // BMS
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;                    
                case 2: // BVS
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 3: // DEB
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 4: // DES
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;
            }
        }else{
            switch(getStent()){
                case 0: // No Stent
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 1: // BMS
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;    
                case 2: // BVS
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 3: // DEB
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 4: // DES
                    text.push('Oral anticoagulation plus one antiplatelet');
                    break;
            }
        }
    }else{
        if (scores.hasbled <= 3){
            switch(getStent()){
                case 0: // No Stent
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 1: // BMS
                    text.push('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet');
                    break;
                case 2: // BVS
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 3: // DEB
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 4: // DES
                    text.push('Triple Rx for 6 months, then oral anticoagulation plus one antiplatelet');
                    break;
            }
        }else{
            switch(getStent()){
                case 0: // No Stent
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 1: // BMS
                    text.push('Triple Rx for 1 month, then oral anticoagulation plus one antiplatelet');
                    break;
                case 2: // BVS
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 3: // DEB
                    text.push('Therapy has not yet been fully defined');
                    break;
                case 4: // DES
                    text.push('Triple Rx for 3-6 months, then oral anticoagulation plus one antiplatelet');
                    break;
            }
        }
    }

    text.push(OAC());
    
    $('#therapy_text_1').html(text[0]);
    $('#therapy_text_2').html(text[1]);
}   