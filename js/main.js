function print(chars) {
    console.log(chars)
}

$.get("https://ipgeolocation.abstractapi.com/v1/?api_key=08eb2e11cd024fc7a117b57a73b9d5ef", 
    function(data) {  
        var data = JSON.parse(JSON.stringify(data))
        var location = `${data.city} ${data.region}`
        document.getElementById("location").innerText = location
        $.get(`https://api.sijey.repl.co/weather?location=${location}`, 
            function(data) {
                document.getElementById("weather-info").innerText = data
            }
        )
    }
)

var SpeechRecognition = window.webkitSpeechRecognition
var recognition = new SpeechRecognition()
var Content = ""
recognition.continuous = true

recognition.onresult = function (event) {
    var current = event.resultIndex
    var transcript = event.results[current][0].transcript
    Content += transcript
    $.get(`https://api.sijey.repl.co/search?q=${Content}`, 
        function(data) {
            data = JSON.parse(JSON.stringify(data))
            document.getElementById("re").style.visibility = "visible"
            document.getElementById("re-info").innerText = `I Got This From ${data.domain}`
            document.getElementById("re-showcase-img").src = `https://www.google.com/s2/favicons?domain=${data.domain}`
            document.getElementById("name").innerText = data.name
            document.getElementById("snippet").innerText = data.snippet
            document.getElementById("re-link").innerText = data.link
            document.getElementById("re-link").href = data.link
        }
    )
}

$(document).ready(function () {
    $("#mic").click(function () {
        if (document.getElementById("mic").className === "Stop") {
            document.getElementById("mic").className = "Start"
            recognition.stop()
        } else {
            document.getElementById("mic").className = "Stop"
            if (Content.length) {
                Content += " "
            }
            recognition.start()
        }
    })
})
