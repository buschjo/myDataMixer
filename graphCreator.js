class GraphCreator {
    constructor(datastructure) {
        this.datastructure = datastructure;
    }

    createDefaultGraph() {
        var datasource = this.datastructure.datasource;

        return new Graph([new GraphTrace(
                            defaultGraphValues(this.datastructure, datasource.default_graph_category),
                            getDates(this.datastructure),
                            datasource.default_graph_category,
                            extractCategories(datasource))],         //traces as an array, so it can be iterated in graph.draw
                        this.datastructure.id + '_default_graph',
                        'dates',
                        this.datastructure.labeltext + ' Default Graph',
                        moreSpaceNeeded(datasource));

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
            var categoryarray = [];
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