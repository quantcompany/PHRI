var options = {
  mcm: {
    a: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Warfarin INR 2.0 to 2.5'),
    b: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Reduced dose of NOAC:\n\n####Dabigatran 110 mg po BID\n\n####or\n\n####Rivaroxaban 15 mg po QD\n\n####or\n\n####Apixaban 2.5 mg po BID'),
    c: markdown.toHTML('###Aspirin 81 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Warfarin INR 2.0 to 2.5'),
    d: markdown.toHTML('###Aspirin 81 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Reduced dose of NOAC:\n\n####Dabigatran 110 mg po BID\n\n####or\n\n####Rivaroxaban 15 mg po QD\n\n####or\n\n####Apixaban 2.5 mg po BID'),
    e: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###or\n\n###Ticagrelor 90 mg po BID'),
    f: markdown.toHTML('###Dual AP'), // for when chads <= 2
    g: markdown.toHTML('###OAC\n\n###+\n\n###One AP'), // for when chads <= 2
    h: markdown.toHTML('###Aspirin 81 mg po QD') // generic, used in many places
  },

  ccs: {
    a: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Clopidogrel 75 mg po QD'),
    b: markdown.toHTML('###Aspirin 81 mg po QD '),
    c: markdown.toHTML('###OAC (NOAC is preferred over Warfarin for non-valvular AF)\n\n###+\n\n###Clopidogrel 75 mg po QD'),
    d: markdown.toHTML('###OAC (NOAC is preferred over Warfarin for non-valvular AF)'),
    e: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Ticagrelor 90 mg po BID\n\n###or\n\n###Clopidogrel 75 mg po QD'),
    f: markdown.toHTML('###Aspirin 81 mg po QD\n\n###+\n\n###Ticagrelor 90 mg po BID\n\n###or\n\n###Prasugrel 10 mg po QD\n\n###or\n\n###Clopidogrel 75 mg po QD'),
    g: markdown.toHTML('###OAC (NOAC is preferred over Warfarin for non-valvular AF)\n\n###+\n\n###Clopidogrel 75 mg po QD\n\n###+\n\n###Aspirin 81 mg po QD')
  }
};
