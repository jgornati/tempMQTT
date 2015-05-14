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
    var dataTemp = new Array();

    $.getJSON('http://localhost:3000/Temp1', function(json) {
      $.map(json, function(obj, i) {
        dataTemp.push({
          x: new Date(obj.TopicTime).getTime(),
          y: parseFloat(obj.TopicValue)
        });
      });
      console.log("esto es data: " + JSON.stringify(dataTemp));
      $('#chartTemp').highcharts('StockChart', {
        rangeSelector: {
          selected: 1
        },

        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },

        title: {
          text: 'TEMPERATURA 1'
        },

        credits: {
          enabled: false
        },

        series: [{
          name: 'TEMPERATURA',
          data: dataTemp,
          color: '#ff0000',
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  });

  $(function() {
    var dataHum = new Array();

    $.getJSON('http://localhost:3000/hum1', function(json) {
      $.map(json, function(obj, i) {
        dataHum.push({
          x: new Date(obj.TopicTime).getTime(),
          y: parseFloat(obj.TopicValue)
        });
      });
      console.log("esto es data: " + JSON.stringify(dataHum));
      $('#chartHum').highcharts('StockChart', {
        rangeSelector: {
          selected: 1
        },

        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },

        title: {
          text: 'HUMEDAD 1'
        },

        credits: {
          enabled: false
        },

        series: [{
          name: 'HUMEDAD',
          data: dataHum,
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
