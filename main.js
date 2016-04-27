window.load = function(){
  jsconsole = document.getElementById('console');
  display   = document.getElementById('display');

  //setup event listener
  jsconsole.addEventListener('keyup', parseInput);
}();

function parseInput(event) {
  if (event.keyCode != 13) {
    return false;
  }
  try {
    var text = jsconsole.children[0].value;
    if (/^:load\b/i.test(text)){
      loadLibraries(text);
    } else {
      var result = eval(text);
      displayResult(result, text);
    }
  } catch (e) {
    console.log(e);
    displayError(e);
  }
  jsconsole.children[0].value = '';
}

function loadLibraries(param) {
  //http://underscorejs.org/underscore.js
  //https://code.jquery.com/jquery-2.2.3.min.js
  match = param.match(/https?:\/\/.*/);
  if (!match.length > 0) {
    displayResult('Can not load library', '');
    return false;
  }
  var script_url = match[0];
  var script=document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.setAttribute("src", script_url);
  document.head.appendChild(script);
  displayResult('Library Loaded', '');
}

function displayResult(result,code) {
  if (document.getElementsByClassName('instructions').length > 0) {
    document.getElementsByClassName('instructions')[0].remove();
  }

  display.innerHTML = "<div class='result'> >> " + result + "</div>" +
                      "<div class='code'> << " + code + "</div>" +
                      display.innerHTML;
}

function displayError(error) {
  if (document.getElementsByClassName('instructions').length > 0) {
    document.getElementsByClassName('instructions')[0].remove();
  }

  display.innerHTML = display.innerHTML + "<div class='error'> >> " + error + "</div>";
}


