class GraphCreator {
    constructor(datastructure) {
        this.datastructure = datastructure;
    }

    createCustomGraph(categories) {
        return new Graph(
            this.getTraces(this.datastructure.data, this.datastructure.datasource, categories),
            this.datastructure.id + ' ' + categories.toString(),
            'dates',
            this.datastructure.labeltext + ' ' + categories.toString(),
            this.moreSpaceNeeded(this.datastructure.datasource)
        );
    }

    createDefaultGraph() {
        return new Graph(
            [this.getTrace(this.datastructure.data, this.datastructure.datasource, this.datastructure.datasource.default_graph_category)], //traces as an array, so it can be iterated in graph.draw
            this.datastructure.id + '_default_graph',
            'dates',
            this.datastructure.labeltext + ' Default Graph',
            this.moreSpaceNeeded(this.datastructure.datasource));
    }

    getTraces(data, datasource, categories) {
        var traces = [];
        categories.forEach(category => {
            traces.push(this.getTrace(data, datasource, category));
        });
        return traces;
    }

    getTrace(data, datasource, category_name) {
        return new GraphTrace(
            this.getValuesForCategory(data, category_name),
            this.getDates(data),
            category_name,
            this.getOrderedValueOptionsForCategory(datasource, category_name)
        );
    }

    getValuesForCategory(data, category_name) {
        var values = [];
        data.forEach(value => {
            values.push(value[category_name]);
        });
        return values;
    }

    moreSpaceNeeded(datasource) {
        return datasource === datasources.STRONG;
    }

    getDates(data) {
        var dates = [];
        data.forEach(el => {
            dates.push(el.unified_date);
        });
        return dates;
    }

    //values are 'heavy', 'light', 'medium' etc
    getOrderedValueOptionsForCategory(datasource, category_name) {
        // if an order for the values makes sense, the proper order can be extracted from the datasources list
        if (category_name in datasource.categories) {
            return extractOrderedCategoryNames(datasource.categories[category_name].values);
        }

        function extractOrderedCategoryNames(values) {
            var orderedvalues = [];
            for (var prop in values) {
                orderedvalues.push(values[prop]);
            }
            return orderedvalues;
        }
    }


}