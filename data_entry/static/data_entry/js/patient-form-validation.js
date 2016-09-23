// Initialize form validation on the registration form.
// It has the name attribute "registration"
var validator = $("form[name='patient_form']").validate({
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
    // firstname: "required",
    // lastname: "required",
    // email: {
    //   required: true,
    //   // Specify that email should be validated
    //   // by the built-in "email" rule
    //   email: true
    // },
    // password: {
    //   required: true,
    //   minlength: 5
    // }
    identification: {
      required: true
    },
    date_of_birth: {
      required: true,
      dateITA: true
    },
    gender: "required",
    date_of_procedure: {
      required: false,
      dateITA: true
    },
    indication: "required",
    // vessels_pci: "required",
    stent: "required",
    balloons: {
      required: true,
      min: 0,
      max: 9
    },
    af_type: "required",
    htn: "required",
    alcohol_abuse: "required",
    reason_not_followed: {
      required: function(){return !$('#followed_recommendation').bootstrapSwitch('state');}
    }
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
    // vessels_pci: "This field is required",
    // vessels_pci: "This field is required",
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
