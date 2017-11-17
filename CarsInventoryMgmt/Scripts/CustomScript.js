$(document).ready(function () {
    if ($("#txtCarSearch").length > 0) {
        $("#txtCarSearch").on('change keyup paste', function () {
            var searchstr = $("#txtCarSearch").val();
            searchstr = searchstr.trim();
            $.ajax({
                type: 'GET',
                async: false,
                url: '/Home/CarList' + "?searchstr=" + searchstr,
                success: function (resultData) {
                    $("#tab_CarsList").html(resultData);
                }
            });
        });
    }
});
//function for Load more car list
function LoadMoreCarsList(limit) {
    $("#CarsListLodMoreBtn").remove();
    var searchstr = $("#txtCarSearch").val();
    searchstr = searchstr.trim();
    $.ajax({
        type: 'GET',
        async: false,
        url: '/Home/CarList' + "?limit=" + limit + "&searchstr=" + searchstr,
        success: function (resultData) {
            $("#tab_CarsList").append(resultData);
        }
    });
}
//function for open popup for Add New Car
function AddEditCar(carid, counter) {
    $.ajax({
        type: 'GET',
        async: false,
        url: '/Home/AddEditCar?carid=' + carid + "&counter=" + counter,
        success: function (resultData) {
            $("#dvAddEditCar").html(resultData);
            $("#dvAddEditCar").toggle();
            $("#Car_Id").val('0');
        }
    });
}
//OnSuccess function for Car Details Form
function SaveCarDetails(data) {
    var counter = $("#hdncounter").val();
    $("#lblErr_Summary").html("");
    if (data.hasOwnProperty('success')) {
        if (data.success == "false") {
            $("#lblErr_Summary").html("An error occurred while processing your request.");
        }
        else {
            CloseCarDetailsPopup();
            window.location.href = '/Home/Index';
            alert("Car details created successfully!");
        }
    }
    else {
        var htmlData = "<h3>" + counter + ") Brand Name:" + data[0].Brand + "</h3>" +
                        "<p>Model Name:" + data[0].Model + "</p>" +
                        "<p>Year : " + data[0].Year + "</p>" +
                        "<p>Price : $" + data[0].Price + "</p>" +
                        "<p>New : " + ((data[0].New == 1) ? "YES" : "NO") + "</p>";
        $(".clsupdatecar_" + counter).html(htmlData);
        CloseCarDetailsPopup();
        alert("Car details updated successfully!");
    }
}
//function for validate Car Details Form
function ValidateCarDetailsForm() {
    var lst = [];

    var obj = new Object();
    obj.Control = "#Model";
    obj.ErrorLabel = "#lblErr_Model";
    obj.ControlType = "text";
    obj.Type = ["required"];
    lst.push(obj);

    var obj = new Object();
    obj.Control = "#Brand";
    obj.ErrorLabel = "#lblErr_Brand";
    obj.ControlType = "text";
    obj.Type = ["required"];
    lst.push(obj);

    var obj = new Object();
    obj.Control = "#Year";
    obj.ErrorLabel = "#lblErr_Year";
    obj.ControlType = "text";
    obj.Type = ["required"];
    lst.push(obj);

    var obj = new Object();
    obj.Control = "#Price";
    obj.ErrorLabel = "#lblErr_Price";
    obj.ControlType = "text";
    obj.Type = ["required"];
    lst.push(obj);

    return CallValidation(lst);

}
function CloseCarDetailsPopup() {
    $("#dvAddEditCar").html("");
    $("#dvAddEditCar").hide();
}
//**************************************************Custom Validation Scripts*****************************************************************
//Call every time when validation function call
function CallValidation(lst) {
    var ErrMsg = "";
    for (var i = 0; i < lst.length; i++) {

        for (var type = 0; type < lst[i].Type.length; type++) {
            if (lst[i].Type[type] == "required") {
                if (!RequireFieldValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "numeric") {
                if (!NumericFieldValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "numericInteger") {
                if (!NumericIntegerValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "phoneNo") {
                if (!PhoneNumberValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "faxNo") {
                if (!FaxNumberValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "mobNo") {
                if (!MobileNoValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "email") {
                if (!EmailValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "compare") {
                if (!CompareValidate(lst[i].Control1, lst[i].Control2, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }

            if (lst[i].Type[type] == "alphabets") {
                if (!AlphabetsValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "url") {
                if (!UrlValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "fileImage") {
                if (!FileImageValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "fileVideo") {
                if (!FileVideoValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
            if (lst[i].Type[type] == "fileVideoUrl") {
                if (!ViemoYoutubeVideoUrlValidate(lst[i].Control, lst[i].ErrorLabel, lst[i].ControlType)) {
                    ErrMsg += lst[i].Control;
                }
            }
        }
    }
    if (ErrMsg.length > 0) {
        return false;
    }
    else {
        return true;
    }
}

function RequireFieldValidate(FieldId, ErrorId, ControlType) {

    switch (ControlType) {
        case "text":
            {
                if (($(FieldId).val().trim()) == '') {
                    $(ErrorId).html('This field is required.');
                    return false;
                } else {
                    $(ErrorId).html('');
                    return true;
                }
                break;
            }
        case "select":
            {
                if (($(FieldId).val()) == '-1') {
                    $(ErrorId).html('This field is required.');
                    return false;
                } else {
                    $(ErrorId).html('');
                    return true;
                }
                break;
            }
        case "radio":
            {
                break;
            }
        case "checkboxAtleastOne":
            {

                var checkedAtLeastOne = false;
                $(FieldId).each(function () {
                    if ($(this).is(":checked")) {
                        checkedAtLeastOne = true;
                    }
                });
                if (checkedAtLeastOne == false) {
                    $(ErrorId).html('Please select atleast one option.');
                    return false;
                } else {
                    $(ErrorId).html('');
                    return true;
                }
                break;
            }
    }
}

function NumericFieldValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var floatUnsignRegex = /^[0-9]+(\.[0-9]+)?$/;
        if (!floatUnsignRegex.test($(FieldId).val())) {
            //if (!$.isNumeric($(FieldId).val())) {
            $(ErrorId).html('Please enter valid data.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function NumericIntegerValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var intRegex = /^\d+$/;
        if (!intRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid data.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function PhoneNumberValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var PhoneNoRegex = /[0-9 -()+]+$/;
        if (!PhoneNoRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid data.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function EmailValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var EmailNoRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
        if (!EmailNoRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid email-id.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function CompareValidate(FieldId1, FieldId2, ErrorId, ControlType) {
    if ($(FieldId1).val() != '' && $(FieldId2).val() != '') {
        if ($(FieldId1).val() != $(FieldId2).val()) {
            $(ErrorId).html('Confirm password not match.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }

    }
    return true;
}

function AlphabetsValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var AlphabetRegex = /^[a-zA-Z ]*$/;
        if (!AlphabetRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid data.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function UrlValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var UrlRegex = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if (!UrlRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid url.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function FaxNumberValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var FaxRegex = /^\+?[0-9]{7,}$/;
        if (!FaxRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid fax number.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}

function MobileNoValidate(FieldId, ErrorId, ControlType) {
    if ($(FieldId).val() != '') {
        var MobRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (!MobRegex.test($(FieldId).val())) {
            $(ErrorId).html('Please enter valid mobile number.');
            return false;
        } else {
            $(ErrorId).html('');
            return true;
        }
    }
    return true;
}


$(document).on("keydown", ".validatedecimal", function (e) {
    var isEnable = (e.which != 110) ? false : true;
    if (((e.which == 9) || (e.which == 46) || (e.which == 8) || (e.which == 110) || (e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105))) {
        if (isEnable == false && e.which == 110) { return false; }
    } else {
        return false
    }
    if (isEnable == true) {
        isEnable = (e.which == 110) ? false : true;
    }
});
$(document).on("keypress", ".validatenumeric", function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});