$('.form-toggle').on('click', function(){
    var signInForm = $('#sign-in-form');
    var signUpForm = $('#sign-up-form');
    
    if (signInForm.is(':visible')){
        signInForm.hide();
        signUpForm.show();
    }else{
        signInForm.show();
        signUpForm.hide();
    }
});