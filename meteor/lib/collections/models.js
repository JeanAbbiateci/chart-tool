// TODO: use Collection2 and SimpleSchema for db validation

Charts = new Mongo.Collection("charts");

DBStatus = new Meteor.Collection("database-status");

Charts.initEasySearch(['slug', 'data', 'heading', 'qualifier', 'source'], {
  'limit' : 10,
  'use' : 'mongo-db'
});

Meteor.methods({

  // status check methods
  clearDBStatus: function() {
    return DBStatus.remove({});
  },

  checkDBStatus: function() {
    var test = {};
    test.createdAt = new Date();
    test.lastEdited = new Date();
    test.connected = true;
    return DBStatus.insert(test);
  },

  // addChart only takes the text and data from the /new route
  // everything else is taken from settings.js in /lib
  addChart: function (text, data) {
    var newChart = copyObj(app_settings.chart);

    newChart.createdAt = new Date();
    newChart.lastEdited = new Date();
    newChart.slug = text;
    newChart.data = data;
    newChart.md5 = CryptoJS.MD5(data).toString();

    return Charts.insert(newChart);
  },

  // Update methods

  updateSlug: function (chartId, text) {
    return Charts.update(chartId, {
      $set: {
        slug: text,
        lastEdited: new Date()
      }
    });
  },
  updateData: function (chartId, data) {
    return Charts.update(chartId, {
      $set: {
        data: data,
        md5: CryptoJS.MD5(data).toString(),
        lastEdited: new Date()
      }
    });
  },
  updateDateFormat: function (chartId, format) {
    return Charts.update(chartId, {
      $set: {
        date_format: format,
        lastEdited: new Date()
      }
    });
  },
  updateHasHours: function (chartId, hasHours) {
    return Charts.update(chartId, {
      $set: {
        hasHours: hasHours,
        lastEdited: new Date()
      }
    });
  },
  updateHed: function (chartId, hed) {
    return Charts.update(chartId, {
      $set: {
        heading: hed,
        lastEdited: new Date()
      }
    });
  },
  updateQual: function (chartId, qual) {
    return Charts.update(chartId, {
      $set: {
        qualifier: qual,
        lastEdited: new Date()
      }
    });
  },
  updateSource: function (chartId, src) {
    return Charts.update(chartId, {
      $set: {
        source: src,
        lastEdited: new Date()
      }
    });
  },
  updateClass: function (chartId, customClass) {
    return Charts.update(chartId, {
      $set: {
        class: customClass,
        lastEdited: new Date()
      }
    });
  },
  updateImg: function (chartId, src) {
    return Charts.update(chartId, {
      $set: {
        img: src,
        lastEdited: new Date()
      }
    });
  },

  // "Options" methods

  updateType: function (chartId, type) {
    return Charts.update(chartId, {
      $set: {
        "options.type": type,
        lastEdited: new Date()
      }
    });
  },
  updateInterpolation: function (chartId, interpolation) {
    return Charts.update(chartId, {
      $set: {
        "options.interpolation": interpolation,
        lastEdited: new Date()
      }
    });
  },
  updateStacked: function(chartId, stacked) {
    return Charts.update(chartId, {
      $set: {
        "options.stacked": stacked,
        lastEdited: new Date()
      }
    });
  },
  updateExpanded: function(chartId, expanded) {
    return Charts.update(chartId, {
      $set: {
        "options.expanded": expanded,
        lastEdited: new Date()
      }
    });
  },
  updateHead: function(chartId, head) {
    return Charts.update(chartId, {
      $set: {
        "options.head": head,
        lastEdited: new Date()
      }
    });
  },
  updateDeck: function(chartId, deck) {
    return Charts.update(chartId, {
      $set: {
        "options.deck": deck,
        lastEdited: new Date()
      }
    });
  },
  updateLegend: function(chartId, legend) {
    return Charts.update(chartId, {
      $set: {
        "options.legend": legend,
        lastEdited: new Date()
      }
    });
  },
  updateFooter: function(chartId, footer) {
    return Charts.update(chartId, {
      $set: {
        "options.footer": footer,
        lastEdited: new Date()
      }
    });
  },
  updateXAxis: function(chartId, x_axis) {
    return Charts.update(chartId, {
      $set: {
        "options.x_axis": x_axis,
        lastEdited: new Date()
      }
    });
  },
  updateYAxis: function(chartId, y_axis) {
    return Charts.update(chartId, {
      $set: {
        "options.y_axis": y_axis,
        lastEdited: new Date()
      }
    });
  },
  updateTips: function(chartId, tips) {
    return Charts.update(chartId, {
      $set: {
        "options.tips": tips,
        lastEdited: new Date()
      }
    });
  },
  updateAnnotations: function(chartId, annotations) {
    return Charts.update(chartId, {
      $set: {
        "options.annotations": annotations,
        lastEdited: new Date()
      }
    });
  },
  updateQualifierOption: function(chartId, qualifier) {
    return Charts.update(chartId, {
      $set: {
        "options.qualifier": qualifier,
        lastEdited: new Date()
      }
    });
  },
  updateIndex: function(chartId, index) {
    return Charts.update(chartId, {
      $set: {
        "options.indexed": index,
        lastEdited: new Date()
      }
    });
  },

  // X Axis methods

  updateXScale: function (chartId, scale) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.scale": scale,
        lastEdited: new Date()
      }
    });
  },
  updateXTicks: function (chartId, ticks) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.ticks": ticks,
        lastEdited: new Date()
      }
    });
  },
  updateXOrient: function (chartId, orient) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.orient": orient,
        lastEdited: new Date()
      }
    });
  },
  updateXFormat: function (chartId, format) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.format": format,
        lastEdited: new Date()
      }
    });
  },
  updateXPrefix: function (chartId, pfx) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.prefix": pfx,
        lastEdited: new Date()
      }
    });
  },
  updateXSuffix: function (chartId, sfx) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.suffix": sfx,
        lastEdited: new Date()
      }
    });
  },
  updateXMin: function (chartId, minY) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.min": minY,
        lastEdited: new Date()
      }
    });
  },
  updateXMax: function (chartId, maxY) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.max": maxY,
        lastEdited: new Date()
      }
    });
  },
  updateXRescale: function (chartId, rescale) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.rescale": rescale,
        lastEdited: new Date()
      }
    });
  },
  updateXNice: function (chartId, nice) {
    return Charts.update(chartId, {
      $set: {
        "x_axis.nice": nice,
        lastEdited: new Date()
      }
    });
  },

  // Y Axis methods

  updateYScale: function (chartId, scale) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.scale": scale,
        lastEdited: new Date()
      }
    });
  },
  updateYTicks: function (chartId, ticks) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.ticks": ticks,
        lastEdited: new Date()
      }
    });
  },
  updateYOrient: function (chartId, orient) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.orient": orient,
        lastEdited: new Date()
      }
    });
  },
  updateYFormat: function (chartId, format) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.format": format,
        lastEdited: new Date()
      }
    });
  },
  updateYPrefix: function (chartId, pfx) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.prefix": pfx,
        lastEdited: new Date()
      }
    });
  },
  updateYSuffix: function (chartId, sfx) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.suffix": sfx,
        lastEdited: new Date()
      }
    });
  },
  updateYMin: function (chartId, minY) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.min": minY,
        lastEdited: new Date()
      }
    });
  },
  updateYMax: function (chartId, maxY) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.max": maxY,
        lastEdited: new Date()
      }
    });
  },
  updateYRescale: function (chartId, rescale) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.rescale": rescale,
        lastEdited: new Date()
      }
    });
  },
  updateYNice: function (chartId, nice) {
    return Charts.update(chartId, {
      $set: {
        "y_axis.nice": nice,
        lastEdited: new Date()
      }
    });
  },

  // Other methods

  resetXAxis: function (chartId) {
    return Charts.update(chartId, {
      $set: {
        x_axis: app_settings.chart.x_axis,
        lastEdited: new Date()
      }
    });
  },
  resetYAxis: function (chartId) {
    return Charts.update(chartId, {
      $set: {
        y_axis: app_settings.chart.y_axis,
        lastEdited: new Date()
      }
    });
  },

  // Print methods

  updatePrintCols: function (chartId, cols) {
    return Charts.update(chartId, {
      $set: {
        "print.columns": cols,
        lastEdited: new Date()
      }
    });
  },
  updatePrintLines: function (chartId, lines) {
    return Charts.update(chartId, {
      $set: {
        "print.lines": lines,
        lastEdited: new Date()
      }
    });
  },
  postChart: function(data) {
    // HTTP.call("POST", "http://localhost:3030",
    // { data: data },
    // function (error, result) {
    //   if (error) {
    //     console.log("error yo");
    //   }
    // });
  }
});
