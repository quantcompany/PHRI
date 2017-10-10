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

    //out += '<div class="row p-10 m-b-20">';
    //out += '<div class="col-md-10 col-md-offset-1">';
    out += '<div class="row">';
    out += '<div class="col-md-12">';

    //out += '<div class="note note-info m-b-0 p-5 text-center">';
    //out += '<h1 class="m-5">Option ' + (i + 1) + '</h1>';
    //out += '</div>';

    for (var j = 0; j < choice.steps.length; j++) {
      var step = choice.steps[j];
      out += '<div class="therapy-option note note-default m-b-0 p-10 text-center">';
      out += step.option;
      if (step.extra) {
        out += '<h4 class="m-0"><em><strong>(' + step.extra + ')</strong></em></h4>';
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

function renderTherapyMcm(therapy, use_extra){
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

function getIndication(){
    return $('#indication').val();
}

function getAnemia(){
  return $('input[name="anemia"]:checked').length > 0;
}

function updateRecommendedTherapy(){
    //var mcmTherapy = determineMCMTherapy();
    //$('#mcm_recommendation').html(renderTherapy(mcmTherapy));
    var mcmTherapy = determineMCMTherapy_2();
    $('#mcm_recommendation').html(renderTherapyMcm(mcmTherapy, true));

    var ccsTherapy = determineCCSTherapy();
    $('#ccs_recommendation').html(renderTherapy(ccsTherapy));
}

function getHxOfBleeding(){
  var bleedingChoice = parseInt($('#hx_of_bleeding').val());
  return bleedingChoice != 0
}


function getBleedingRisk(){
  /**
    Returns:
        High: hasbled_score >= 3 or has anemia or history of bleeding
        Low: not High
  **/
  var anemia = getAnemia();
  var hxOfBleeding = getHxOfBleeding();

  return (scores.hasbled >= 3 || anemia || hxOfBleeding) ? "high" : "low";
}

//function getBleedingRiskOld(){
  /**
    Returns:
        Low: hasbled_score <= 3
        High: hasbled_score >=4
  **/
  //return scores.hasbled <= 3 ? "low" : "high";
//}

function getPciRisk(){
  /**
    Gets a list of 8 booleans, if any element is Selected/Checked
    Then returs "High" else "Low"
  **/
  return $('[name^="pci_risk_"]:checked').length == 0 ? 'low' : 'high'; 

}

function getClinicalPresentation(){
  //returns ELECTIVE or ACS
  var indication = getIndication();
  return indication === 'SCAD' ? 'ELECTIVE' : 'ACS';
}

function determineMCMTherapy_2(){
  var pciRisk = getPciRisk();
  var bleedingRisk = getBleedingRisk();
  var clinicalP = getClinicalPresentation();

  var therapy = {choices: []};
  var _extra = '<div class="row pioneer-table-link">\
                  <div class="col-md-6">\
                      <a href="'+static_url+'data_entry/References/Guidelines/OtherReferences/2016_PIONEER_AF-PCI_NEJM.pdf" target="_blank">\
                        <img src="'+static_url+'img/pioneer-af-pci-2.jpg" class="img-responsive"/>\
                      </a><br>\
                      <div class="alert bg-warning" style="text-decoration:none;margin:0;padding:0">\
                        <p>Rivaroxaban 15 mg qd*</p>\
                        <p style="margin-top:0;">Clopidogrel 75 mg qd✝</p>\
                      </div>\
                  </div>\
                  <div class="col-md-6">\
                      <a href="'+static_url+'img/2734848_RE-DUAL-PCI.jpg" target="_blank">\
                        <img src="'+static_url+'img/2734848_RE-DUAL-PCI.jpg" class="img-responsive"/>\
                      </a><br>\
                      <div class="alert bg-warning" style="text-decoration:none;margin:0;padding:0">\
                        <p>Dabigatran 110/150 mg qd</p>\
                        <p style="margin-top:0;">Clopidogrel 75 mg qd</p>\
                      </div>\
                  </div>\
                </div>';

  therapy.choices.push({
    steps: [
      {option: options.mcm2.f, extra: '', extra2: _extra},
    ]
  });

  return therapy;

  if( clinicalP === 'ELECTIVE') {
    if( scores.chads2 == 0 ){
      therapy.choices.push({
        steps: [
          {option: options.mcm2.a, extra: '', extra2: ''},
        ]
      });
    }else if( scores.chads2 == 1 ){
      therapy.choices.push({
        steps: [
          {option: options.mcm2.c, extra: '', extra2: _extra},
        ]
      });
    }else if( scores.chads2 >=2 ){
      if( pciRisk == 'low' ) {
        therapy.choices.push({
          steps: [
            {option: options.mcm2.e, extra: '', extra2: _extra, },
          ]
        });
      } else {
        /**
          pciRisk is High
        **/
        if( bleedingRisk == 'low' ) {
          therapy.choices.push({
            steps: [
              {option: options.mcm2.f, extra: '', extra2: _extra},
            ]
          });
        }else {
          /**
            bleedingRisk is HIGH
          **/
          therapy.choices.push({
            steps: [
              {option: options.mcm2.e, extra: '', extra2: _extra},
            ]
          });
        }
      }
    }else{
      console.log('No therapy found');
    }
  }else {
    /**
      Clinical Presentation is ACS
    **/
    if( scores.chads2 == 0 ){
      therapy.choices.push({
        steps: [
          {option: options.mcm2.b, extra: '', extra2: ''},
        ]
      });
    }else if( scores.chads2 == 1 ){
      therapy.choices.push({
        steps: [
          {option: options.mcm2.d, extra: '', extra2: ''},
        ]
      });
    }else if( scores.chads2 >=2 ){
      if( bleedingRisk == 'low' ) {
        therapy.choices.push({
          steps: [
            {option: options.mcm2.f, extra: '', extra2: _extra},
          ]
        });
      }else{
        /**
          bleedingRisk is HIGH
        **/
        therapy.choices.push({
          steps: [
            {option: options.mcm2.e, extra: '', extra2: _extra},
          ]
        });
      }
    }else{
      console.log('No therapy found');
    }
  }

  /**
    Old Algortihm based on PDF May17
  **/
  /*
  if (scores.chads2 == 0 ){
    if( indication == 'SCAD' ) {
      therapy.choices.push({
        steps: [
          {option: options.mcm2.a, extra: '', extra2: ''},
        ]
      });
    } else {
      //it is STEMI, NSTEMI, UA (ACS)
      therapy.choices.push({
        steps: [
          {option: options.mcm2.b, extra: '', extra2: ''},
        ]
      });
    }
  }else if ( scores.chads2 == 1 ) {
    if( indication == 'SCAD' ){
      therapy.choices.push({
        steps: [
          {option: options.mcm2.c, extra: '', extra2: _extra},
        ]
      });
    }else {
      //it is STEMI, NSTEMI, UA (ACS)
      therapy.choices.push({
        steps: [
          {option: options.mcm2.d, extra: '', extra2: ''},
        ]
      });
    }
  }else if ( scores.chads2 >= 2 ) {
    if( indication == 'SCAD' ) {
      if( pciRisk == 'low' ) {
        therapy.choices.push({
          steps: [
            {option: options.mcm2.e, extra: '', extra2: _extra, },
          ]
        });
      } else {
        //pciRisk is High
        if( bleedingRisk == 'low' ) {
          therapy.choices.push({
            steps: [
              {option: options.mcm2.f, extra: '', extra2: _extra},
            ]
          });
        }else {
          //bleedingRisk is HIGH
          therapy.choices.push({
            steps: [
              {option: options.mcm2.e, extra: '', extra2: _extra},
            ]
          });
        }
      }
    }else {
      //it is STEMI, NSTEMI, UA (ACS)
      if( bleedingRisk == 'low' ) {
        therapy.choices.push({
          steps: [
            {option: options.mcm2.f, extra: '', extra2: _extra},
          ]
        });
      }else{
        //bleedingRisk is HIGH
        therapy.choices.push({
          steps: [
            {option: options.mcm2.e, extra: '', extra2: _extra},
          ]
        });
      }
    }
  }else{
    console.log('No therapy found');
    //therapy = null;
  }
  */

  return therapy;
}

function determineMCMTherapy(){
  // chads2: low <= 2 < high
  // hasbled: low <= 3 < high

  // A therapy consists of a list of choices
  // These choices will be displayed separated by an "OR"

  // Each choice has a list of steps.
  // These steps will be separated by a "THEN"

  // Each step has markdown text and extra text
  var stent = getStent();
  var warfarinIntolerance = getWarfarinIntolerance();
  var inrInstability = getInrInstability();
  var doacAllergy = getDoacAllergy()
  var therapy = {choices: []};

  if (scores.chads2 <= 2){
      therapy.choices.push({
        steps: [
          {option: options.mcm.f, extra: ''},
        ]
      });

      therapy.choices.push({
        steps: [{option: options.mcm.g, extra: ''}]
      });
  } else {
      if ( scores.hasbled <= 3 ){ // low bleeding risk
        if (stent === 'bms') {
          if (warfarinIntolerance == true) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          } else if (warfarinIntolerance == false) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option E for the 1st year then Aspirin 81 mg po QD lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });

                // or 3er option E lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });
              } else if (doacAllergy == false) {
                // 1st option A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          }
        } else if (stent == 'des') {
          if (warfarinIntolerance == true) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 6 months'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 6 months'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          } else if (warfarinIntolerance == false) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option A for 6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 6 months'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option E for the 1st year then Aspirin 81 mg po QD lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });

                // or 3er option E lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 6 months'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // A for 6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For the 6 months'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });
              } else if (doacAllergy == false) {
                // 1st option A for 6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 6 months'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });
                // or 2do option B for 6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 6 months'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          }
        } else {
          console.log('THERE IS NO MCM RECOMMENDED THERAPY FOR THAT COMBINATION!');
        }
      } else { // bleeding risk high
        if (stent === 'bms') {
          if (warfarinIntolerance == true) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong or consider E lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'},
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong or consider E lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'},
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          } else if (warfarinIntolerance == false) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option E for the 1st year then Aspirin 81 mg po QD lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });

                // or 3er option E lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });
              } else if (doacAllergy == false) {
                // 1st option A for 1 month and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 1 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option B for 1 month and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 1 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          }
        } else if (stent == 'des') {
          if (warfarinIntolerance == true) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong or consider E lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulants'},
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 3-6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 3-6 months'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // 1st option E for the 1st year then Aspirin 81 mg po QD lifelong
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong or consider E lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'}
                  ]
                });

                // or consider E lifelong if the patient has allergy/intolerance to all OACs (oral anticoagulants)
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the patient has allergy/intolerance to all Oral Anticoagulant'},
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 3-6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 3-6 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          } else if (warfarinIntolerance == false) {
            if (inrInstability == true) {
              if (doacAllergy == true) {
                // 1st option A for 3-6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 3-6 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option E for the 1st year then Aspirin 81 mg po QD lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'For the 1st year'},
                    {option: options.mcm.h, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });

                // or 3er option E lifelong if the INR instability is severe and potentially harmful
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.e, extra: 'Lifelong if the INR instability is severe and potentially harmful'}
                  ]
                });
              } else if (doacAllergy == false) {
                // B for 3-6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 3-6 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            } else if (inrInstability == false) {
              if (doacAllergy == true) {
                // A for 3-6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 3-6 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });
              } else if (doacAllergy == false) {
                // 1st option A for 3-6 months and then C up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.a, extra: 'For 3-6 month'},
                    {option: options.mcm.c, extra: 'Up to the 1st year'}
                  ]
                });

                // or 2do option B for 3-6 months and then D up to the 1st year
                therapy.choices.push({
                  steps: [
                    {option: options.mcm.b, extra: 'For 3-6 month'},
                    {option: options.mcm.d, extra: 'Up to the 1st year'}
                  ]
                });
              }
            }
          }
        } else {
          console.log('THERE IS NO MCM RECOMENDED THERAPY FOR THAT COMBINATION!');
        }
      }
  }

  return therapy;
}

function determineCCSTherapy(){
  var age = getAge();
  var indication = getIndication();
  var stent = getStent();
  var therapy = {choices: []};

  if (age < 65){
      if (scores.chads2 == 0){
        if (indication == 'SCAD'){
          if (stent) {
            // A for 12 months and then B alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.a, extra: 'For 12 months'},
                {option: options.ccs.b, extra: 'Alone, lifelong'}
              ]
            });
          } else { // NO PCI
            // No existe esta opcion
            console.log('THERE IS NO CCS RECOMENDED THERAPY FOR THAT COMBINATION!');
          }
        } else { //STEMI, NSTEMI, UA
          if (stent) {
            // F for 12 months and then B alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.f, extra: 'For 12 months'},
                {option: options.ccs.b, extra: 'Alone, lifelong'}
              ]
            });
          } else { // NO PCI
            // E for 12 months and then B alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.e, extra: 'For 12 months'},
                {option: options.ccs.b, extra: 'Alone, lifelong'}
              ]
            });
          }
        }
      }else if (scores.chads2 >= 1){
        if (indication == 'SCAD'){
          if (stent) {
            // C for 12 months and then D alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.c, extra: 'For 12 months'},
                {option: options.ccs.d, extra: 'Alone, lifelong'}
              ]
            });
          } else { // NO PCI
            // No existe esta opcion
            console.log('THERE IS NO CCS RECOMENDED THERAPY FOR THAT COMBINATION!');
          }
        } else { //STEMI, NSTEMI, UA
          if (stent) {
            // G for 3 to 6 months, then C through to the 12 months, then D alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.g, extra: 'For 3-6 months'},
                {option: options.ccs.c, extra: 'Through to the 12 months'},
                {option: options.ccs.d, extra: 'Alone, lifelong'}
              ]
            });
          } else { // NO PCI
            // C for 12 months and then D alone lifelong
            therapy.choices.push({
              steps: [
                {option: options.ccs.c, extra: 'For 12 months'},
                {option: options.ccs.d, extra: 'Alone, lifelong'}
              ]
            });
          }
        }
      }
  }else if (age >= 65){
    if (scores.chads2 == 0){
      if (indication == 'SCAD'){
        if (stent) {
          // C for 12 months and then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.c, extra: 'For 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        } else { // NO PCI
          // No existe esta opcion
          console.log('THERE IS NO CCS RECOMENDED THERAPY FOR THAT COMBINATION!');
        }
      } else { //STEMI, NSTEMI, UA
        if (stent) {
          // G for 3 to 6 months, then C through to the 12 months, then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.g, extra: 'For 3-6 months'},
              {option: options.ccs.c, extra: 'Through to the 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        } else { // NO PCI
          // C for 12 months and then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.c, extra: 'For 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        }
      }
    }else if (scores.chads2 >= 1){
      if (indication == 'SCAD'){
        if (stent) {
          // C for 12 months and then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.c, extra: 'For 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        } else { // NO PCI
          // No existe esta opcion
          console.log('THERE IS NO CCS RECOMENDED THERAPY FOR THAT COMBINATION!');
        }
      } else { //STEMI, NSTEMI, UA
        if (stent) {
          // G for 3 to 6 months, then C through to the 12 months, then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.g, extra: 'For 3-6 months'},
              {option: options.ccs.c, extra: 'Through to the 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        } else { // NO PCI
          // C for 12 months and then D alone lifelong
          therapy.choices.push({
            steps: [
              {option: options.ccs.c, extra: 'For 12 months'},
              {option: options.ccs.d, extra: 'Alone, lifelong'}
            ]
          });
        }
      }
    }
  }

  return therapy;
}
