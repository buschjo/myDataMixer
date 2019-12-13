class GraphCreator {
    constructor(datastructure) {
        this.datastructure = datastructure;
    }

    createDefaultGraph() {
        var datasource = this.datastructure.datasource;
        var data = [];
        var dates = getDates(this.datastructure);

        var graphid = this.datastructure.id + '_default_graph';
        var xaxis_title = 'dates';
        var yaxis_title;
        var title = this.datastructure.labeltext + ' Default Graph';
        var more_space_needed = moreSpaceNeeded(datasource);
        yaxis_title = datasource.default_graph_category;
        var categoryarray = extractCategories(datasource);
        data = defaultGraphValues(this.datastructure, datasource.default_graph_category);

        return new Graph(data, dates, graphid, xaxis_title, yaxis_title, title, more_space_needed, categoryarray);

        function moreSpaceNeeded(datasource) {
            return datasource === datasources.STRONG;
        }

        function getDates(datastructure) {
            var dates = [];
            datastructure.data.forEach(el => {
                dates.push(el.unified_date);
            });
            return dates;
        }

        function extractCategories(datasource) {
            if (datasource.default_graph_category in datasource.categories) {
                // categoryarray = datasource.categories[datasource.default_graph_category].values;
                return extractOrderedCategoryNames(datasource.categories[datasource.default_graph_category].values);
            }
        }

        function extractOrderedCategoryNames(values) {
            categoryarray = [];
            for (var prop in values) {
                categoryarray.push(values[prop]);
            }
            return categoryarray;
        }

        function defaultGraphValues(alldata, category_name) {
            var values = [];
            alldata.data.forEach(el => {
                values.push(el[category_name]);
            });
            return values;
        }
    }
}