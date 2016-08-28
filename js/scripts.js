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
Address.prototype.street = function() {
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
});

$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");


    $(".contact").last().click(function() {
      $("#contacts").empty();
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
    });
// below r not neccessary .. still works without
    // $("input#new-first-name").val("");
    // $("input#new-last-name").val("")

  });
});
