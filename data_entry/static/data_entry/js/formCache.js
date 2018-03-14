$(document).ready(function() {
	if (window.sessionStorage) {
		loadForm();
		registerChangeListeners();
	}	
});

function loadForm() {
	var storage = window.sessionStorage;

	if (storage.getItem('dirty') !== 'true') {
		// the session storage isn't dirty yet, i.e. the user hasn't inputed any 
		// data into the form, them se just skip loading form data.
		return;
	}

	// load text inputs
	$('input[type="text"],input[type="number"],textarea').each(function() {
		var element = $(this);
		var key = element.prop('id');
		var value = storage.getItem(key) || '';
		element.val(value).trigger('change');
	});

	//load PCI-RISK checkboxes
	$('input[type="checkbox"][name^="pci_risk_"]').each(function(){
		var element = $(this);
		var key = element.prop('id');
		var data = storage.getItem(key);
		var value =  data ? JSON.parse(data) : false;
		element.prop('checked', value).trigger('change');
	});

	// load stent/intervention checkboxes
	//$('#bms_stent,#des_stent,#no_pci').each(function() {
	$('#bms_stent,#des_stent,#poba,#deb,#drug_coated_stent,#bvs').each(function() {
		var element = $(this);
		var key = element.prop('id');
		var value = storage.getItem(key) ? true : false;
		element.prop('checked', value).trigger('change');
	});

	// load Anemia checkboxes
	$('#hxoa_anemia,#hemoglobin_anemia').each(function() {
		var element = $(this);
		var key = element.prop('id');
		var value = storage.getItem(key) ? true : false;
		element.prop('checked', value).trigger('change');
	});

	// load switches
	$('input[class="bootstrap-switch"]').each(function() {
		var element = $(this);
		var key = element.prop('id');
		var value = storage.getItem(key) ? true: false;
		element.bootstrapSwitch('state', value).trigger('change');
	});

	// load dropdowns
	$('select.default-select,select.nullable-select').each(function() {
		var element = $(this);
		var key = element.prop('id');
		var value = storage.getItem(key) || '';
		element.val(value).trigger('change');
	});

	// load selected therapy option button
	var selectedAgreeOptionButtonId = storage.getItem('selected-agree-option-button');
	$('button.agree-option-button').removeClass('active').addClass('btn-info');
	$('#' + selectedAgreeOptionButtonId).trigger('click');
}

function clearForm() {
	// clear text inputs
	$('input[type="text"],input[type="number"],textarea').val('').trigger('change');

	//clear pci_risk checkboxes
	$('input[type="checkbox"][name^="pci_risk_"]').prop('checked', false).trigger('change');

	// clear stent/intervention checkboxes
	$('#bms_stent,#des_stent,#poba,#deb,#drug_coated_stent,#bvs').prop('checked', false).trigger('change');

	//  clear Anemia checkboxes
	$('#hxoa_anemia,#hemoglobin_anemia').prop('checked', false).trigger('change');

	// clear switches
	$('input[class="bootstrap-switch"]').bootstrapSwitch('state', false).trigger('change');

	// clear dropdowns
	$('select.default-select,select.nullable-select').val(null).trigger('change');

	// clear therapy yes no buttons
	$('[name="agree_option"]')
	.parent()
	.removeClass('active')
	.removeClass('btn-success')
	.removeClass('btn-danger')
	.addClass('btn-default');

	$('#reason').val('');

	if (window.sessionStorage){
		window.sessionStorage.clear();
	}
}

function registerChangeListeners() {
	var storage = window.sessionStorage;

	var makeDirty = function() {
		storage.setItem('dirty', 'true');
	};

	$('input[type="checkbox"][name^="pci_risk_"]').on('change', function() {
		var element = $(this);
		var key = element.prop('id');
		var value = element.is(':checked');
		storage.setItem(key, value);
		makeDirty();
	});

	$('input[type="text"],input[type="number"],textarea').on('change', function() { // when text inputs change
		var element = $(this);
		var key = element.prop('id');
		var value = element.val();
		storage.setItem(key, value);
		makeDirty();
	});

	$('#bms_stent,#des_stent,#poba,#deb,#drug_coated_stent,#bvs').on('change', function() {
		var keys = [
			'bms_stent',
			'des_stent',
			'poba',
			'deb',
			'drug_coated_stent',
			'bvs'
		];

		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			var value = $('#' + key).prop('checked');

			if (value) {
				storage.setItem(key, true);
			} else {
				storage.removeItem(key);
			}
		}
		makeDirty();
	});

	$('#hxoa_anemia,#hemoglobin_anemia').on('change', function() { // when the anemia checkboxes change
		var keys = [
			'hxoa_anemia',
			'hemoglobin_anemia',
		];

		for (var i = 0; i < keys.length; i++){
			var key = keys[i];
			var value = $('#' + key).prop('checked');

			if (value) {
				storage.setItem(key, true);
			} else {
				storage.removeItem(key);
			}
		}
		makeDirty();
	});


	$('input[class="bootstrap-switch"]').on('switchChange.bootstrapSwitch', function(event, state) { // when switches change
		var element = $(this);
		var key = element.prop('id');
		var value = state;

		if (value) {
			storage.setItem(key, true);
		} else {
			storage.removeItem(key);
		}
		makeDirty();
	});


	$('select.default-select,select.nullable-select').on('change', function() { // when dropdown boxes change
		var element = $(this);
		var key = element.prop('id');
		var value = element.val();

		if (value) {
			storage.setItem(key, value);
		} else {
			storage.removeItem(key);
		}
		makeDirty();
	});


	$('button.agree-option-button').on('click', function() { // when a agree with the recommendation option button is clicked
		var element = $(this);
		var key = "selected-agree-option-button";
		var value = element.prop('id');
		storage.setItem(key, value);
		makeDirty();
	});
}