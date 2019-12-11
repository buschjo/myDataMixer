class DataConverter {
    constructor() {
        this.date_field_name = 'unified_date';
    }

    convert(imported_data, id, labeltext) {
        var categories;
        var data;
        var current_datasource;
        if (id.includes(datasources.CLUE.title)) {
            categories = this.extractClueCategoriesFromJson(imported_data);
            data = this.extractClueDatasetsFromJson(imported_data);
            current_datasource = datasources.CLUE.title;
        } else if (id.includes(datasources.DAYLIO.title)) {
            categories = this.extractCategoriesFromCsv(imported_data);
            data = this.extractDaylioDatasetsFromCsv(imported_data, categories);
            current_datasource = datasources.DAYLIO.title;
        } else if (id.includes(datasources.STRONG.title)) {
            categories = this.extractCategoriesFromCsv(imported_data);
            data = this.extractStrongDatasetsFromCsv(imported_data, categories);
            current_datasource = datasources.STRONG.title;
        }
        return new DataStructure(categories, data, id, labeltext, current_datasource);
    }

    extractClueCategoriesFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        var categories = [];
        console.log(all_info);
        all_info.settings.measurement_categories.forEach(category => {
            categories.push(category.category_key);
        });

        return categories;
    }

    extractClueDatasetsFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        //"data" is the key in the JSON for the data I need

        //rename date attribute
        all_info.data.forEach(element => {
            var date = element[datasources.CLUE.date_field];
            element[this.date_field_name] = date;
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
        return this.extractDatasetsFromCsv(imported_data, categories, datasources.STRONG.date_field, datasources.STRONG.standardize_date);
    }

    extractDaylioDatasetsFromCsv(imported_data, categories) {
        return this.extractDatasetsFromCsv(imported_data, categories, datasources.DAYLIO.date_field, datasources.DAYLIO.standardize_date);
    }

    extractDatasetsFromCsv(imported_data, categories, date_field, standardize_date) {
        var data = [];
        var splitdata = imported_data.split('\n');
        for (var j = 1; j < splitdata.length; j++) {
            var dataset = {};
            var values = splitdata[j].split(',');
            for (var i = 0; i < categories.length; i++) {
                if (categories[i] === date_field) {
                    dataset[this.date_field_name] = standardize_date(values[i]);
                } else {
                    dataset[categories[i]] = values[i];
                }
            }
            data.push(dataset);
        }
        return data;
    }

}