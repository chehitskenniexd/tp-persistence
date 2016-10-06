'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

$(function(){

  // jQuery selects
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  // make all the option tags (second arg of `forEach` is a `this` binding)


  $.ajax({
    method: 'GET',
    url :"/api/hotels"
})
  .then(function (hotels) {
      hotels.forEach(makeOption, $hotelSelect);
      return $.get("/api/restaurants");
    })
.then(function(restaurants){
  restaurants.forEach(makeOption, $restaurantSelect);

  return $.get("/api/activities");
}).then(function(activities){
  activities.forEach(makeOption, $activitySelect);

})
  .catch( console.error.bind(console) );







  function makeOption (databaseAttraction) {
    var $option = $('<option></option>') // makes a new option tag
      .text(databaseAttraction.name)
      .val(databaseAttraction.id);
    this.append($option); // add the option to the specific select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');
    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    var apiPath = type === 'activity' ? 'activities' : `${type}s`
    // get associated attraction and add it to the current day in the trip
    $.ajax({
      method: 'GET',
      url: `/api/${apiPath}`,
    }).then(attractions => attractions.filter(attraction => attraction.id == id)[0])
    .then(attraction => tripModule.addToCurrent(attractionModule.create(attraction)))
    .catch(err => console.log(err));
  });

});
