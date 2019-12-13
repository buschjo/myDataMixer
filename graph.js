class Graph {
    constructor(data, dates, graphid, xaxis_title, yaxis_title, title, more_space_needed, categoryarray) {
        this.data = data;
        this.dates = dates;
        this.graphid = graphid;
        this.xaxis_title = xaxis_title;
        this.yaxis_title = yaxis_title;
        this.title = title;
        this.more_space_needed = more_space_needed;
        this.categoryarray = categoryarray;
    }

    draw(container) {

        var x_axis_template = {
            showline: true,
            title: this.xaxis_title
        };

        var categoryorder = 'trace';

        if (this.categoryarray !== undefined) {
            categoryorder = 'array';
        }

        //if categoryorder == 'trace' categoryarray will not be used
        var y_axis_template = {
            showline: true,
            title: this.yaxis_title,
            categoryorder: categoryorder,
            categoryarray: this.categoryarray
        };

        var trace = {
            x: this.dates,
            y: this.data,
            name: this.yaxis_title, //this name will be used for the legend
            mode: 'markers'
        };

        var data = [trace];
        var margin_left = 60;

        if (this.more_space_needed) {
            margin_left = 250;
        }

        var layout = {
            xaxis: x_axis_template,
            yaxis: y_axis_template,
            showlegend: true,
            legend: {
                x: 0.5,
                y: 1.2
            },
            margin: {
                l: margin_left,
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