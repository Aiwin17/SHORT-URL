$(document).ready(function () {
  $("#urlInput").val("");
  $("#urlForm").submit((event) => {
    event.preventDefault();

    const formData = $(urlForm).serialize();

    $.post("/", formData, function (response) {
      $("#result").html(
        'Your Short URL: <a href="' +
          response.short_url +
          '" target="_blank">' +
          response.short_url +
          "</a>"
      );
    }).fail(function (xhr, status, error) {
      $("#result").text("An error occurred: " + error);
    });
  });
});
