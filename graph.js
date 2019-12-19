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

    getTraces() {
        var yaxes = ['y1', 'y2', 'y3'];
        var traces = [];

        for (let index = 0; index < this.traces.length; index++) {
            const trace = this.traces[index];
            traces.push({
                x: trace.dates,
                y: trace.data,
                name: trace.yaxis_title, //this name will be used for the legend
                mode: 'markers',
                yaxis: yaxes[index] //this is neccessary to show more than one yaxis
            });
        }
        return traces;
    }

    getLayout() {
        var y_axis_templates = this.getYAxisTemplates();
        if (y_axis_templates.length === 1) {
            return this.getOneTraceLayout(y_axis_templates);
        } else if (y_axis_templates.length === 2) {
            return this.getTwoTraceLayout(y_axis_templates);
        }
    }

    getYAxisTemplates() {
        //if categoryorder == 'trace' categoryarray will not be used
        var templates = [];
        if (this.traces.length === 1) {
            templates.push(getFirstYAxisTemplate(this.traces[0]));
        } else if (this.traces.length === 2) {
            templates.push(getFirstYAxisTemplate(this.traces[0]));
            templates.push(getSecondYAxisTemplate(this.traces[1]));
        } else {
            templates.push(getSecondYAxisTemplate(this.traces[1]));
            // templates.push(this.getFirstYAxisTemplate(this.traces[2]));
        }
        return templates;

        function getFirstYAxisTemplate(trace) {
            return {
                showline: true,
                title: trace.yaxis_title,
                categoryorder: getCategoryOrder(trace),
                categoryarray: trace.categoryarray
            };
        }

        function getSecondYAxisTemplate(trace) {
            return {
                showline: true,
                title: trace.yaxis_title,
                categoryorder: getCategoryOrder(trace),
                categoryarray: trace.categoryarray,
                anchor: 'free',
                overlaying: 'y',
                side: 'left',
                position: 0.15
            };
        }

        function getCategoryOrder(trace) {
            if (trace.categoryarray !== undefined) {
                return 'array';
            } else {
                return 'trace';
            }
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

    getXAxisTemplate() {
        return {
            showline: true,
            title: this.xaxis_title
        };
    }

    getMarginLeft() {
        if (this.more_space_needed) {
            return 250;
        } else {
            return 60;
        }

    }

    getTwoTraceLayout(y_axis_templates) {
        return {
            xaxis: this.getXAxisTemplate(),
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
}