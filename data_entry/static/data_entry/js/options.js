var options = {
  ccs: {
    up12 : {
        a: '<table id="ccs-A" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    \
                    <p class="text-left">\
                      <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                    </p>\
                    \
                    <ul>\
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            6 months and up to 12 months\
                          </p>\
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Strong recommendation / High quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',
    
        b: '<table id="ccs-B" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    \
                    <p class="text-left">\
                      <strong>&#8226; Clopidogrel</strong> 75 mg po QD\
                    </p>\
                    \
                    <ul>\
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            At least 1 month for BMS<br>\
                            At least 3 months for DES<br>\
                            Up to 12 months<br>\
                          </p>\
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Strong recommendation / High quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',

        c: '<table id="ccs-C" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Clopidogrel</strong> 75 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    \
                    <p class="text-left">\
                      <strong>OAC</strong>\
                    </p>\
                    <ul>\
                      \
                      <li>\
                          <p class="text-left">\
                            Rivaroxaban 15 mg po QD (Rivaroxaban 10 mg po QD if eGFR &lt;50 mL/min)<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                          \
                          <p class="text-left">\
                          Dabigatran 150 mg po BID (Dabigatran 110 mg po BID if age &gt;80yo or eGFR &lt;50 mL/min<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                          \
                          <p class="text-left">\
                          VKA (recommended INR target is 2.0-2.5)<br>\
                          </p>\
                          \
                          <p class="text-left">\
                            <small>* All patients should receive a loading dose of <strong>ASA</strong> 160 mg at the time of PCI (if previously ASA naïve). Thereafter, ASA can be discontinued as early as the day following the PCI</small>\
                          </p>\
                          \
                      </li>\
                      \
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            At least 1 month for BMS<br>\
                            At least 3 months for DES<br>\
                            Up to 12 months<br>\
                          </p>\
                          </p>\
                      </li>\
                    </ul>\
                    \
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Weak recommendation / Moderate quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',
        
        d: '<table id="ccs-D" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                    \
                    <strong class="text-left">+</strong>\
                    \
                    <p class="text-left">\
                      <strong>P<small>2</small>Y<small>12</small></strong>\
                    </p>\
                    \
                    <ul>\
                      <li>\
                          <p class="text-left">\
                            <strong>Ticagrelor</strong> 90 mg po BID<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                          \
                      </li>\
                      <li>\
                          <p class="text-left">\
                            <strong>Prasugrel</strong> 10 mg po QD<br>\
                          </p>\
                      </li>\
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            Up to 12 months\
                          </p>\
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Strong recommendation / High quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',
        
        e: '<table id="ccs-E" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                    \
                    <strong class="text-left">+</strong>\
                    \
                    <p class="text-left">\
                      <strong>P<small>2</small>Y<small>12</small></strong>\
                    </p>\
                    \
                    <ul>\
                      <li>\
                          <p class="text-left">\
                            <strong>Clopidogrel</strong> 75 mg po QD<br>\
                          </p>\
                      </li>\
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            Up to 12 months\
                          </p>\
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Strong recommendation / High quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',

        f: '<table id="ccs-F" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    <p class="text-left">\
                      <strong>Clopidogrel</strong> 75 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    \
                    <p class="text-left">\
                      <strong>Reduced OAC (only if triple therapy is considered)</strong>\
                    </p>\
                    <ul>\
                      \
                      <li>\
                          <p class="text-left">\
                            Rivaroxaban 2.5 mg po BID<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                      </li>\
                      <li>\
                          <p class="text-left">\
                            VKA (recommended INR target is 2.0-2.5)<br>\
                          </p>\
                          \
                          <p class="text-left">\
                            <small>* <strong>ASA</strong> can be stopped 1day post PCI or any time up to 6 months (vary depending on individual ischemic and bleeding risk</small>\
                          </p>\
                          \
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                    <td style="text-align:center;">\
                      <strong>Strong recommendation / Moderate quality evidence</strong>\
                    </td>\
                </tr>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      Following <strong>ASA</strong> discontinuation=\
                    </p>\
                    \
                    <p class="text-left">\
                      <strong>Clopidogrel</strong> 75 mg po QD<br>\
                    </p>\
                    \
                    <strong>+</strong>\
                    \
                    <p class="text-left">\
                      <strong>OAC</strong>\
                    </p>\
                    <ul>\
                      \
                      <li>\
                          <p class="text-left">\
                            Rivaroxaban 15 mg po QD (Rivaroxaban 10 mg po QD if eGFR &lt;50 mL/min)<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                      </li>\
                      <li>\
                          <p class="text-left">\
                            Dabigatran 150 mg po BID (Dabigatran 110 mg po BID if age &gt;80yo or eGFR &lt;50 mL/min<br>\
                          </p>\
                          \
                          <strong>or</strong>\
                          \
                      </li>\
                      <li>\
                          <p class="text-left">\
                            VKA (recommended INR target is 2.0-2.5)<br>\
                          </p>\
                      </li>\
                      <li>\
                          <p class="text-left">\
                            Duration:<br>\
                            Up to 12 months<br>\
                          </p>\
                          </p>\
                      </li>\
                    </ul>\
                  </td>\
                </tr>\
                <tr>\
                  <td style="text-align:center;">\
                    <strong>Weak recommendation / Moderate quality evidence</strong>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',
    },
    after12: {
      i: '<table id="ccs-i" class="table table-bordered">\
            <tbody>\
              <tr>\
                <td>\
                  <p class="text-left">\
                    <strong>Aspirin</strong> 81 mg po QD alone<br>\
                  </p>\
                </td>\
              </tr>\
              <tr>\
                <td style="text-align:center;">\
                  <strong>Strong recommendation / High quality evidence</strong>\
                </td>\
              </tr>\
            </tbody>\
          </table>',

      ii: '<table id="ccs-ii" class="table table-bordered">\
            <tbody>\
              <tr>\
                <td>\
                  <p class="text-left">\
                    <strong>OAC (standard stroke prevention doses)</strong><br>\
                  </p>\
                </td>\
              </tr>\
              <tr>\
                <td>\
                  <ul>\
                    <li>\
                        <p class="text-left">\
                          Rivaroxaban 20 mg po QD*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Dabigatran 150 mg po BID*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Apixaban 5 mg po BID*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Edoxaban 60 mg po QD*<br>\
                        </p>\
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          VKA (recommended INR target is 2.0-3.0)<br>\
                        </p>\
                    </li>\
                  </ul>\
                  <p class="text-left">\
                    <small><strong>*Dose adjustment</strong></small>\
                  </p>\
                </td>\
              </tr>\
              <tr>\
                <td style="text-align:center;">\
                  <strong>Strong recommendation / High quality evidence</strong>\
                </td>\
              </tr>\
            </tbody>\
          </table>',

      iii: '<table id="ccs-iii" class="table table-bordered">\
              <tbody>\
                <tr>\
                  <td>\
                    <p class="text-left">\
                      <strong>Aspirin</strong> 81 mg po QD<br>\
                    </p>\
                  </td>\
                </tr>\
                <tr>\
                  <td>\
                    <table style="width:100%;">\
                      <tbody>\
                          <tr>\
                            <td>\
                              <strong>+</strong>\
                              <p class="text-left">\
                                <strong>P<small>2</small>Y<small>12</small><small>(Strong recommendation/High quality evidence)</small></strong><br>\
                              </p>\
                              <ul>\
                                <li>\
                                    <p class="text-left">\
                                      <strong>Ticagrelor</strong> 60 mg po BID<br>\
                                    </p>\
                                    \
                                    <strong>or</strong>\
                                    \
                                </li>\
                                <li>\
                                    <p class="text-left">\
                                      <strong>Clopidogrel</strong> 75 mg po QD<br>\
                                    </p>\
                                </li>\
                                <li>\
                                    <p class="text-left">\
                                      Duration:<br>\
                                      Up to 3 years\
                                    </p>\
                                </li>\
                              </ul>\
                            </td>\
                            <td>\
                              <strong>+</strong>\
                              <p class="text-left">\
                                <strong>P<small>2</small>Y<small>12</small><small>(Weak recommendation/Moderate quality evidence)</small></strong><br>\
                              </p>\
                              <ul>\
                                <li>\
                                    <p class="text-left">\
                                      <strong>Prasugrel</strong> 10 mg po QD<br>\
                                    </p>\
                                </li>\
                              </ul>\
                            </td>\
                          </tr>\
                      </tbody>\
                    </table>\
                  </td>\
                </tr>\
              </tbody>\
            </table>',
      iv: '<table id="ccs-iv" class="table table-bordered">\
            <tbody>\
              <tr>\
                <td>\
                  <p class="text-left">\
                    <strong>OAC (standard stroke prevention doses)</strong><br>\
                  </p>\
                </td>\
              </tr>\
              <tr>\
                <td>\
                  <p class="text-left">\
                    <strong>Aspirin</strong> 81 mg po QD<br>\
                  </p>\
                  <strong>or</strong>\
                  <p class="text-left">\
                    <strong>Clopidogrel</strong> 75 mg po QD<br>\
                  </p>\
                  <strong>+</strong>\
                  <p class="text-left">\
                    <strong>OAC (standard stroke prevention doses)</strong><br>\
                  </p>\
                  <ul>\
                    <li>\
                        <p class="text-left">\
                          Rivaroxaban 20 mg po QD*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Dabigatran 150 mg po BID*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Apixaban 5 mg po BID*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          Edoxaban 60 mg po QD*<br>\
                        </p>\
                        \
                        <strong>or</strong>\
                    </li>\
                    <li>\
                        <p class="text-left">\
                          VKA (recommended INR target is 2.0-3.0)<br>\
                        </p>\
                    </li>\
                  </ul>\
                  <p class="text-left">\
                    <small>* <strong>*Dose adjustment</strong>\
                  </p>\
                </td>\
                <td style="text-align:center;">\
                  <strong>Weak recommendation / Low quality evidence</strong>\
                </td>\
              </tr>\
            </tbody>\
          </table>',
    }
  }
}