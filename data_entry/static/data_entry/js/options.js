var options = {
  ccs: {
    a: '<table id="ccs-A" class="table table-bordered">\
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

    b: '<table id="ccs-B" class="table table-bordered">\
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

    c: '<table id="ccs-B" class="table table-bordered">\
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
                  <strong>\
                    <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/>\
                    <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/>\
                    Clopidogrel\
                  </strong> 75 mg po QD\
                  <br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/> Rivaroxaban 15 mg po QD\
                </p>\
                <strong>or</strong>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/> Dabigatran 110 mg po BID\
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

    d: '<table id="ccs-D" class="table table-bordered">\
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

    e: '<table id="ccs-E" class="table table-bordered">\
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
                  <strong>\
                    <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/>\
                    <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/>\
                    Clopidogrel\
                  </strong> 75 mg po QD\
                  <br>\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/> Rivaroxaban 15 mg po QD\
                  <strong>or</strong>\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/> Dabigatran 110 mg po BID\
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

    f: '<table id="ccs-F" class="table table-bordered">\
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
                  <strong>\
                    <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/>\
                    <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/>\
                    Clopidogrel\
                  </strong> 75 mg po QD\
                </p>\
                <strong>+</strong>\
                <p class="text-left">\
                  <strong>Reduced dose of DOAC</strong> or VKA:\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/pioneer-af-pci-icon.png" class="icon-img"/> Rivaroxaban 15 mg po QD\
                  <strong>or</strong>\
                </p>\
                <p class="text-left bg-warning" style="padding:4px;">\
                  &#8226; <img src="'+static_url+'img/2734848_RE-DUAL-PCI-icon.jpg" class="icon-img"/> Dabigatran 110 mg po BID\
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