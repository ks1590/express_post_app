$(document).ready(function () {
  $(".delete-article").on("click", function (e) {
    $target = $(e.$target)
    const id = $target.attr("date-id")

    $.ajax({
      type: "DELETE",
      success: function (response) {
        alert("Deleting Article")
        window.location.href = "/"
      },
      error: function (err) {
        console.log(err)
      }
    })
  })
})