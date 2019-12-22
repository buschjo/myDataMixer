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

        // last argument for multiple yaxis in case there is more than one category
        return new Graph(
            traces,
            id,
            'dates',
            label,
            moreSpaceNeeded,
            categories.length > 1
        );
    }

    createDefaultGraph(datastructure) {
        var traces;
        var multiple_yaxis;
        if (datastructure.datasource === datasources.STRONG) {
            traces = this.getTraces(datastructure.data, datastructure.datasource, datastructure.data.extracted_categories);
            multiple_yaxis = false;
        }else{
            traces = [this.getTrace(datastructure.data, datastructure.datasource, datastructure.datasource.default_graph_category)];
            multiple_yaxis = true;
        }

        return new Graph(
            traces, //traces as an array, so it can be iterated in graph.draw
            datastructure.id + '_default_graph',
            'dates',
            datastructure.labeltext + ' Default Graph',
            this.moreSpaceNeeded(datastructure.datasource),
            multiple_yaxis);
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