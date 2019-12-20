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
        if (this.traces.length === 1) {
            return this.getOneTraceLayout(getFirstYAxisTemplate(this.traces[0]));
        } else if (this.traces.length === 2) {
            return this.getTwoTraceLayout(getFirstYAxisTemplate(this.traces[0]), getSecondYAxisTemplate(this.traces[1]));
        } else {
            return this.getThreeTraceLayout(getFirstYAxisTemplate(this.traces[0]), getSecondYAxisTemplate(this.traces[1]), getThridYAxisTemplate(this.traces[2]));
        }

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
                anchor: 'x',
                overlaying: 'y',
                side: 'right'
            };
        }

        function getThridYAxisTemplate(trace) {
            console.log();
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

    getOneTraceLayout(y_axis_template) {
        return {
            xaxis: {
                showline: true,
                title: this.xaxis_title
            },
            yaxis: y_axis_template,
            showlegend: true,
            legend: {
                x: 0.7,
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

    getMarginLeft() {
        if (this.more_space_needed) {
            return 250;
        } else {
            return 60;
        }

    }

    getTwoTraceLayout(first_axis_template, second_axis_template) {
        return {
            xaxis: {
                showline: true,
                title: this.xaxis_title
            },
            yaxis: first_axis_template,
            yaxis2: second_axis_template,
            showlegend: true,
            legend: {
                x: 0.7,
                y: 1.2
            },
            margin: {
                l: this.getMarginLeft(),
                b: 50,
                r: 60,
                t: 1,
            }
        };
    }

    getThreeTraceLayout(first_axis_template, second_axis_template, third_axis_template) {
        return {
            xaxis: {
                showline: true,
                title: this.xaxis_title,
                domain: [0.3, 1]
            },
            yaxis: first_axis_template,
            yaxis2: second_axis_template,
            yaxis3: third_axis_template,
            showlegend: true,
            legend: {
                x: 0.7,
                y: 1.2
            },
            margin: {
                l: 1,
                b: 50,
                r: 60,
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