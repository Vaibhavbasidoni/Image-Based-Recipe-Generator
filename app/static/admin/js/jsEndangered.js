$("#btn_add").click(function (e) {
  //verification
  if ($("#txtBirdName").val().trim().length < 1) {
    alert("Please Enter Bird Name");
    $("#txtBirdName").focus();
    return false;
  }

  if ($("#txtSpeciesName").val().trim().length < 1) {
    alert("Please Enter Species Name");
    $("#txtSpeciesName").focus();
    return false;
  }

  if ($("#txtHabitatCharacteristics").val().trim().length < 1) {
    alert("Please Enter Habitat Characteristics");
    $("#txtHabitatCharacteristics").focus();
    return false;
  }

  if ($("#txtEnvironmentalChanges").val().trim().length < 1) {
    alert("Please Enter Environmental Changes");
    $("#txtEnvironmentalChanges").focus();
    return false;
  }

  if ($("#txtConservationEfforts").val().trim().length < 1) {
    alert("Please Enter Conservation Efforts");
    $("#txtConservationEfforts").focus();
    return false;
  }

  if ($("#txtClimateChangeEffects").val().trim().length < 1) {
    alert("Please Enter Climate Change Effects");
    $("#txtClimateChangeEffects").focus();
    return false;
  }

  if ($("#selEndangeredSpecies").val().trim().length < 1) {
    alert("Please select is Endangered Species");
    $("#selEndangeredSpecies").focus();
    return false;
  }

  // database
  let formData = new FormData();
  formData.append("txtBirdName", $("#txtBirdName").val());
  formData.append("txtSpeciesName", $("#txtSpeciesName").val());
  formData.append(
    "txtHabitatCharacteristics",
    $("#txtHabitatCharacteristics").val()
  );
  formData.append(
    "txtEnvironmentalChanges",
    $("#txtEnvironmentalChanges").val()
  );
  formData.append("txtConservationEfforts", $("#txtConservationEfforts").val());
  formData.append(
    "txtClimateChangeEffects",
    $("#txtClimateChangeEffects").val()
  );

  formData.append("selEndangeredSpecies", $("#selEndangeredSpecies").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "add");

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/add_endangered/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert("Details Added Successfully");
      location.reload();
      table.ajax.reload();
      $("#add_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_add").attr("disabled", false);
    },
  });
});
// data fetching (display into admin dashboard )
function getAdminData() {
  const formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/add_endangered/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        $("#tableData").append(
          "<tr><td>" +
            j +
            "</td><td style='display: none;'>" +
            response[i].en_id +
            "</td><td>" +
            response[i].en_bird_name +
            "</td><td>" +
            response[i].en_species_name +
            "</td><td>" +
            response[i].en_habitat_characteristics +
            "</td><td>" +
            response[i].en_environmental_changes +
            "</td><td>" +
            response[i].en_conservation_efforts +
            "</td><td>" +
            response[i].en_climate_change_effects +
            "</td><td>" +
            response[i].en_is_endangere_species +
            "</td><td><div class='d-flex' style='justify-content: space-evenly;'><a href='javascript:void(0);' id='edit_row' title='View/Edit' data-toggle='modal' data-target='#edit_modal' class='text-primary' onClick='getRowsUpdate();'>Edit</a><a href='javascript:void(0);' title='Delete' data-toggle='modal' data-target='#delete_modal' class='text-danger' id='delete_row' onClick='getRowsDelete();'>Delete</a></div></td></tr>"
        );
      }
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {},
  });
}

// Edit data
//Edit modal submit click
$(document).on("click", "#btn_update", function () {
  // alert("hi");

  if ($("#txtBirdName1").val().trim().length < 1) {
    alert("Please Enter Bird Name");
    $("#txtBirdName1").focus();
    return false;
  }

  if ($("#txtSpeciesName1").val().trim().length < 1) {
    alert("Please Enter Species Name");
    $("#txtSpeciesName1").focus();
    return false;
  }

  if ($("#txtHabitatCharacteristics1").val().trim().length < 1) {
    alert("Please Enter Habitat Characteristics");
    $("#txtHabitatCharacteristics1").focus();
    return false;
  }

  if ($("#txtEnvironmentalChanges1").val().trim().length < 1) {
    alert("Please Enter Environmental Changes");
    $("#txtEnvironmentalChanges1").focus();
    return false;
  }

  if ($("#txtConservationEfforts1").val().trim().length < 1) {
    alert("Please Enter Conservation Efforts");
    $("#txtConservationEfforts1").focus();
    return false;
  }

  if ($("#txtClimateChangeEffects1").val().trim().length < 1) {
    alert("Please Enter Climate Change Effects");
    $("#txtClimateChangeEffects1").focus();
    return false;
  }

  if ($("#selEndangeredSpecies1").val().trim().length < 1) {
    alert("Please select is Endangered Species");
    $("#selEndangeredSpecies1").focus();
    return false;
  }

  let formData = new FormData();
  formData.append("txtBirdName1", $("#txtBirdName1").val());
  formData.append("txtSpeciesName1", $("#txtSpeciesName1").val());
  formData.append(
    "txtHabitatCharacteristics1",
    $("#txtHabitatCharacteristics1").val()
  );
  formData.append(
    "txtEnvironmentalChanges1",
    $("#txtEnvironmentalChanges1").val()
  );
  formData.append(
    "txtConservationEfforts1",
    $("#txtConservationEfforts1").val()
  );
  formData.append(
    "txtClimateChangeEffects1",
    $("#txtClimateChangeEffects1").val()
  );
  formData.append("selEndangeredSpecies1", $("#selEndangeredSpecies1").val());
  formData.append("id", $("#edit_id").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "update");

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/add_endangered/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      alert("Details Updated Succesfully");
      location.reload();
      $("#edit_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_update").attr("disabled", false);
    },
  });
});

function getRowsUpdate() {
  $("#tableData tr").click(function () {
    let currentRow = $(this).closest("tr");
    let lclID = currentRow.find("td:eq(1)").text();
    let lclBirdName = currentRow.find("td:eq(2)").text();
    let lclSpeciesName = currentRow.find("td:eq(3)").text();
    let lclHabitatCharacteristics = currentRow.find("td:eq(4)").text();
    let lclEnvironmentalChanges = currentRow.find("td:eq(5)").text();
    let lclConservationEfforts = currentRow.find("td:eq(6)").text();
    let lclClimateChangeEffects = currentRow.find("td:eq(7)").text();
    let lclEndangeredSpecies = currentRow.find("td:eq(8)").text();

    $("#txtBirdName1").val(lclBirdName);
    $("#txtSpeciesName1").val(lclSpeciesName);
    $("#txtHabitatCharacteristics1").val(lclHabitatCharacteristics);
    $("#txtEnvironmentalChanges1").val(lclEnvironmentalChanges);
    $("#txtConservationEfforts1").val(lclConservationEfforts);
    $("#txtClimateChangeEffects1").val(lclClimateChangeEffects);
    $("#selEndangeredSpecies1").val(lclEndangeredSpecies);
    $("#edit_id").val(lclID);
  });
}
// Delete
$(document).on("click", "#btn_delete", function () {
  // alert("hi");
  var formData = new FormData();
  formData.append("id", $("#delete_id").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "delete");
  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/add_endangered/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert("Details deleted Succesfully");
      location.reload();
      table.ajax.reload();
      $("#edit_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_update").attr("disabled", false);
    },
  });
});

function getRowsDelete() {
  $("#tableData tr").click(function () {
    var currentRow = $(this).closest("tr");
    var lclID = currentRow.find("td:eq(1)").text();
    $("#delete_id").val(lclID);
  });
}
getAdminData();
