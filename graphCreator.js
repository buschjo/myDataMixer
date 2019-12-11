class GraphCreator {
    constructor(data) {
        this.data = data;
    }

    createDefaultGraph() {
        var data = [];
        var dates = [];
        this.data.data.forEach(el => {
            dates.push(el.unified_date);
        });
        var graphid = this.data.id + '_default_graph';
        var xaxis_title = 'dates';
        var yaxis_title;
        var title = this.data.labeltext + ' Default Graph';
        var more_space_needed = false;

        switch (this.data.datasource) {
            case datasources.CLUE.title:
                data = defaultGraphValues(this.data, 'period');
                yaxis_title = datasources.CLUE.default_graph_category;
                break;
            case datasources.DAYLIO.title:
                data = defaultGraphValues(this.data, 'mood');
                yaxis_title = datasources.DAYLIO.default_graph_category;
                break;
            case datasources.STRONG.title:
                data = defaultGraphValues(this.data, 'Exercise Name');
                yaxis_title = datasources.STRONG.default_graph_category;
                more_space_needed = true;
                break;
        }
        return new Graph(data, dates, graphid, xaxis_title, yaxis_title, title, more_space_needed);

        function defaultGraphValues(alldata, category_name) {
            var values = [];
            alldata.data.forEach(el => {
                values.push(el[category_name]);
            });
            return values;
        }
    }
}