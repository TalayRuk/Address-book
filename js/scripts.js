// business logic
function Contact(first,last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(street, city, state){
  this.street = street;
  this.city = city;
  this.state = state
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Address.prototype.newAddress = function() {
  return this.street + " " + this.city + " " + this.state
}
//user interface logic
// Address $call back function
// ***should not be in the form submit listerner callback function.
// this is b/c the btn must be functional b4 we submit the form; thus,
// the user have option to add more than one address to a Contact, they
// can just click "another address btn to receive more address form fields
// b4 submitting the form to create the new Contact!"

$(document).ready(function() {
  $("#add-address").click(funtion() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });
  // When appending a large amount of HTML w/$, we'll break it into smaller
  // strings on diff lines, using the + operator to concatenate them, as above
  // this make it more readable & also keep same indentation as the HTML**

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    // Next we'll add jQuery logic to our form submit listener inorder to collect
    // and utilize the address information provided by the user. Previously, When
    // the form was submitted, we collected the first & last name & created a Contact obj
    // w/that data. Now we must also loop throught the address form fields to collect the
    // address information, create Address obj, and push them onto the Contact objs addresses
    // The code to accomplish this can be seen below. it should reside after the line that
    // creates a new Contact. (However, note that u'll not c the result of this yet, b/c
    // we haven't added code to display the address info yet. )

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address (inputtedStreet, inputtedCity, inputtedStreet);
      newContact.addresses.push(newAddress);
    });
// Here, we've created a loop that cycles through each DOM element w/the class new-address.
// Much like looping through all elements of an array w/the forEach() method, we can
// do the same w/$each()method. However, instead of taking a parameter that each element is assigned to,
// we use the this keyword to refer to the current element.
// (When we use .forEach() we say st like kittens.forEach(function(kitten){..
// We have the opportunity to provide a parameter that each individual element of the array will use
// as a variable name."kitten", in this case. When using each() in jQuery we cann't provide
// a custom parameter in this fashion, and instead must use "this" as seen above)
// We also are using the find() method in the code above, which looks through all child elements of the
// provided element for any other elements that match the criteria provided as an argument. There;s a
// children() method, too, but children() will only traverse down a single level, wheras find() will
// look through children, their children, and so on. Since our inputs are nested within form-group <div>s,
// we need to traverse down two levels. Therefore, we use find() instead of children().

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#contacts").empty();
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(address) {
        $("ul#addresses").append("<li>" + address.street + ", " + address.city + " " + address.state + "</li>")
      });
    });
// below r used to clear the fields after the form is submitted**
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

  });
});
