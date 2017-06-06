var options = {
  mcm: {
    a: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Warfarin INR 2.0 to 2.5'),
    b: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Reduced dose of NOAC:\n\n####Dabigatran 110 mg po BID\n\n####or\n\n####Rivaroxaban 15 mg po QD\n\n####or\n\n####Apixaban 2.5 mg po BID'),
    c: markdown.toHTML('###Aspirin 81 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Warfarin INR 2.0 to 2.5'),
    d: markdown.toHTML('###Aspirin 81 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Reduced dose of NOAC:\n\n####Dabigatran 110 mg po BID\n\n####or\n\n####Rivaroxaban 15 mg po QD\n\n####or\n\n####Apixaban 2.5 mg po BID'),
    e: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###or\n\n###Ticagrelor 90 mg po BID'),
    f: markdown.toHTML('###Dual Antiplatelet (= ASA + Plavix/Ticag/Prasugrel)'), // for when chads <= 2
    g: markdown.toHTML('###Oral Anticoagulant\n\n###+\n\n###Single Antiplatelet'), // for when chads <= 2
    h: markdown.toHTML('###Aspirin 81 mg po QD') // generic, used in many places
  },

  ccs: {
    a: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD'),
    b: markdown.toHTML('###Aspirin 81 mg po QD '),
    c: markdown.toHTML('###Oral Anticoagulant (NOAC is preferred over Warfarin for non-valvular AF)\n\n###+\n\n###Clopidogrel 75 mg po QD'),
    d: markdown.toHTML('###Oral Anticoagulant (NOAC is preferred over Warfarin for non-valvular AF)'),
    e: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Ticagrelor 90 mg po BID\n\n###or\n\n###Clopidogrel 75 mg po QD'),
    f: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Ticagrelor 90 mg po BID\n\n###or\n\n###Prasugrel 10 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD'),
    g: markdown.toHTML('###Oral Anticoagulant (NOAC is preferred over Warfarin for non-valvular AF)\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Aspirin 81 mg po QD')
  },

  mcm2: {
    a: '<table id="mcm2-A" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">First 6 - 12 Month</th>\
              <th class="text-center">After 6 - 12 Month</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD<br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>P2Y12:</strong>\
                </p>\
                <p class="text-left">\
                  <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Ticagrelor</strong> 90 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Prasugrel</strong> 10 mg po QD\
                </p>\
              </td>\
              <td class="text-left"><strong>Aspirin</strong> 81 mg po QD alone</td>\
            </tr>\
          </tbody>\
        </table>',

    b: '<table id="mcm2-B" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">First 12 Months</th>\
              <th class="text-center">After 12 Months</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD<br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>P2Y12:</strong>\
                </p>\
                <p class="text-left">\
                  <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Ticagrelor</strong> 90 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Prasugrel</strong> 10 mg po QD\
                </p>\
              </td>\
              <td class="text-center"><strong>Aspirin</strong> 81 mg po QD alone</td>\
            </tr>\
          </tbody>\
        </table>',

    c: '<div class="row">\
          <div class="col-md-6">\
            <p class="bg-warning" style="padding:8px;">\
              <i class="fa fa-exclamation-triangle fa-2x text-warning" aria-hidden="true"></i><br>\
              Safety recommendation for high risk bleeding patients\
            </p>\
          </div>\
          <div class="col-md-6">\
              <a href="'+static_url+'data_entry/References/Guidelines/OtherReferences/2016_PIONEER_AF-PCI_NEJM.pdf" target="_blank">\
                <img src="'+static_url+'img/pioneer-af-pci.png" class="img-responsive"/>\
              </a>\
              <div class="alert alert-warning" style="text-decoration:none;margin:0;padding:0">\
                <p>Rivaroxaban 15 mg qd*</p>\
                <p style="margin-top:0;">Clopidogrel 75 mg qd✝</p>\
              </div>\
          </div>\
        </div>\
        <table id="mcm2-B" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">First 6 months</th>\
              <th class="text-center">After 6 months through to 12 months</th>\
              <th class="text-center">After 12 months</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD<br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>P2Y12:</strong>\
                </p>\
                <p class="text-left">\
                  <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Ticagrelor</strong> 90 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Prasugrel</strong> 10 mg po QD\
                </p>\
              </td>\
              \
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  <strong><i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i>Clopidogrel</strong> 75 mg po QD <br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i>Rivaroxaban 15 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 110 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 30 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
              </td>\
              \
              <td>\
                <p class="text-left">\
                  <strong>DOAC</strong>  or VKA alone:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 20 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 150 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Apixaban 5 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 60 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <p class="text-center">\
                  <strong>* Dose adjustment</strong>\
                </p>\
              </td>\
            </tr>\
          </tbody>\
        </table>',

    d: '<table id="mcm2-D" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">First 12 Months</th>\
              <th class="text-center">After 12 Months</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD<br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>P2Y12:</strong>\
                </p>\
                <p class="text-left">\
                  <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Ticagrelor</strong> 90 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  <strong>&#8226; Prasugrel</strong> 10 mg po QD\
                </p>\
              </td>\
              <td>\
                <p class="text-left">\
                  <strong>DOAC</strong>  or VKA alone:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 20 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 150 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Apixaban 5 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 60 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <p class="text-center">\
                  <strong>* Dose adjustment</strong>\
                </p>\
              </td>\
            </tr>\
          </tbody>\
        </table>',

    e: '<div class="row">\
          <div class="col-md-6">\
            <p class="bg-warning" style="padding:8px;">\
              <i class="fa fa-exclamation-circle fa-2x text-warning" aria-hidden="true"></i>\
            </p>\
          </div>\
          <div class="col-md-6">\
              <a href="'+static_url+'data_entry/References/Guidelines/OtherReferences/2016_PIONEER_AF-PCI_NEJM.pdf" target="_blank">\
                <img src="'+static_url+'img/pioneer-af-pci.png" class="img-responsive"/>\
              </a>\
              <div class="alert alert-warning" style="text-decoration:none;margin:0;padding:0">\
                <p>Rivaroxaban 15 mg qd*</p>\
                <p style="margin-top:0;">Clopidogrel 75 mg qd✝</p>\
              </div>\
          </div>\
        </div>\
        <table id="mcm2-E" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">First 12 Months</th>\
              <th class="text-center">After 12 Months</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  <strong><i class="fa fa-exclamation-circle text-warning" aria-hidden="true"></i>Clopidogrel</strong> 75 mg po QD <br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <i class="fa fa-exclamation-circle text-warning" aria-hidden="true"></i>Rivaroxaban 15 mg po QD\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Dabigatran 110 mg po BID\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Apixaban 2.5 mg po BID\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Edoxaban 30 mg po QD\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
              </td>\
              <td>\
                <p class="text-left">\
                  <strong>DOAC</strong> or VKA alone:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 20 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 150 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Apixaban 5 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 60 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <p class="text-center">\
                  <strong>* Dose adjustment</strong>\
                </p>\
              </td>\
            </tr>\
          </tbody>\
        </table>',

    f: '<div class="row">\
          <div class="col-md-6">\
            <p class="bg-warning" style="padding:8px;">\
              <i class="fa fa-exclamation-circle fa-2x text-warning" aria-hidden="true"></i>\
            </p>\
          </div>\
          <div class="col-md-6">\
              <a href="'+static_url+'data_entry/References/Guidelines/OtherReferences/2016_PIONEER_AF-PCI_NEJM.pdf" target="_blank">\
                <img src="'+static_url+'img/pioneer-af-pci.png" class="img-responsive"/>\
              </a>\
              <div class="alert alert-warning" style="text-decoration:none;margin:0;padding:0">\
                <p>Rivaroxaban 15 mg qd*</p>\
                <p style="margin-top:0;">Clopidogrel 75 mg qd✝</p>\
              </div>\
          </div>\
        </div>\
        <table id="mcm2-F" class="table table-bordered">\
          <thead>\
            <tr>\
              <th class="text-center">For 1 - 3 months</th>\
              <th class="text-center">After 1 - 3 months <br>through 12 months</th>\
              <th class="text-center">After 12 months</th>\
            </tr>\
          </thead>\
          <tbody>\
            <tr>\
              <td>\
                <p class="text-left">\
                  <strong>Aspirin</strong> 81 mg po QD<br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 15 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 110 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Apixaban 2.5 mg po BID\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 30 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
              </td>\
              \
              <td>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  <strong><i class="fa fa-exclamation-circle text-warning" aria-hidden="true"></i>Clopidogrel</strong> 75 mg po QD\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <i class="fa fa-exclamation-circle text-warning" aria-hidden="true"></i>Rivaroxaban 15 mg po QD\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Dabigatran 110 mg po BID\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Apixaban 2.5 mg po BID\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Edoxaban 30 mg po QD\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <hr>\
                <strong>or</strong>\
                <hr>\
                <p class="text-left">\
                  <strong>DOAC</strong>  or VKA:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 20 mg po QD*\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Dabigatran 150 mg po BID*\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Apixaban 5 mg po BID*\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; Edoxaban 60 mg po QD*\
                <strong>or</strong>\
                </p>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <p class="text-center">\
                  <strong>* Dose adjustment</strong>\
                </p>\
              </td>\
              \
              <td>\
                <p class="text-left">\
                  <strong>DOAC</strong> or VKA alone:\
                </p>\
                <p class="text-left">\
                  &#8226; Rivaroxaban 20 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Dabigatran 150 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Apixaban 5 mg po BID*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; Edoxaban 60 mg po QD*\
                </p>\
                <strong>or</strong>\
                <p class="text-left">\
                  &#8226; VKA\
                </p>\
                <p class="text-center">\
                  <strong>* Dose adjustment</strong>\
                </p>\
              </td>\
            </tr>\
          </tbody>\
        </table>',
  }
}