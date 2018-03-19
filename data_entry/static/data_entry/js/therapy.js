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

function renderGFR(){
  var GFR = computeGFR();
  renderGFRValue(GFR);
  renderGFRStage(GFR);
}

function renderGFRValue(GFR){
  if( isNaN(GFR) || !isFinite(GFR) ){
    $('#gfr-score-lbl').text('--');
    $('#gfr_mLmin').attr('value','');
  }else {
    $('#gfr-score-lbl').text(GFR.toFixed(2));
    $('#gfr_mLmin').val(GFR);
  }
}

function renderGFRStage(GFR){
  if( isNaN(GFR) || !isFinite(GFR) ){
    $('#stage-details').html('<div class="alert alert-default"><i class="fa fa-info-circle"></i> To calculate the GFR we need the value of: Creatinine, Age, Sex and Weight</div>');
  }else {
    var stageGFR = clasifyGFR(GFR);
    $('#stage-details').html('\
      \<div class="stage-gfr alert alert-default" style="margin-bottom:0;color:white;background-color:'+stageGFR.color+';">\
          <strong>'+stageGFR.label+'</strong>\
          <p>'+stageGFR.description+'</p>\
          <p>(GFR LEVEL: '+stageGFR.level+')</p>\
        </div>\
    ');
  }
}

function renderTherapy(therapy){
  if (therapy.choices.length == 0){
      console.log('NO CHOICES!');
      return '<div class="row"><div class="col-md-12 text-center"><h3 style="opacity: 0.3;">There is no recommended treatment</h3></div></div>';
  }

  var out = '';

  for (var i = 0; i < therapy.choices.length; i++) {
    var choice = therapy.choices[i];

    if( choice.steps.length ) {
      for (var j = 0; j < choice.steps.length; j++) {
        var step = choice.steps[j];
        out += '<div class="row therapy-option text-center">';
        out += '  <div class="col-md-6 m-0 p-0">';
        out += '    <h4 class="m-0"><em><strong>OPTION UP TO 12 MONTHS</strong></em></h4><br>';
        out += step.option;
        out += '  </div>';
        out += '  <div class="col-md-6 m-0 p-0">';
        out += '    <h4 class="m-0"><em><strong>OPTION AFTER 12 MONTHS</strong></em></h4><br>';
        out += step.extra ? step.extra : 'No option after 12 months';
        out += '  </div>';
        out += '</div>';
      }
    }else {
      out += '<h4 class="m-0"><em><strong>No options</strong></em></h4>';
    }
  }
  return out;
}

/*
function renderTherapyCcs(therapy, use_extra){
  if (therapy.choices.length == 0){
      console.log('NO CHOICES!');
      return '<div class="row"><div class="col-md-12 text-center"><h3 style="opacity: 0.3;">There is no recommended treatment</h3></div></div>';
  }

  var out = '';

  for (var i = 0; i < therapy.choices.length; i++) {
    var choice = therapy.choices[i];

    out += '<div class="row">';
    out += '<div class="col-md-12">';

    for (var j = 0; j < choice.steps.length; j++) {
      var step = choice.steps[j];
      out += '<div class="therapy-option note note-default m-b-0 p-10 text-center">';
      out += step.option;
      if (use_extra && step.extra2) {
        out += step.extra2;
      }
      out += '</div>';

      if (j !== choice.steps.length - 1) {
        out += '<div class="note note-default m-b-0 p-5 text-center">';
        out += '<h4 class="m-0"><em><strong>then</strong></em></h4>';
        out += '</div>';
      }
    }

    out += '</div>';
    out += '</div>';
  }
  return out;
}
*/

/*
function renderTherapyImage(therapy){

  $('.hamilton_therapy_options').stop(true, true).hide(0, function(){
    if (therapy == null){
        console.log('NO CHOICES!');
        $('.hamilton_therapy_options.isnull').stop(true, true).show('fast');
    }else {
      $('.hamilton_therapy_options.'+therapy).stop(true, true).show('fast');
    }
  
  });
}
*/

function getStent(){
    if ($('#des_stent').is(':checked')){
        return 'des';
    }else if ($('#bms_stent').is(':checked')){
        return 'bms';
    }else{
        return null;
    }
}

function getWarfarinIntolerance(){
    return $('#warfarin_intolerance').bootstrapSwitch('state') ? true:false;
}

function getInrInstability(){
    return $('#inr_instability').bootstrapSwitch('state') ? true:false;
}

function getDoacAllergy(){
    return $('#doac_allergy_or_intolerance').bootstrapSwitch('state') ? true:false;
}

function getAge(){
    return parseInt($('#age').val(), 10) || 0;
}

function getWeight(){
  return parseFloat( $('#weight').val(), 10) || 0;
}

function getGender(){
  return $('#gender').val();
}

function isFemaleBit(){
  return getGender() == 'F' ? 1 : 0;
}

function getCreatinine_mgdL() {
  return parseFloat( $('#creatinine_mgdL').val(), 10 ) || 0;
}
function getCreatinine_umolL() {
  return parseFloat( $('#creatinine_umolL').val(), 10 ) || 0;
}

function getElectivePCI(){
    return $('#elective_pci').val();
}

function getAnemia(){
  return $('input[name="anemia"]:checked').length > 0;
}

function updateRecommendedTherapy(){
    var ccsTherapy = determineCCSTherapy();
    $('#ccs_recommendation').html(renderTherapy(ccsTherapy));
}

function getHxOfBleeding(){
  var bleedingChoice = parseInt($('#hx_of_bleeding').val());
  return bleedingChoice != 0
}


function getBleedingRisk(){
  /**
    new criteria bases on image
    https://quantcompany.slack.com/files/U4JC2174M/F9QPTR8SU/bleeding-risk.png

  **/
  var patientAge = this.getAge() > 75;
  var frailty = $('#frailty').is(':checked');
  var hemoglobinAnemia = $('#hemoglobin_anemia').is(':checked');
  var isGFRLower = computeGFR() < 40;
  var patientWeight = this.getWeight() < 40;
  //hxOfBleeding = "Intracerebral hemorrhage" OR "Hospitalization for bleeding within last year"
  var hxOfBleeding = $('#hx_of_bleeding').val() == '2' || $('#hx_of_bleeding').val() == '3';
  var tiaStroke = $('#tia_stroke_or_sysemb').is(':checked');
  var aim = $('#aim').is(':checked');

  return (
    patientAge
    || frailty
    || hemoglobinAnemia
    || isGFRLower
    || patientWeight
    || hxOfBleeding
    || tiaStroke
    || aim
  ) ? "high" : "low";
}

function getHighRiskPCI(){
  /**
    PCI RISK: HIGH si cualquiera de las siguientes condiciones es verdadera:
    1. Cualquier checkbox de la cajita “PCI RISK” esta activado
    2. eGFR &lt; 60 mL/min
    3. Prior Acute Coronary Syndrome (ACS)
    4. Prior stent thrombosis
    Then returns "High" else "Low"
  **/
  var isGFRLower = computeGFR() < 60;
  var checkboxesSelected = $('[name^="pci_risk_"]:checked').length != 0 
  || $('#diabetes_mellitus').is(':checked')
  || $('#prior_acute_cs').is(':checked')
  || $('#prior_stent_thrombosis').is(':checked')
  //current smoker
  || $('#smoking_history').val() == '2';
  return  (checkboxesSelected || isGFRLower) ? 'high' : 'low'; 

}

function getElectivePCIValue(){
  //returns ELECTIVE or ACS
  var elective_pci = getElectivePCI();
  return elective_pci === 'SCAD' ? 'ELECTIVE' : 'ACS';
}

function determineCCSTherapy(){
  var highRiskPCIValue = getHighRiskPCI();
  var patientAge = getAge();
  var chads2Score = scores.chads2;
  var electivePCIValue = getElectivePCIValue();
  var bleedingRisk = getBleedingRisk();
  var therapy = {choices: []};

  if( highRiskPCIValue === 'low' ) {
    //LOW PCI Risk
    if( patientAge < 65 ) {
      if( chads2Score == 0 ) {
        if(bleedingRisk === 'low') {
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.a, extra: options.ccs.after12.i},
            ]
          });
        }else {
          //Bleeding Risk is HIGH
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.b, extra: options.ccs.after12.i},
            ]
          });
        }
      }else {
        //chads2 is >=1
        therapy.choices.push({
          steps: [
            {option: options.ccs.up12.c, extra: options.ccs.after12.ii},
          ]
        });
      }
    }else {
      //if age >= 65
      if( chads2Score == 0 ) {
        therapy.choices.push({
          steps: [
            {option: options.ccs.up12.c, extra: options.ccs.after12.ii},
          ]
        });
      }else {
        //chads2 is >=1
        therapy.choices.push({
          steps: [
            {option: options.ccs.up12.c, extra: options.ccs.after12.ii},
          ]
        });
      }
    }
  }else {
    //HIGH PCI Risk
    if( patientAge < 65 ) {
      if( chads2Score == 0 ) {
        if(electivePCIValue === 'ACS') {
          if(bleedingRisk === 'low') {
            therapy.choices.push({
              steps: [
                {option: options.ccs.up12.d, extra: options.ccs.after12.iii},
              ]
            });
          }else {
            //HIGH Bleeding Risk
            therapy.choices.push({
              steps: [
                {option: options.ccs.up12.d, extra: options.ccs.after12.i},
              ]
            });
          }
        }else {
          //ELECTIVE Clinical Presentation
          if(bleedingRisk === 'low') {
            therapy.choices.push({
              steps: [
                {option: options.ccs.up12.e, extra: options.ccs.after12.iii},
              ]
            });
          }else {
            //HIGH Bleeding Risk
            therapy.choices.push({
              steps: [
                {option: options.ccs.up12.e, extra: options.ccs.after12.i},
              ]
            });
          }
        }
      }else if ( chads2Score == 1 ) {
        if(bleedingRisk === 'low') {
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.d, extra: options.ccs.after12.iv},
            ]
          });
        }else {
          //HIGH Bleeding Risk
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.d, extra: options.ccs.after12.ii},
            ]
          });
        }
      } else if( chads2Score >= 2 ) {
        if(bleedingRisk === 'low') {
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.iv},
            ]
          });
        }else {
          //HIGH Bleeding Risk
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.ii},
            ]
          });
        }
      }else {
        console.log('no therapy found');
      }
    } else {
      //Age >= 65
      if( chads2Score == 0 ) {
        if(bleedingRisk === 'low') {
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.iv},
            ]
          });
        }else {
          //HIGH Bleeding Risk
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.ii},
            ]
          });
        }
      }else {
        //Chads2 Score >= 1
        if(bleedingRisk === 'low') {
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.iv},
            ]
          });
        }else {
          //HIGH Bleeding Risk
          therapy.choices.push({
            steps: [
              {option: options.ccs.up12.f, extra: options.ccs.after12.ii},
            ]
          });
        }
      }
    }
  }

  return therapy;
}