class GraphCreator {

    createCustomGraph(categories) {
        var traces = [];
        var id = '';
        var label = '';
        var moreSpaceNeeded = false;

        categories.forEach(category => {
            traces.push(this.getTrace(category.datasource.data, category.datasource, category.categoryname));
            id += category.categoryname;
            label += (category.categoryname + ', ');
            moreSpaceNeeded = moreSpaceNeeded || this.moreSpaceNeeded(category.datasource);
        });

        // last argument, use default layout because it is not 'one y axis and multiple traces'
        return new Graph(
            traces,
            id,
            'dates',
            label,
            moreSpaceNeeded,
            true
        );
    }

    createDefaultGraph(datastructure) {
        var traces;
        var multiple_yaxis_multiple_traces;
        if (datastructure.datasource === datasources.STRONG) {
            // traces = this.getTraces(datastructure.data, datastructure.datasource, datastructure.data.extracted_categories);
            multiple_yaxis_multiple_traces = false;
        } else {
            // TODO: is this right?
            multiple_yaxis_multiple_traces = true;
        }
        traces = this.getTraces(datastructure.data, datastructure.datasource, [datastructure.datasource.default_graph_category]);
        return new Graph(
            traces, //traces as an array, so it can be iterated in graph.draw
            datastructure.id + '_default_graph',
            'dates',
            datastructure.labeltext + ' Default Graph',
            this.moreSpaceNeeded(datastructure.datasource),
            multiple_yaxis_multiple_traces);
    }

    getTraces(data, datasource, categories) {
        var traces = [];
        categories.forEach(category => {
            if (datasource.categories[category] && datasource.categories[category].is_extracted_category) {
                // concat existing traces with traces for extracted categories
                traces = traces.concat(this.getTraces(data, datasource, data.extracted_categories));
            } else {
                traces.push(this.getTrace(data, datasource, category));
            }
        });
        return traces;
    }

    getTrace(data, datasource, category_name) {
        var valuesAndDates = this.getValuesForCategory(data, category_name, datasource.categories[category_name]);
        return new GraphTrace(
            valuesAndDates[0],
            valuesAndDates[1],
            category_name,
            this.getOrderedValueOptionsForCategory(datasource, category_name)
        );
    }

    moreSpaceNeeded(datasource) {
        return datasource === datasources.STRONG;
    }

    getValuesForCategory(data, category_name, category) {
        var values = [];
        var dates = [];
        data.forEach(value => {
            // category can be undefined (-> evaluates to false) in case of extracted categories, that are not defined in the datasources list
            if (category && category.isMultipleValueCategory) {
                value[category_name].forEach(single_value => {
                    values.push(single_value);
                    dates.push(value.unified_date);
                });
                // only include values that are not undefined
            } else if (value[category_name]) {
                values.push(value[category_name]);
                dates.push(value.unified_date);
            }
        });
        return [values, dates];
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