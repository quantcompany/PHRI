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
        return 'continue Warfarin';
    }else {
        return '*Reduced dose NOAC: dabigatran 110 mg BID, apixaban 2.5 mg BID, rivaroxaban 15 mg qd';
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
                    text.push('Undefined');
                    break;
                case 1: // BMS
                    text.push('OAC + one AP');
                    break;                    
                case 2: // BVS
                    text.push('Undefined');
                    break;
                case 3: // DEB
                    text.push('Undefined');
                    break;
                case 4: // DES
                    text.push('OAC + one AP');
                    break;
            }
        }else{
            switch(getStent()){
                case 0: // No Stent
                    text.push('Undefined');
                    break;
                case 1: // BMS
                    text.push('OAC + one AP');
                    break;    
                case 2: // BVS
                    text.push('Undefined');
                    break;
                case 3: // DEB
                    text.push('Undefined');
                    break;
                case 4: // DES
                    text.push('OAC + one AP');
                    break;
            }
        }
    }else{
        if (scores.hasbled <= 3){
            switch(getStent()){
                case 0: // No Stent
                    text.push('Undefined');
                    break;
                case 1: // BMS
                    text.push('Triple Rx for 1 mo, then OAC + one AP');
                    break;
                case 2: // BVS
                    text.push('Undefined');
                    break;
                case 3: // DEB
                    text.push('Undefined');
                    break;
                case 4: // DES
                    text.push('Triple Rx for 6 mo, then OAC + one AP');
                    break;
            }
        }else{
            switch(getStent()){
                case 0: // No Stent
                    text.push('Undefined');
                    break;
                case 1: // BMS
                    text.push('Triple Rx for 1 mo, then OAC + one AP');
                    break;
                case 2: // BVS
                    text.push('Undefined');
                    break;
                case 3: // DEB
                    text.push('Undefined');
                    break;
                case 4: // DES
                    text.push('Triple Rx for 3-6 mo, then OAC + one AP');
                    break;
            }
        }
    }

    text.push(OAC());
    console.log(text);
    $('#therapy_text').html(text.join('<br/>'));
}   