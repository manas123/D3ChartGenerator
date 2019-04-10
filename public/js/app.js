$("#loadmasterFile").on("change", function() {
  var fileName = $(this)
    .val()
    .split("\\")
    .pop();
  if (fileName.indexOf("json") > 0) {
    $("#upload-loadmaster-file-state").text("");
    $("#loadMasterSubmit").attr("disabled", false);
  } else {
    $("#upload-loadmaster-file-state").text("Please select a json file");
    $("#loadMasterSubmit").attr("disabled", true);
  }
  $(this)
    .siblings(".custom-file-label")
    .addClass("selected")
    .html(fileName);
});

$("#shipmentsFile").on("change", function() {
  var fileName = $(this)
    .val()
    .split("\\")
    .pop();
  if (fileName.indexOf("csv") > 0 || fileName.indexOf("CSV") > 0) {
    $("#upload-shipments-file-state").text("");
    $("#shipmentsSubmit").attr("disabled", false);
  } else {
    $("#upload-shipments-file-state").text("Please select a CSV file");
    $("#shipmentsSubmit").attr("disabled", true);
  }
  $(this)
    .siblings(".custom-file-label")
    .addClass("selected")
    .html(fileName);
});

$("#selectloadmasterid").on("change", function() {
  if (
    $("#selectloadmasterid").val() !== "Select" &&
    $("#selectshipmentid").val() !== "Select"
  ) {
    $("#chartSubmit").attr("disabled", false);
  } else {
    $("#chartSubmit").attr("disabled", true);
  }
});

$("#selectshipmentid").on("change", function() {
  console.log($(this).val());
  if (
    $("#selectloadmasterid").val() !== "Select" &&
    $("#selectshipmentid").val() !== "Select"
  ) {
    $("#chartSubmit").attr("disabled", false);
  } else {
    $("#chartSubmit").attr("disabled", true);
  }
});

$(function() {
  $(".alert-fade-custom")
    .fadeTo(2000, 500)
    .slideUp(500, function() {
      $(".alert-fade-custom").slideUp(500);
    });
});

$(document).ready(function() {
  $("#loadmaster-table").DataTable();
});

$(document).ready(function() {
  $("#shipmentuploads-table").DataTable();
});
