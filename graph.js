class Graph {
    constructor(traces, graphid, xaxis_title, title, more_space_needed) {
        this.traces = traces;
        this.graphid = graphid;
        this.xaxis_title = xaxis_title;
        this.title = title;
        this.more_space_needed = more_space_needed;
    }

    draw(container) {
        Plotly.newPlot(container, this.getTraces(), this.getLayout(), this.getConfig());
    }

    getLayout() {
        var y_axis_templates = this.getYAxisTemplates();
        if (y_axis_templates.length === 1) {
            return this.getOneTraceLayout(y_axis_templates);
        } else if (y_axis_templates === 2) {
            return this.getOneTraceLayout(y_axis_templates);
        }
    }

    getOneTraceLayout(y_axis_templates) {
        return {
            xaxis: this.getXAxisTemplate(),
            yaxis: y_axis_templates[0],
            showlegend: true,
            legend: {
                x: 0.5,
                y: 1.2
            },
            margin: {
                l: this.getMarginLeft(),
                b: 50,
                r: 1,
                t: 1,
            } //margin and legend values trial and error (https://plot.ly/javascript/setting-graph-size/)
        };
    }

    getTwoTraceLayout(y_axis_templates) {
        return {
            xaxis: x_axis_template,
            yaxis: y_axis_templates[0],
            yaxis2: y_axis_templates[1],
            showlegend: true,
            legend: {
                x: 0.5,
                y: 1.2
            },
            margin: {
                l: this.getMarginLeft(),
                b: 50,
                r: 1,
                t: 1,
            }
        };
    }

    getConfig() {
        return {
            displayModeBar: false,
            responsive: true
        };
        // responsive: true for resizing when switching landscape/portrait mode (https://plot.ly/javascript/responsive-fluid-layout/)
        // displayModeBar: false because plotly plots come with a toolbar, but that is not needed for thsi project (https://plot.ly/javascript/configuration-options/)
    }

    getXAxisTemplate() {
        return {
            showline: true,
            title: this.xaxis_title
        };
    }

    getYAxisTemplates() {
        //if categoryorder == 'trace' categoryarray will not be used
        var templates = [];
        this.traces.forEach(trace => {
            templates.push({
                showline: true,
                title: trace.yaxis_title,
                categoryorder: this.getCategoryOrder(trace),
                categoryarray: trace.categoryarray
            });
        });
        return templates;
    }

    getCategoryOrder(trace) {
        if (trace.categoryarray !== undefined) {
            return 'array';
        } else {
            return 'trace';
        }
    }

    getTraces() {
        var traces = [];
        this.traces.forEach(trace => {
            traces.push({
                x: trace.dates,
                y: trace.data,
                name: trace.yaxis_title, //this name will be used for the legend
                mode: 'markers'
            });
        });
        return traces;
    }

    getMarginLeft() {
        if (this.more_space_needed) {
            return 250;
        } else {
            return 60;
        }

    }
}