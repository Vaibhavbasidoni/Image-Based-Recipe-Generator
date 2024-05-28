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
  if ($("#txtCategory").val().trim().length < 1) {
    alert("Please Enter Category");
    $("#txtCategory").focus();
    return false;
  }

  if ($("#txtRecipeName").val().trim().length < 1) {
    alert("Please Enter Recipe Name");
    $("#txtRecipeName").focus();
    return false;
  }

  // if ($("#txtSteps").val().trim().length < 1) {
  //   alert("Please Enter Recipe Steps");
  //   $("#txtSteps").focus();
  //   return false;
  // }

  if ($("#txtVideo").val().trim().length < 1) {
    alert("Please Enter Recipe Video");
    $("#txtVideo").focus();
    return false;
  }

  // database
  let formData = new FormData();

  formData.append("txtCategory", $("#txtCategory").val());
  formData.append("txtRecipeName", $("#txtRecipeName").val());
  formData.append("txtSteps", $(".note-editable").html());
  formData.append("txtVideo", $("#txtVideo").val());
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
    url: "/addRecipe/",
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
  let formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/addRecipe/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $("#tableData").empty();
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        let lclDelete = "";
        lclDelete =
          '<a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a>';

        $("#tableData").append(
          "<tr><td>" +
            j +
            '</td><td style="display: none;">' +
            response[i].rc_id +
            "</td><td>" +
            response[i].rc_category +
            "</td><td>" +
            response[i].rc_recipe +
            "</td><td>" +
            response[i].rc_steps +
            "</td><td>" +
            response[i].rc_video +
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
  if ($("#txtCategory1").val().trim().length < 1) {
    alert("Please Enter Category");
    $("#txtCategory1").focus();
    return false;
  }

  if ($("#txtRecipeName1").val().trim().length < 1) {
    alert("Please Enter Recipe Name");
    $("#txtRecipeName1").focus();
    return false;
  }

  if ($("#txtVideo1").val().trim().length < 1) {
    alert("Please Enter Recipe Video");
    $("#txtVideo1").focus();
    return false;
  }

  let formData = new FormData();
  formData.append("txtCategory1", $("#txtCategory1").val());
  formData.append("txtRecipeName1", $("#txtRecipeName1").val());
  formData.append("txtSteps1", $(".note-editable").eq(1).html());
  formData.append("txtVideo1", $("#txtVideo1").val());
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
    url: "/addRecipe/",
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
    let lclCategory = currentRow.find("td:eq(2)").text();
    let lclRecipeName = currentRow.find("td:eq(3)").text();
    let lclSteps = currentRow.find("td:eq(4)").html();
    let lclVideo = currentRow.find("td:eq(5)").html();

    console.log(lclVideo);
    $("#txtCategory1").val(lclCategory);
    $("#txtRecipeName1").val(lclRecipeName);
    $(".note-editable:eq(1)").html(lclSteps);
    $("#txtVideo1").val(lclVideo);
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
    url: "/addRecipe/",
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
    $("#delete_id").val(lclID);
  });
}

getAdminData();

function getData() {
  // alert("Hi");
  const formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/addCategory/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      for (let i = 0; i < res.length; i++) {
        $("#txtCategory").append(
          "<option value='" +
            res[i].ct_category +
            "'>" +
            res[i].ct_category +
            "</option>"
        );
      }
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {},
  });
}

getData();
