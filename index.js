let allevents = null
$(document).ready(function(){
    // waktu berhasil login detaileventinfo, concertlist di hide
    $("#detaileventinfo").hide()
    $('#homepage').click(function(){
        $(".jumbo-size").show()
        $("#concertlist").hide() 
        $("#detaileventinfo").hide()
    })
    $('.dropdown-item').click(function(){
        //masih bingung
    })
    $(".dropdown-item").click(function(){
        const cityname = $(this).text()
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
                    <div class="card mb-3 position-relative" style="max-width: 540px;margin-left: auto;margin-right: auto; ">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <h5><a href="#" class="stretched-link " onclick="getEventDetail('${event.id}')"></a></h5>
                                <img src="${event.imgSrc}" class="card-img" alt="...">
                            </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">${event.start.date}</h5>
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
