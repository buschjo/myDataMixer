class Graph {
    constructor(traces, graphid, xaxis_title, title, more_space_needed, multiple_yaxis_multiple_traces) {
        this.traces = traces;
        this.graphid = graphid;
        this.xaxis_title = xaxis_title;
        this.title = title;
        this.more_space_needed = more_space_needed;
        this.multiple_yaxis_multiple_traces = multiple_yaxis_multiple_traces;
    }

    draw(container) {
        Plotly.newPlot(
            container, 
            this.getTraces(this.multiple_yaxis_multiple_traces),
            this.getLayout(this.multiple_yaxis_multiple_traces),
            this.getConfig());
    }

    getTraces(multiple_yaxis_multiple_traces) {
        var yaxes = ['y1', 'y2', 'y3'];
        var traces = [];
        for (let index = 0; index < this.traces.length; index++) {
            const trace = this.traces[index];
            var plottable_trace = {
                x: trace.dates,
                y: trace.data,
                name: trace.yaxis_title, //this name will be used for the legend
                mode: 'markers',
            };
            if (multiple_yaxis_multiple_traces) {
                plottable_trace.yaxis = yaxes[index]; //assigns the trace to the correct y axis
            }
            traces.push(plottable_trace);
        }
        return traces;
    }

    getLayout(multiple_yaxis_multiple_traces) {
        var layout;
        if (!multiple_yaxis_multiple_traces) {
            layout = this.getOneAxisMultipleTraceLayout();
        } else {
            layout = this.getDefaultLayout();
        }

        if (this.more_space_needed) {
            layout.margin.l = 250;
        }
        return layout;
    }

    getOneAxisMultipleTraceLayout() {
        var layout = {
            xaxis: {
                showline: true,
                title: this.xaxis_title
            },
            yaxis: {
                showline: true,
            },
            showlegend: true,
            legend: {
                x: 0.7,
                y: 1.2
            },
            margin: {
                l: 60,
                b: 50,
                r: 10,
                t: 1,
            } //margin and legend values trial and error (https://plot.ly/javascript/setting-graph-size/)}
        };

        return layout;
    }

    getDefaultLayout() {
        var layout = {
            xaxis: {
                showline: true,
                title: this.xaxis_title
            },
            yaxis: {
                showline: true,
                title: this.traces[0].yaxis_title,
                categoryorder: this.getCategoryOrder(this.traces[0]),
                categoryarray: this.traces[0].categoryarray
            },
            showlegend: true,
            legend: {
                x: 0.7,
                y: 1.2
            },
            margin: {
                l: 60,
                b: 50,
                r: 10,
                t: 1,
            } //margin and legend values trial and error (https://plot.ly/javascript/setting-graph-size/)}
        };

        if (this.traces.length >= 2) {
            addTwoTraceOptions(layout, this.traces[1], this.getCategoryOrder);
        }

        if (this.traces.length >= 3) {
            addThreeTraceOptions(layout, this.traces[2], this.getCategoryOrder);
        }
        return layout;

        function addTwoTraceOptions(layout, trace, getCategoryOrder) {
            layout.yaxis2 = {
                showline: true,
                title: trace.yaxis_title,
                categoryorder: getCategoryOrder(trace),
                categoryarray: trace.categoryarray,
                anchor: 'x',
                overlaying: 'y',
                side: 'right'
            };
            layout.margin.r = 60;
        }

        function addThreeTraceOptions(layout, trace, getCategoryOrder) {
            layout.xaxis.domain = [0.3, 1];
            layout.yaxis3 = {
                showline: true,
                title: trace.yaxis_title,
                categoryorder: getCategoryOrder(trace),
                categoryarray: trace.categoryarray,
                anchor: 'free',
                overlaying: 'y',
                side: 'left',
                position: 0.15
            };
            layout.margin.l = 1;
        }

    }

    getCategoryOrder(trace) {
        if (trace.categoryarray !== undefined) {
            return 'array';
        } else {
            return 'trace';
        }
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