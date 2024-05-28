function validateEmail(paramEmailID) {
  let filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;

  if (filter.test(paramEmailID)) {
    return true;
  } else {
    return false;
  }
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function alphaOnly(event) {
  let key = event.which ? event.which : event.keyCode;
  return (
    (key >= 65 && key <= 90) ||
    key == 8 ||
    (event.charCode >= 97 && event.charCode <= 122) ||
    event.charCode == 32
  );
}

// alert("Hello");

$("#btn_add").click(function (e) {
  //verification
  if ($("#txtHotel").val().trim().length < 1) {
    alert("Please Enter Hotel");
    $("#txtHotel").focus();
    return false;
  }

  if ($("#txtArea").val().trim().length < 1) {
    alert("Please Enter Area");
    $("#txtArea").focus();
    return false;
  }

  if ($("#txtCity").val().trim().length < 1) {
    alert("Please Enter City");
    $("#txtCity").focus();
    return false;
  }

  if ($("#txtRecipe").val().trim().length < 1) {
    alert("Please Enter Recipe");
    $("#txtRecipe").focus();
    return false;
  }

  // database
  let formData = new FormData();

  formData.append("txtHotel", $("#txtHotel").val());
  formData.append("txtArea", $("#txtArea").val());
  formData.append("txtCity", $("#txtCity").val());
  formData.append("txtRecipe", $("#txtRecipe").val());
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
    url: "/addHotels/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      if (res == "10") {
        alert("Details already Exist");
        return false;
      }
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
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/addHotels/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      $("#tableData").empty();
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        let lclDelete = "";
        // if (i !== 0) {
        lclDelete =
          '<a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a>';
        // }

        $("#tableData").append(
          "<tr><td>" +
            j +
            '</td><td style="display: none;">' +
            response[i].ht_id +
            "</td><td>" +
            response[i].ht_name +
            "</td><td>" +
            response[i].ht_area +
            "</td><td>" +
            response[i].ht_city +
            "</td><td>" +
            response[i].ht_recipe +
            '</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();">Edit</a>' +
            lclDelete +
            "</div></td></tr>"
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

  if ($("#txtHotel1").val().trim().length < 1) {
    alert("Please Enter Hotel");
    $("#txtHotel1").focus();
    return false;
  }

  if ($("#txtArea1").val().trim().length < 1) {
    alert("Please Enter Area");
    $("#txtArea1").focus();
    return false;
  }

  if ($("#txtCity1").val().trim().length < 1) {
    alert("Please Enter City");
    $("#txtCity1").focus();
    return false;
  }

  if ($("#txtRecipe1").val().trim().length < 1) {
    alert("Please Enter Recipe");
    $("#txtRecipe1").focus();
    return false;
  }

  let formData = new FormData();
  formData.append("txtHotel1", $("#txtHotel1").val());
  formData.append("txtArea1", $("#txtArea1").val());
  formData.append("txtCity1", $("#txtCity1").val());
  formData.append("txtRecipe1", $("#txtRecipe1").val());
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
    url: "/addHotels/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert(" Details Updated Succesfully");
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

function getRowsUpdate() {
  $("#tableData tr").click(function () {
    let currentRow = $(this).closest("tr");
    let lclID = currentRow.find("td:eq(1)").text();
    let lclName = currentRow.find("td:eq(2)").text();
    let lclArea = currentRow.find("td:eq(3)").text();
    let lclCity = currentRow.find("td:eq(4)").text();
    let lclRecipe = currentRow.find("td:eq(5)").text();

    $("#txtHotel1").val(lclName);
    $("#txtArea1").val(lclArea);
    $("#txtCity1").val(lclCity);
    $("#txtRecipe1").val(lclRecipe);
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

  // var table = $("#dataTables-example").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/addHotels/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert(" Details deleted Succesfully");
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
    // alert(lclID);
    $("#delete_id").val(lclID);
  });
}

getAdminData();
