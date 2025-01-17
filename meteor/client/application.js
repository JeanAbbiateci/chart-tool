savePulse = function() {
  var time = 600;
  function pulse() {
    d3.select(".save-icon").transition()
      .duration(time)
      .style("opacity", 1)
      .transition()
      .duration(time)
      .style('opacity', 0.1)
      .ease('sine')
      .each("end", pulse);
  }
  function stop() {
    d3.select(".save-icon").transition()
      .style("opacity", "");
  }
  return {
    pulse: pulse,
    stop: stop
  }
}

updateAndSave = function(method, obj, data) {
  savePulse().pulse();
  Meteor.call(method, obj._id, data, function(err, result) {
    if (!err) {
      var newObj = Charts.findOne(Session.get("chartId"));
      generateThumb(newObj);
      savePulse().stop();
    } else {
      console.log(err);
    }
  });
}

drawPreviews = function(obj) {
  drawChart(".desktop-preview-container", obj);
  drawChart(".mobile-preview-container", obj);
}

drawChart = function(container, obj) {
  var chartObj = {};
  chartObj.id = obj._id;
  chartObj.data = embed(obj);
  ChartTool.create(container, chartObj);
}

generateThumb = function(obj) {

  var scale = 2,
      ratio = 67,
      className = "chart-thumbnail",
      container = "." + className,
      div = document.createElement("div");

  obj.exportable = {};
  obj.exportable.type = "web";
  obj.exportable.dynamicHeight = false;
  obj.exportable.width = 460;
  obj.exportable.height = obj.exportable.width * (ratio / 100);

  div.style.width = obj.exportable.width + "px";
  div.style.height = obj.exportable.height + "px";
  div.className = className;
  document.body.appendChild(div);

  drawChart(container, obj);

  var svgContainer = document.createElement("div");
  svgContainer.className = "svg-container";
  document.body.appendChild(svgContainer);

  var outputCanvas = document.createElement("div");
  outputCanvas.className = "canvas-container";
  document.body.appendChild(outputCanvas);

  var drawnChartContainer = d3.select(container);

  var prefix = app_settings.chart.prefix;

  drawnChartContainer.select("." + prefix + "chart_title")
    .classed("target", true);

  drawnChartContainer.select("." + prefix + "chart_svg")
    .classed("target", true);

  drawnChartContainer.select("." + prefix + "chart_source")
    .classed("target", true);

  multiSVGtoPNG.convertToSVG({
    input: '.chart-thumbnail',
    selector: "." + prefix + "chart_title.target, ." + prefix + "chart_svg.target, ." + prefix + "chart_source.target",
    output: '.svg-container'
  });

  multiSVGtoPNG.encode({
    input: '.svg-container',
    output: '.canvas-container',
    scale: scale || 2
  }, function(data) {
    var file = dataURLtoBlob(data);
    file.name = "thumbnail.png";

    S3.upload({
      files: [file],
      path: app_settings.s3.base_path + obj._id,
      expiration: app_settings.s3.expiration || 30000,
      unique_name: false
    }, function(err, result) {
      if (err) {
        console.error("S3 thumbnail upload error!");
      } else {
        Meteor.call("updateImg", obj._id, result.secure_url);
      }
    });

  });

  svgContainer.parentNode.removeChild(svgContainer);
  svgContainer = null;

  outputCanvas.parentNode.removeChild(outputCanvas);
  outputCanvas = null;

  div.parentNode.removeChild(div);
  div = null;

}


// downloads a web image to certain specifications
downloadImg = function(_obj, _options) {

  var scale = _options.scale,
      className = "chart-export",
      container = "." + className,
      filename = _obj.slug + "-" + _options.descriptor + "-" + _obj.exportable.width,
      div = document.createElement("div");

  div.style.width = _obj.exportable.width + "px";
  div.style.height = _obj.exportable.height + "px";
  div.className = className;
  document.body.appendChild(div);

  drawChart(container, _obj);

  var svgContainer = document.createElement("div");
  svgContainer.className = "svg-container";
  document.body.appendChild(svgContainer);

  var outputCanvas = document.createElement("div");
  outputCanvas.className = "canvas-container";
  document.body.appendChild(outputCanvas);

  var drawnChartContainer = d3.select("." + className);

  var prefix = app_settings.chart.prefix;

  drawnChartContainer.select("." + prefix + "chart_title")
    .classed("target", true);

  drawnChartContainer.select("." + prefix + "chart_svg")
    .classed("target", true);

  drawnChartContainer.select("." + prefix + "chart_source")
    .classed("target", true);

  multiSVGtoPNG.convertToSVG({
    input: '.chart-export',
    selector: "." + prefix + "chart_title.target, ." + prefix + "chart_svg.target, ." + prefix + "chart_source.target",
    output: '.svg-container'
  });

  multiSVGtoPNG.downloadPNG({
    filename: filename,
    input: '.svg-container',
    output: '.canvas-container',
    scale: scale || 2
  });

  svgContainer.parentNode.removeChild(svgContainer);
  svgContainer = null;

  outputCanvas.parentNode.removeChild(outputCanvas);
  outputCanvas = null;

  div.parentNode.removeChild(div);
  div = null;

}
