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
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayor', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre']
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
        series: [{
            type: 'column',
            name: 'Pendientes',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        }, {
            type: 'column',
            name: 'Aceptados',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        }, {
            type: 'column',
            name: 'Entregados',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        },{
            type: 'pie',
            name: 'Total Pedidos',
            data: [{
                name: 'Pendientes',
                y: 619,
                color: Highcharts.getOptions().colors[0], // 2020 color
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total} M',
                    style: {
                        fontSize: '15px'
                    }
                }
            }, {
                name: 'Aceptados',
                y: 586,
                color: Highcharts.getOptions().colors[1] // 2021 color
            }, {
                name: 'Entregados',
                y: 647,
                color: Highcharts.getOptions().colors[2] // 2022 color
            }],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
    const chart2 = Highcharts.chart('pedidos-webpay', {
        chart: {
            backgroundColor: 'transparent' // Establece el color de fondo como transparente
          },
        title: {
            text: 'Pedidos realizados con Webpay durante el año',
            align: 'center'
        },
        xAxis: {
            categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayor', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre']
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
        series: [{
            type: 'column',
            name: 'Pendientes',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        }, {
            type: 'column',
            name: 'Aceptados',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        }, {
            type: 'column',
            name: 'Entregados',
            data: [59, 83, 65, 228, 184,59, 83, 65, 228, 184,22,22]
        },{
            type: 'pie',
            name: 'Total Pedidos',
            data: [{
                name: 'Pendientes',
                y: 619,
                color: Highcharts.getOptions().colors[0], // 2020 color
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total} M',
                    style: {
                        fontSize: '15px'
                    }
                }
            }, {
                name: 'Aceptados',
                y: 586,
                color: Highcharts.getOptions().colors[1] // 2021 color
            }, {
                name: 'Entregados',
                y: 647,
                color: Highcharts.getOptions().colors[2] // 2022 color
            }],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
});