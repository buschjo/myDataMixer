class DataConverter {
    constructor() {
        this.new_date_field_name = 'unified_date';
    }

    convert(imported_data, id, labeltext) {
        var categories;
        var data;
        var current_datasource;
        if (id.includes(datasources.CLUE.title)) {
            categories = this.extractClueCategoriesFromJson(imported_data);
            data = this.extractClueDatasetsFromJson(imported_data);
            current_datasource = datasources.CLUE;
        } else if (id.includes(datasources.DAYLIO.title)) {
            categories = this.extractCategoriesFromCsv(imported_data);
            data = this.extractDaylioDatasetsFromCsv(imported_data, categories);
            current_datasource = datasources.DAYLIO;
        } else if (id.includes(datasources.STRONG.title)) {
            categories = this.extractCategoriesFromCsv(imported_data);
            data = this.extractStrongDatasetsFromCsv(imported_data, categories);
            current_datasource = datasources.STRONG;
        }
        return new DataStructure(categories, data, id, labeltext, current_datasource);
    }

    extractClueCategoriesFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        var categories = [];
        all_info.settings.measurement_categories.forEach(category => {
            categories.push(category.category_key);
        });
        return categories;
    }

    extractClueDatasetsFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        //rename date attribute
        //"data" is the key in the JSON for the data I need
        all_info.data.forEach(element => {
            element[this.new_date_field_name] = element[datasources.CLUE.date_field];
            delete element[datasources.CLUE.date_field];
        });
        return all_info.data;
    }

    extractCategoriesFromCsv(imported_data) {
        var splitdata = imported_data.split('\n');
        //first line has category info
        return splitdata[0].split(',');
    }

    extractStrongDatasetsFromCsv(imported_data, categories) {
        return this.extractDatasetsFromCsv(imported_data, categories, datasources.STRONG);
    }

    extractDaylioDatasetsFromCsv(imported_data, categories) {
        return this.extractDatasetsFromCsv(imported_data, categories, datasources.DAYLIO);
    }

    //changes csv format to key value pairs
    extractDatasetsFromCsv(imported_data, categories, datasource) {
        var data = [];
        var lines = imported_data.split('\n');
        for (var j = 1; j < lines.length; j++) {
            if (!isEmptyLine(lines[j])) {
                data.push(this.standardize(datasource, createDataSet(lines[j])));
            }
        }
        return data;

        function isEmptyLine(line) {
            return line.startsWith(',,');
        }

        function createDataSet(line) {
            var dataset = {};
            var values = line.split(',');
            for (var i = 0; i < categories.length; i++) {
                //remove all spaces to make the keys better usable
                dataset[categories[i].replace(" ", "")] = values[i];
            }
            return dataset;
        }
    }

    standardize(datasource, dataset) {
        if ('time_field' in datasource) {
            dataset[this.new_date_field_name] = datasource.standardize_date(dataset[datasource.date_field], dataset[datasource.time_field]);
            delete dataset[datasource.time_field];
        } else {
            dataset[this.new_date_field_name] = datasource.standardize_date(dataset[datasource.date_field]);
        }
        delete dataset[datasource.date_field];
        return dataset;
    }

}