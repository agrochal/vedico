var copyboxes = document.getElementsByClassName("copybox");
var fcb = copyboxes[0];
var scb = copyboxes[1];
var font_list = document.getElementsByClassName("ver-list")[0];
var svg_list = document.getElementsByClassName("ver-list")[1];

function display(text) {
   var list = document.getElementById('body-bottom');
   list.innerHTML = '';
   text = text.toLowerCase();
   for (let i = 0; i < icons.length; i++) {
      if (icons[i].name.toLowerCase().includes(text)) {
         var el = document.createElement("div");
         el.className = "icon";
         var icon = document.createElement("i");
         icon.className = "vedico-" + icons[i].font[0];
         var el_name = document.createElement("div");
         el_name.className = "name";
         el_name.textContent = icons[i].name;
         el.appendChild(icon);
         el.appendChild(el_name);
         list.appendChild(el);
         el.addEventListener("click", function() {
            getDetails(icons[i]);
         });
      }
   }
}

function showVersion(type, obj, id) {
   if (type == "svg") {
      scb.textContent = '<img src="https://cdn.jsdelivr.net/gh/agrochal/vedico/svg/' + obj.svg[id] + '.svg">';
      if(svg_list.getElementsByClassName("selected")[0]!=undefined){
         svg_list.getElementsByClassName("selected")[0].classList = "version";
      }
      svg_list.getElementsByClassName("version")[id].classList = "version selected";
   } else if (type == "font") {
      fcb.textContent = '<i class="vedico-' + obj.font[id] + '></i>';
      if(font_list.getElementsByClassName("selected")[0]!=undefined){
         font_list.getElementsByClassName("selected")[0].classList = "version";
      }
      font_list.getElementsByClassName("version")[id].classList = "version selected";
   }
}

function getDetails(obj) {
   var ico_name = document.getElementById("ico-name");
   ico_name.textContent = obj.name;
   font_list.innerHTML = '';
   svg_list.innerHTML = '';

   //FONT
   for (let x = 0; x < obj.font.length; x++) {
      var el = document.createElement("div");
      el.className = "version";
      var icon = document.createElement("i");
      icon.className = "vedico-" + obj.font[x];
      el.appendChild(icon);
      el.addEventListener("click", function() {
         showVersion("font", obj, x);
      });
      font_list.appendChild(el);
   }

   //SVG
   for (let y = 0; y < obj.svg.length; y++) {
      var el = document.createElement("div");
      el.className = "version";
      var img = document.createElement("img");
      img.src = "https://cdn.jsdelivr.net/gh/agrochal/vedico/svg/" + obj.svg[y] + ".svg";
      el.appendChild(img);
      el.addEventListener("click", function() {
         showVersion("svg", obj, y);
      });
      svg_list.appendChild(el);
   }

   showVersion("font", obj, 0);
   showVersion("svg", obj, 0);

}

function inputChange() {
   var input = document.getElementById('search');
   display(input.value);
}

display('');
getDetails(icons[0]);
