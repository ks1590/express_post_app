$(document).ready(function () {
  $(".delete-article").on("click", function (e) {
    $target = $(e.$target)
    const id = $target.attr("date-id")

    $.ajax({
      type: "DELETE",
      success: function (response) {

        if (confirm("削除してよろしいですか？") === true) {
          window.location.href = "/"
        }
      },
      error: function (err) {
        console.log(err)
      }
    })
  })
})