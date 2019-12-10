class Graph {
    constructor(data, dates, graphid, xaxis_title, yaxis_title, title) {
        this.data = data;
        this.dates = dates;
        this.graphid = graphid;
        this.xaxis_title = xaxis_title;
        this.yaxis_title = yaxis_title;
        this.title = title;
    }

    draw(container) {

        var x_axis_template = {
            showline: true,
            title: this.xaxis_title
        };

        var y_axis_template = {
            showline: true,
            title: this.yaxis_title
        };

        var trace = {
            x: this.dates,
            y: this.data,
            name: this.yaxis_title, //this name will be used for the legend
            mode: 'markers'
        };

        var data = [trace];
        var layout = {
            xaxis: x_axis_template,
            yaxis: y_axis_template,
            showlegend: true,
            legend: {
                x: 0.5,
                y: 1.2
            },
            margin: {
                l: 50,
                b: 50,
                r: 1,
                t: 1,
            }
        };

        //margin and legend values trial and error (https://plot.ly/javascript/setting-graph-size/)

        var config = {
            displayModeBar: false,
            responsive: true
        };

        Plotly.newPlot(container, data, layout, config);
        // responsive: true for resizing when switching landscape/portrait mode (https://plot.ly/javascript/responsive-fluid-layout/)
        // displayModeBar: false because plotly plots come with a toolbar, but that is not needed for thsi project (https://plot.ly/javascript/configuration-options/)
    }
}