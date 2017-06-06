// Initialize form validation on the registration form.
// It has the name attribute "registration"
var patientFormValidator = $("form[name='patient_form']").validate({
  focusInvalid: false,
  invalidHandler: function(form, validator) {

      if (!validator.numberOfInvalids())
          return;

      $('html, body').animate({
          scrollTop: $(validator.errorList[0].element).offset().top - 70
      }, 1000, function() {
        $(validator.errorList[0].element).focus();
        $(validator.errorList[0].element).addClass('animated shake');
      });

  },
  errorElement: "small",
  errorPlacement: function(error, element){
    error.appendTo(element.parents('.form-group').find('label').find('span'));
  },
  highlight: function(element, errorClass, validClass) {
    // $(element).addClass(errorClass).removeClass(validClass);
    $(element.form).find("label[for=" + element.id + "]").find('span')
      .addClass(errorClass);
  },
  unhighlight: function(element, errorClass, validClass) {
    // $(element).removeClass(errorClass).addClass(validClass);
    $(element.form).find("label[for=" + element.id + "]").find('span')
      .removeClass(errorClass);
  },
  ignore: null,
  // Specify validation rules
  rules: {
    // The key name on the left side is the name attribute
    // of an input field. Validation rules are defined
    // on the right side
    identification: {
      required: true
    },
    age: {
      required: true
    },
    weight: {
      required: true
    },
    hemoglobin_gL : {
      //required: function(){return $('#hemoglobin_measure').val() === 'gL';},
      min: 0
    },
    hemoglobin_mgdL : {
      //required: function(){return $('#hemoglobin_measure').val() === 'mgdL';},
      min: 0
    },
    creatinine_mgdL : {
      required: function(){return $('#creatinine_measure').val() === 'mgdL';},
      min: 0
    },
    creatinine_umolL : {
      required: function(){return $('#creatinine_measure').val() === 'umolL';},
      min: 0
    },
    gender: "required",
    indication: "required",
    stent: {
      required: function(){return $('#indication').val() === 'SCAD';}
    },
    balloons: {
      required: true,
      min: 0,
      max: 9
    },
    htn: "required",
    alcohol_abuse: "required",
    reason: "required",
  },
  // Specify validation error messages
  messages: {
    // firstname: "Please enter your firstname",
    // lastname: "Please enter your lastname",
    // password: {
    //   required: "Please provide a password",
    //   minlength: "Your password must be at least 5 characters long"
    // },
    // email: "Please enter a valid email address"
    // identification: "This field is required",
    // date_of_birth: "This field is required",
    // gender: "This field is required",
    // date_of_procedure: "This field is required",
    // indication: "This field is required",
    // balloons: "This field is required",
  },
  // Make sure the form is submitted to the destination defined
  // in the "action" attribute of the form when valid
  submitHandler: function(form) {
    if ($(form).valid()){
      submitPatient();
    }else{
      $.gritter.add({
          title: 'Validation Error',
          text: 'Please fix the errors on the marked fields',
          time: 5000,
          position: 'top-left'
      });
      return false; // prevent normal form posting
    }
  }
});
