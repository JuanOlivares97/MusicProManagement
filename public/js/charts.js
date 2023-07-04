document.addEventListener('DOMContentLoaded', function () {
    const chart1 = Highcharts.chart('pedidos-transferencias', {
        chart: {
          backgroundColor: 'transparent' // Establece el color de fondo como transparente
        },
        title: {
          text: 'Pedidos realizados con transferencia durante el año',
          align: 'center'
        },
        xAxis: {
          categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        yAxis: {
          title: {
            text: 'Cantidad de Pedidos'
          }
        },
        tooltip: {
          valueSuffix: ' Pedidos'
        },
        plotOptions: {
          series: {
            borderRadius: '25%'
          }
        },
        series: [
          {
            type: 'column',
            name: 'Pendientes',
            data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
          },
          {
            type: 'column',
            name: 'Aceptados',
            data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
          },
          {
            type: 'column',
            name: 'Entregados',
            data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
          },
          {
            type: 'pie',
            name: 'Total Pedidos',
            data: [
              {
                name: 'Pendientes',
                y: 0,
                color: Highcharts.getOptions().colors[0], // Color para pendientes
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  format: '{point.total}',
                  style: {
                    fontSize: '15px'
                  }
                }
              },
              {
                name: 'Aceptados',
                y: 0,
                color: Highcharts.getOptions().colors[1], // Color para aceptados
              },
              {
                name: 'Entregados',
                y: 0,
                color: Highcharts.getOptions().colors[2] // Color para entregados
              }
            ],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
              enabled: false
            }
          }
        ]
      });
    
      // Realizar la consulta a la API utilizando axios
      axios
        .get("http://localhost:3001/api/pedidos-totales-graficos-transferencias")
        .then((response) => {
          // Obtener los datos de la respuesta de la API
          const data = response.data;
    
          // Crear los arreglos para los datos de cada serie del gráfico
          const pendientesData = [];
          const aceptadosData = [];
          const entregadosData = [];
    
          // Recorrer los datos de la respuesta de la API y llenar los arreglos de datos
          data.forEach((item) => {
            pendientesData.push(item.Pendiente);
            aceptadosData.push(item.Aceptado);
            entregadosData.push(item.Entregado);
          });
    
          // Actualizar los datos de las series del gráfico
          chart1.series[0].setData(pendientesData);
          chart1.series[1].setData(aceptadosData);
          chart1.series[2].setData(entregadosData);
    
          // Actualizar el valor total de pendientes en el gráfico de pie
          const totalPendientes = pendientesData.reduce((total, count) => total + count, 0);
          chart1.series[3].data[0].update({ y: totalPendientes, total: totalPendientes });
    
        })
        .catch((error) => {
          console.error(error);
        });
    });
    document.addEventListener('DOMContentLoaded', function () {
        const chart2 = Highcharts.chart('pedidos-webpay', {
          chart: {
            backgroundColor: 'transparent' // Establece el color de fondo como transparente
          },
          title: {
            text: 'Pedidos realizados con Webpay durante el año',
            align: 'center'
          },
          xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          },
          yAxis: {
            title: {
              text: 'Cantidad de Pedidos'
            }
          },
          tooltip: {
            valueSuffix: ' Pedidos'
          },
          plotOptions: {
            series: {
              borderRadius: '25%'
            }
          },
          series: [
            {
              type: 'column',
              name: 'Pendientes',
              data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
            },
            {
              type: 'column',
              name: 'Aceptados',
              data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
            },
            {
              type: 'column',
              name: 'Entregados',
              data: [] // Dejar los datos vacíos por ahora, se llenarán más adelante
            },
            {
              type: 'pie',
              name: 'Total Pedidos',
              data: [
                {
                  name: 'Pendientes',
                  y: 0,
                  color: Highcharts.getOptions().colors[0], // Color para pendientes
                  dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total}',
                    style: {
                      fontSize: '15px'
                    }
                  }
                },
                {
                  name: 'Aceptados',
                  y: 0,
                  color: Highcharts.getOptions().colors[1], // Color para aceptados
                },
                {
                  name: 'Entregados',
                  y: 0,
                  color: Highcharts.getOptions().colors[2] // Color para entregados
                }
              ],
              center: [75, 65],
              size: 100,
              innerSize: '70%',
              showInLegend: false,
              dataLabels: {
                enabled: false
              }
            }
          ]
        });
      
        // Realizar la consulta a la API utilizando axios
        axios
          .get("http://localhost:3001/api/pedidos-totales-graficos-webpay")
          .then((response) => {
            // Obtener los datos de la respuesta de la API
            const data = response.data;
      
            // Crear los arreglos para los datos de cada serie del gráfico
            const pendientesData = [];
            const aceptadosData = [];
            const entregadosData = [];
            const rechazadosData = [];
      
            // Recorrer los datos de la respuesta de la API y llenar los arreglos de datos
            data.forEach((item) => {
              pendientesData.push(item.Pendiente);
              aceptadosData.push(item.Aceptado);
              entregadosData.push(item.Entregado);
              rechazadosData.push(item.Rechazado);
            });
      
            // Actualizar los datos de las series del gráfico
            chart2.series[0].setData(pendientesData);
            chart2.series[1].setData(aceptadosData);
            chart2.series[2].setData(entregadosData);
            chart2.series[3].data[0].update({
              y: pendientesData.reduce((total, count) => total + count, 0),
              total: pendientesData.reduce((total, count) => total + count, 0)
            });
          })
          .catch((error) => {
            console.error(error);
          });
      });
      