window.onload = function() {
  var tem1, temp2;
  var temp1 = new JustGage({
    id: "temp1",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "TEMPERATURA",
    label: "ºC"
  });
  var hum1 = new JustGage({
    id: "hum1",
    value: getRandomInt(0, 100),
    min: 0,
    max: 100,
    title: "HUMEDAD",
    label: "%"
  });
  setInterval(function() {
    temp1.refresh(getRandomInt(50, 100));
    hum1.refresh(getRandomInt(50, 100));
  }, 1500);

  $(function() {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
      // Create the chart
      $('#chartTemp').highcharts('StockChart', {
        rangeSelector: {
          selected: 1
        },

        title: {
          text: 'TEMPERATURA 1'
        },

        credits: {
          enabled: false
        },

        series: [{
          name: 'TEMPERATURA',
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  });

  $(function() {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
      // Create the chart
      $('#chartHum').highcharts('StockChart', {
        rangeSelector: {
          selected: 1
        },

        title: {
          text: 'HUMEDAD 1'
        },

        credits: {
          enabled: false
        },

        series: [{
          name: 'HUMEDAD',
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  });
};
(function updateTime() {
  var now = moment().locale('es');

  $('.cf-td').each(function() {
    $('.cf-td-time', $(this)).html(now.format('HH:mm'));
    $('.cf-td-day', $(this)).html(now.format('dddd'));
    $('.cf-td-date', $(this)).html(now.format('LL'));
  });

  setTimeout(updateTime, 3000);
})();
