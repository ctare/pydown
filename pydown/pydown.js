function download(url, name, category, domain, review) {
  $.ajax({
    url: "http://localhost:8000/",
    type: "POST",
    data: {
      url: url,
      name: name,
      category: category,
      domain: domain
    }
  })
  .done((data) => {
    $(review).text("success")
  })
  .fail((data) => {
    $(review).text("failed")
  })
}

$(() => {

  let domain = "none"
  if(window.location.href.startsWith("https://www.youtube.com/")) {
    domain = "youtube"
    let body = document.getElementsByTagName("body")[0]
    let div = $("<div id='pydown'></div>")
    div.css({
      position: "fixed",
      left: "5px",
      bottom: "5px",
      "z-index": 10
    })

    let copy_button = $("<button id='pydown-copy'>▷</button>")
    div.append(copy_button)

    let category = $("<input id='pydown-category' type='text'>")
    category.css({
      padding: "10px"
    })
    div.append(category)

    let input = $("<input id='pydown-name' type='text'>")
    input.css({
      padding: "10px"
    })
    div.append(input)

    let button = $("<button id='pydown-button'>download</button>")
    button.css({
      padding: "10px"
    })
    div.append(button)

    body.append(div[0])
    $(body).on("click", "#pydown-button", () => {
      let name = $("#pydown-name").val()
      let category = $("#pydown-category").val()
      download(window.location.href, name, category, domain, button)
    })
    $(body).on("click", "#pydown-copy", () => {
      $("#pydown-name").val($("#container h1").text())
    })
  } else if(window.location.href.startsWith("https://soundcloud.com/")) {
    domain = "sound cloud"
  }
})
