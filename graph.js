class Graph {
    constructor(traces, graphid, xaxis_title, title, more_space_needed, multiple_yaxis) {
        this.traces = traces;
        this.graphid = graphid;
        this.xaxis_title = xaxis_title;
        this.title = title;
        this.more_space_needed = more_space_needed;
        this.multiple_yaxis = multiple_yaxis;
    }

    draw(container) {
        var layout;
        var traces;
        if (!this.multiple_yaxis) {
            layout = {
                xaxis: {
                    showline: true,
                    title: this.xaxis_title
                },
                yaxis: {
                    showline: true
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

            if (this.more_space_needed) {
                layout.margin.l = 250;
            }
            traces = [];
            for (let index = 0; index < this.traces.length; index++) {
                const trace = this.traces[index];
                traces.push({
                    x: trace.dates,
                    y: trace.data,
                    name: trace.yaxis_title, //this name will be used for the legend
                    mode: 'markers',
                });
            }
        } else {
            layout = this.getLayout();
            traces = this.getTraces();
        }

        Plotly.newPlot(container, traces, layout, this.getConfig());
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

        var layout = {
            xaxis: {
                showline: true,
                title: this.xaxis_title
            },
            yaxis: {
                showline: true,
                title: this.traces[0].yaxis_title,
                categoryorder: getCategoryOrder(this.traces[0]),
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

        if (this.more_space_needed) {
            layout.margin.l = 250;
        }

        if (this.traces.length >= 2) {
            layout.yaxis2 = {
                showline: true,
                title: this.traces[1].yaxis_title,
                categoryorder: getCategoryOrder(this.traces[1]),
                categoryarray: this.traces[1].categoryarray,
                anchor: 'x',
                overlaying: 'y',
                side: 'right'
            };
            layout.margin.r = 60;
        }

        if (this.traces.length >= 3) {
            layout.xaxis.domain = [0.3, 1];
            layout.yaxis3 = {
                showline: true,
                title: this.traces[2].yaxis_title,
                categoryorder: getCategoryOrder(this.traces[2]),
                categoryarray: this.traces[2].categoryarray,
                anchor: 'free',
                overlaying: 'y',
                side: 'left',
                position: 0.15
            };
            layout.margin.l = 1;
        }

        return layout;

        function getCategoryOrder(trace) {
            if (trace.categoryarray !== undefined) {
                return 'array';
            } else {
                return 'trace';
            }
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