/* Author: Maria Arroyo */
window.onload = function (){
    var body = document.getElementsByTagName("body")[0];
    //Array of images for canvas
    var imagePaths = ["img/playa2.jpg","img/underwater.png","img/food.jpg","img/waterfalls.jpg",
                     "img/coral.jpg","img/superblue.png", "img/chichenItza1.jpg",
                      "img/cenote.jpg"];//array of images for canvas
    var canvas= null;
    var canvasCtx = null;
    //create an image object
    var img = document.createElement("img");
    var currentImage = 0;
    //timer variable for animation for the canvas
    var revealTimer;
    
    //to drop markers on map
    var dropButton = document.getElementById("drop");
    
    //canvas element
    canvas = document.getElementById('canvas');
    canvasCtx = canvas.getContext('2d');
    
    
    //switchImage();
    
    //Interval for animation
    setInterval(switchImage,3000);
    
    //function that switches the image
    function switchImage(){
  
        if (currentImage >= imagePaths.length){
            currentImage = 0;
        }else{
            
            img.setAttribute('src',imagePaths[currentImage]);
            canvasCtx.globalAlpha = 0.1;
            revealTimer = setInterval(revealImage, 100);
            currentImage++;
        }
        
    }
    
    
    //function that reveals the new image
    function revealImage(){
        canvasCtx.save();//save current image
        canvasCtx.drawImage(img,0,10);//set the image on the canvas at this coordinates.
        canvasCtx.globalAlpha +=0.5;//fade speed
        canvasCtx.font = "16pt  Times New Roman";
        canvasCtx.fillStyle = "white";
        canvasCtx.color = "white";//white font
        canvasCtx.fillText("The Riviera Maya",15,105);//canvas text
        if (canvasCtx.globalAlpha >= 1.0) {
            clearInterval(revealTimer);//clear interval
        }
        canvasCtx.restore();//restore with new image
        
    }
    
    //function to create the heading.
    function createHeadingElem(type, htext) {
        var h2 = document.createElement("h" + type);
        h2.innerHTML = htext;
        return h2;
    }
    
     
    //function to create a paragraph
    function createParagraph(text){
        var p = document.createElement("p");
        p.innerHTML = text;
        return p;
    }
    var h2 =createHeadingElem(2, "About The Riviera Maya");
    var p1 = createParagraph("Riviera Maya is a tourism and resort district in Mexico." +
                              "It straddles the coastal Highway 307 along the Caribbean " +
                              "coastline of the state of Quintana Roo, located on the " +
                              "eastern portion of the Yucatan Peninsula. This district " +
                              "historically started at the city of Playa del Carmen and " +
                              "ended at the village of Tulum, although the towns of Puerto " +
                              "Morelos situated to the north and between Playa del Carmen" +
                              "and Cancun as well as the town of Felipe Carrillo Puerto" +
                              "situated 40 kilometres (25 mi) to the south of Tulum are " +
                              "both currently being promoted as part of the Riviera Maya " +
                              "tourist corridor.");
    //p1.id = "p1"; //assigning intro id
    var sec = document.createElement("section");
    var divMap = document.getElementById("map1");
    sec.id = "intro";
    sec.appendChild(h2);//append the h2 to the body
    sec.appendChild(p1);//append  the intro p to the body
    sec.appendChild(divMap);// apend the map to the section
    body.appendChild(sec);// the section to the body
    var figure = document.getElementById("pictures");
    body.appendChild(figure);
    var footer = document.getElementById("footer");
    body.appendChild(footer);
    
    
    
    
    
   //Array to store coordenades of locations 
    var locations = [
      ['Xcaret', 20.58091 -87.11970, 4],
      ['Playa del Carmen', 20.62956, -87.07389 , 5],
      ['Tulum', 20.21142, -87.46535 , 3],
      ['Cozumel', 20.42298, -86.92234 , 2],
      ['Chichen-Itza', 20.67833, -88.56889 , 1]
    ];
    
    
    
    //create a map object
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(20.67833, -88.56889),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();//small information window on the map
    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      
      
      //event listener for the map
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);//set the content using array of locations
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

}
  
 
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    