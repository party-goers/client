let allevents = null
$(document).ready(function(){
  cekStatus()
    // waktu berhasil login detaileventinfo, concertlist di hide
    $("#detaileventinfo").hide()
    $('#homepage').click(function(){
        $(".jumbo-size").show()
        $("#concertlist").hide() 
        $("#detaileventinfo").hide()
    })
    $('#citybutton').click(function(){
        $('#errormessage').hide()
        $('.jumbo-size').hide()
        $('#concertlist').hide()
        $('.spinner-border').show()
        const cityname = ($(this).text()).toLowerCase()
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/song-kick/events/${cityname}`,
            success: function(result){
                $('.spinner-border').hide()
                $('.jumbo').hide()
                $('#concertlist').show()
                $('#concertlist').empty()
                allevents = result.resultsPage.results.event
                allevents.forEach(event=>{
                    $('#concertlist').append(`
                    <div class="card mb-3 position-relative" style="max-width: 540px;margin-left: auto;margin-right: auto; font-family: 'Comfortaa', cursive;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <h5><a href="#" class="stretched-link " onclick="getEventInfo('${event.id}')"></a></h5>
                                <img src="${event.imgSrc}" class="card-img" alt="...">
                            </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title"><a href="#"class="stretched-link" onclick="getEventInfo('${event.id}')" style="color: black;">${event.start.date}</a></h5>
                            <h6 class="card-title">${event.displayName}</h6>
                            <p class="card-text">${event.type}</p>
                            <p class="card-text"><small class="text-muted">${event.venue.displayName},${event.location.city}</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    `)
                })
            }
        })
    })
    $(".dropdown-item").click(function(){
        const cityname = $(this).text()
        $('#detaileventinfo').hide()
        $('#errormessage').hide()
        $('.jumbo-size').hide()
        $('#concertlist').hide()
        $('.spinner-border').show()
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/song-kick/events/${cityname}`,
            success: function(result){
                $('.spinner-border').hide()
                $('.jumbo').hide()
                $('#concertlist').show()
                $('#concertlist').empty()
                // console.log(result.resultsPage.results.event)
                allevents = result.resultsPage.results.event
                allevents.forEach(event=>{
                    $('#concertlist').append(`
                    <div class="card mb-3 position-relative" style="max-width: 540px;margin-left: auto;margin-right: auto; font-family: 'Comfortaa', cursive;font-weight: bold;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <h5><a href="#" class="stretched-link " onclick="getEventInfo('${event.id}')"></a></h5>
                                <img src="${event.imgSrc}" class="card-img" alt="...">
                            </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title"><a href="#"class="stretched-link" onclick="getEventInfo('${event.id}')" style="color: black;">${event.start.date}</a></h5>
                            <h6 class="card-title">${event.displayName}</h6>
                            <p class="card-text">${event.type}</p>
                            <p class="card-text"><small class="text-muted">${event.venue.displayName},${event.location.city}</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    `)
                })
                // $('#testweather').text(result.weather)
            }
        })
    })
})

function cekStatus (){
  if(localStorage.getItem('token')){
    $("#main").show();
    $('.jumbo-size').show()
    $('.afterlogin').show()
    $("#loginRegister").hide();
    $("#signOut").show();
  }else{
    $("#main").hide()
    $("#loginRegister").show();
    $("#signOut").hide();
    $('.afterlogin').hide()
  }
}

function onSignIn(googleUser) {
    // // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
        url: "http://localhost:3000/users/googleSignIn",
        headers: {
            id_token
        }
    })
    .done(respone=>{
        localStorage.setItem('token', respone.token)
        cekStatus()
    })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.clear()
      cekStatus()
      $('#concertlist').hide()
      $('#detaileventinfo').hide()
    });
  }

function getEventDetail(e){
    if(e) e.preventDefault()
    // alert($('#cityname').val())
    $('#detaileventinfo').hide()
    $('#errormessage').hide()
    $('.jumbo').hide()
    $('#concertlist').hide()
    $('.spinner-border').show()
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/song-kick/events/city/${$('#cityname').val()}`,
        success: function(result){
            $('.spinner-border').hide()
            $('.jumbo').hide()
            $('#concertlist').show()
            $('#concertlist').empty()
            allevents = result.resultsPage.results.event
                allevents.forEach(event=>{
                    $('#concertlist').append(`
                    <div class="card mb-3 position-relative" style="max-width: 540px;margin-left: auto;margin-right: auto; font-family: 'Comfortaa', cursive;font-weight: bold;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <h5><a href="#" class="stretched-link " onclick="getEventInfo('${event.id}')"></a></h5>
                                <img src="${event.imgSrc}" class="card-img" alt="...">
                            </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title"><a href="#"class="stretched-link" onclick="getEventInfo('${event.id}')" style="color: black;">${event.start.date}</a></h5>
                            <h6 class="card-title">${event.displayName}</h6>
                            <p class="card-text">${event.type}</p>
                            <p class="card-text"><small class="text-muted">${event.venue.displayName},${event.location.city}</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    `)
                })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('.spinner-border').hide()
            $('.jumbo').hide()
            $('.jumbo-size').hide()
            $('#concertlist').hide()
            $('#errormessage').show()
            $('#errormessage').append(`
                <h1>${xhr.responseText}</h1>
            `)
        }
    })
}

function getEventInfo(eventid){
    // if(e) e.preventDefault()
    $('#errormessage').hide()
    $('.jumbo').hide()
    $('#concertlist').hide()
    $('.spinner-border').show()
    // console.log(allevents)
    allevents.map(event=>{
        if(eventid==event.id){
            

            $.ajax({
                type: 'GET',
                url: `http://localhost:3000/weather/${event.location.city}/${event.start.date}`,
                success: function(result){
                    $.ajax({
                        method: "post",
                        url: "http://localhost:3000/googleMap",
                        data:{
                            venueName:event.venue.displayName, 
                            lat:event.location.lat, 
                            long: event.location.lng
                        }
                    })
                    .done(placeId=>{
                        console.log(placeId)
                        console.log(event)
                    $('.spinner-border').hide()
                    $("#detaileventinfo").append(`
                        <div class="jumbotron jumbo" style="height:100%;background-color: plum;font-family: 'Comfortaa', cursive;font-weight: bold;">
                            <iframe width="100%" height="450" frameborder="0" style="border:0"
                                src="https://www.google.com/maps/embed/v1/place?q=place_id:${placeId.placeId}&key=AIzaSyA1EayjiXa62AC9NBalP3wzjMUQfItjzhQ" allowfullscreen>
                            </iframe>
                            <h1>${event.displayName}</h1>
                            <h3>Weather Forecast: ${result.weather.weather[0].description}</h3>
                            <img src="http://openweathermap.org/img/wn/${result.weather.weather[0].icon}@2x.png" class="img-fluid" alt="Responsive image">
                            <h5>Event Type: ${event.type}</h5>
                        </div>
                        `)
                     $("#detaileventinfo").show()
                        
                    })
                    .fail(err=>{
                        console.log(err)
                    })

                    // console.log(event)
                    // $('.spinner-border').hide()
                    // $("#detaileventinfo").append(`
                    //     <div class="jumbotron jumbo" style="height:100%;background-color: plum;font-family: 'Comfortaa', cursive;font-weight: bold;">
                    //         <iframe width="100%" height="450" frameborder="0" style="border:0"
                    //             src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJyxMqeAKLaS4R9u7R1xkzRyw&key=AIzaSyA1EayjiXa62AC9NBalP3wzjMUQfItjzhQ" allowfullscreen>
                    //         </iframe>
                    //         <h1>${event.displayName}</h1>
                    //         <h3>Weather Forecast: ${result.weather.weather[0].description}</h3>
                    //         <img src="http://openweathermap.org/img/wn/${result.weather.weather[0].icon}@2x.png" class="img-fluid" alt="Responsive image">
                    //         <h5>Event Type: ${event.type}</h5>
                    //     </div>
                    //     `)
                    //  $("#detaileventinfo").show()
                }
            })
        }
    })
}

function getMaps(venueName, lat, long){
    $.ajax({
        method: "post",
        url: "http://localhost:3000/googleMap",
        data:{
            venueName, lat, long
        }
    })
    .then(result=>{
        
    })
}