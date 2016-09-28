// Initialize form validation on the registration form.
// It has the name attribute "registration"
var validator = $("form[name='profile-form']").validate({
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
    user_name: {
      required: true
    },
    
    old_password: {
      required: function(){return $('#password_form').is(':visible');}
    },

    new_password1: {
      required: function(){return $('#password_form').is(':visible');},
      minlength: 6
    },

    new_password2: {
      required: function(){return $('#password_form').is(':visible');},
      minlength: 6,
      equalTo: "#new_password1"
    }
  },
  // Specify validation error messages
  messages: {
    new_password2: {
      equalTo: "Passwords do not match"
    }
  },
  // Make sure the form is submitted to the destination defined
  // in the "action" attribute of the form when valid
  submitHandler: function(form) {
    if ($(form).valid()){ 
      submit();
    }else{
      return false; // prevent normal form posting
    }
  }
});
