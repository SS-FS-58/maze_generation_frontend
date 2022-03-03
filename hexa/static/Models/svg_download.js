var exportSVG = function(svg) {
    // first create a clone of our svg node so we don't mess the original one
    var clone = svg.cloneNode(true);
    // parse the styles
    parseStyles(clone);
  
    // create a doctype
    var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
    // a fresh svg document
    var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
    // replace the documentElement with our clone 
    svgDoc.replaceChild(clone, svgDoc.documentElement);
    // get the data
    var svgData = (new XMLSerializer()).serializeToString(svgDoc);
  
    //  var a = document.createElement('a');
    // a.id = "downloadfile";
    // a.href = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData.replace(/></g, '>\n\r<'));
    // a.download = 'circle_maze.svg';
    // a.innerHTML = 'download this maze svg file';
    // document.getElementById("div").appendChild(a);
    var download = document.createElement('input');
    download.setAttribute("type","button");
    download.setAttribute("value","download");
    download.id="download-btn";
    download.onclick = function(){
      var a = document.createElement('a');
      a.id = "downloadfile";
      a.href = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData.replace(/></g, '>\n\r<'));
      a.download = 'maze_' + m_shape_type +'_'+m_width+'*'+m_height+ '.svg';
      a.innerHTML = 'download this maze svg file';
      a.click();
    }
    document.getElementById("MazeDetails").appendChild(download);
  };

  // function download(){
  //   var a = document.createElement('a');
  //   a.id = "downloadfile";
  //   a.href = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData.replace(/></g, '>\n\r<'));
  //   a.download = 'circle_maze.svg';
  //   a.innerHTML = 'download this maze svg file';
  //   a.click();
  // }
  
  var parseStyles = function(svg) {
    var styleSheets = [];
    var i;
    // get the stylesheets of the document (ownerDocument in case svg is in <iframe> or <object>)
    var docStyles = svg.ownerDocument.styleSheets;
  
    // transform the live StyleSheetList to an array to avoid endless loop
    for (i = 0; i < docStyles.length; i++) {
      styleSheets.push(docStyles[i]);
    }
  
    if (!styleSheets.length) {
      return;
    }
  
    var defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    if (!defs.parentNode) {
      svg.insertBefore(defs, svg.firstElementChild);
    }
    svg.matches = svg.matches || svg.webkitMatchesSelector || svg.mozMatchesSelector || svg.msMatchesSelector || svg.oMatchesSelector;
  
  
    // iterate through all document's stylesheets
    for (i = 0; i < styleSheets.length; i++) {
      var currentStyle = styleSheets[i]
  
      var rules;
      try {
        rules = currentStyle.cssRules;
      } catch (e) {
        continue;
      }
      // create a new style element
      var style = document.createElement('style');
      // some stylesheets can't be accessed and will throw a security error
      var l = rules && rules.length;
      // iterate through each cssRules of this stylesheet
      for (var j = 0; j < l; j++) {
        // get the selector of this cssRules
        var selector = rules[j].selectorText;
        // probably an external stylesheet we can't access
        if (!selector) {
          continue;
        }
  
        // is it our svg node or one of its children ?
        if ((svg.matches && svg.matches(selector)) || svg.querySelector(selector)) {
  
          var cssText = rules[j].cssText;
          // append it to our <style> node
          style.innerHTML += cssText + '\n';
        }
      }
      // if we got some rules
      if (style.innerHTML) {
        // append the style node to the clone's defs
        defs.appendChild(style);
      }
    }
  
  };
  
  