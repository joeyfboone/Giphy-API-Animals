
  
      // Initial array of animals
      var animals = ["dog", "cat", "hampster", "lion"];
      
            // displayanimalInfo function re-renders the HTML to display the appropriate content
            function displayanimalInfo() {
      
              var animal = $(this).attr("data-name");
              var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + animal + "&api_key=dc6zaTOxFJmzC";
      
              // Creating an AJAX call for the specific animal button being clicked
              console.log (queryURL)
              $.ajax({
                url: queryURL,
                method: "GET"
              }).done(function(response) {
      console.log(response);
      console.log(response.data["0"].images.original.url);
                
      for (var index = 0; index < 10; index++) {
          
        

      
                // Creating a div to hold the animal
                var animalDiv = $("<div class='animal'>");
           
                // Retrieving the URL for the image
               var imgURL = response.data[index].images.original.url;
      
                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
      
                // Appending the image
                animalDiv.append(image);
      
                // Putting the entire animal above the previous animals
                $("#animal-images").prepend(animalDiv);
              }});
      
            }
      
            // Function for displaying animal data
            function renderButtons() {
      
              // Deleting the animals prior to adding new animals
              // (this is necessary otherwise you will have repeat buttons)
              $("#buttons-view").empty();
      
              // Looping through the array of animals
              for (var i = 0; i < animals.length; i++) {
      
                // Then dynamicaly generating buttons for each animal in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of animal to our button
                a.addClass("animal");
                // Adding a data-attribute
                a.attr("data-name", animals[i]);
                // Providing the initial button text
                a.text(animals[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
              }
            }
      
            // This function handles events where a animal button is clicked
            $("#add-animal").on("click", function(event) {
              event.preventDefault();
              // This line grabs the input from the textbox
              var animal = $("#animal-input").val().trim();
      
              // Adding animal from the textbox to our array
              animals.push(animal);
      
              // Calling renderButtons which handles the processing of our animal array
              renderButtons();
            });
      
            // Adding a click event listener to all elements with a class of "animal"
            $(document).on("click", ".animal", displayanimalInfo);
      
            // Calling the renderButtons function to display the intial buttons
            renderButtons();
