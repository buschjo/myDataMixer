class DataConverter {
    convert(imported_data, id, labeltext) {
        var categories;
        var data;
        if (id.includes('clue')) {
            categories = this.extractCategoriesFromJson(imported_data);
            data = this.extractDatasetsFromJson(imported_data);
        } else if (id.includes('daylio') || id.includes('strong')) {
            categories = this.extractCategoriesFromCsv(imported_data);
            data = this.extractDatasetsFromCsv(imported_data, categories);
        }
        return new DataStructure(categories, data, id, labeltext);
    }

    extractCategoriesFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        //I use the first object in "data" to get the categories, the keys are the categories
        return Object.keys(all_info.data[0]);
    }

    extractDatasetsFromJson(imported_data) {
        var all_info = JSON.parse(imported_data);
        //"data" is the key in the JSON for the data I need
        return all_info.data;
    }

    extractCategoriesFromCsv(imported_data) {
        var splitdata = imported_data.split('\n');
        //first line has category info
        return splitdata[0].split(',');
    }

    extractDatasetsFromCsv(imported_data, categories) {
        var data = [];
        var splitdata = imported_data.split('\n');
        for (var j = 1; j < splitdata.length; j++) {
            var dataset = {};
            var values = splitdata[j].split(',');
            for (var i = 0; i < categories.length; i++) {
                dataset[categories[i]] = values[i];
            }
            data.push(dataset);
        }
        return data;
    }
}