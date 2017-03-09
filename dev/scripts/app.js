console.log("working");
 // Create app namespace to hold all methods
    var indeedApp = {};

    indeedApp.apiKey = '1211867702868069'
    indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch'
    indeedApp.googleKey = 'AIzaSyBTN4GtBR709ug6SMg-Sbr55JZvv5ctXys'
   
    // // Collect user input
    // indeedApp.collectInfo = function() {

    // }

    // Make AJAX request with user inputted data
    indeedApp.getInfo = function(location, title) {

    indeedApp.allJobs = $.ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method:'GET',
            data: {
                reqUrl: indeedApp.apiUrl,
                params: {
                    publisher: indeedApp.apiKey,
                    v: 2,
                    format: 'json',
                    q: title,
                    l: location,
                    sort: 'date',
                    radius: 25,
                    st: 'jobsite',
                    jt: 'fulltime',
                    start: 0,
                    limit: 10,
                    fromage: 14,
                    filter: 0,
                    latlong: 1,
                    co: 'ca'
                }
            }
        })
        .then(function(res) {
            var data = res.results;
            indeedApp.displayInfo(data);
        });
    }

    // Display data on the page
    indeedApp.displayInfo = function(jobs) {
        console.log(jobs)
        if (jobs.length < 1) {
            var noResult = $('<h3>').addClass('error').text(`No results for ${indeedApp.title} in ${indeedApp.location}. Please try other keyword or location.`);
            $('.results').append(noResult);
        }
        //for each job return title, company,city,state,description and date:
            jobs.forEach(function(job){
                // console.log("job", job);
                var jobTitle = job.jobtitle;
                var company = job.company;
                var city = job.city;
                var state = job.state;
                var shortDes = job.snippet;
                var datePosted = job.formattedRelativeTime;
                var applyUrl = job.url;
                indeedApp.lat = job.latitude;
                indeedApp.long = job.longitude;
                //generate html
                var jobTitleEl = $('<h3>').addClass('jobTitle').html(`${jobTitle}`);
                var compLoc = $('<h4>').addClass('location').html(`${company} - ${city}, ${state}`);
                var shortDesEl = $('<p>').addClass('shortDes').html(`${shortDes}`);
                var dateEl = $('<p>').addClass('date').html(`${datePosted}`);
                var apply = $('<a>').text("Apply Now!").addClass('seeBtn').attr('href', applyUrl);
                var showMap = $('<button>').text("Show Map").addClass('showMapBtn');
                //display on html
                $('.results').append(dateEl,jobTitleEl,compLoc,shortDesEl,apply,showMap);
            })

            $('.showMapBtn').on('click', function(){
                // initMap();
            })
    }

    indeedApp.events = function() {

         $('form').on('submit', function(e) {
            e.preventDefault();
            $('.results').empty();
           var location = $('#location').val();
           var title = $('#title').val();
           indeedApp.location = location;
           indeedApp.title = title;
           indeedApp.getInfo(location,title);
            console.log(indeedApp.title, indeedApp.location);
        });
    }

    // indeedApp.initMap = function() {
      // Create a map object and specify the DOM element for display.

var map;
function initMap() {
    console.log("??working");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
    // }

    // Start app
    indeedApp.init = function() {
        indeedApp.events();
        // initMap();
    }

    $(function() {
        indeedApp.init();
    });