class dataConverter {
    convert(imported_data, id) {
        var data = {};
        if (id.includes('clue')) {
            data = this.extractRelevantJSON(imported_data);
        } else if (id.includes('daylio') || id.includes('strong')) {
            data = this.extractRelevantCSV(imported_data);
        }
        data.id = id;
        return data;
    }

    extractRelevantJSON(imported_data) {
        //new object
        var result = {};
        var all_info = JSON.parse(imported_data);
        //"data" is the key in the JSON for the data I need
        result.data = all_info.data;
        //I use the first object in "data" to get the categories, the keys are the categories
        result.categories = Object.keys(result.data[0]);
        return result;
    }

    extractRelevantCSV(imported_data) {
        var result = {};
        var splitdata = imported_data.split('\n');
        //first line has category info
        result.categories = splitdata[0].split(',');
        result.data = this.convertCSV(imported_data, result.categories);
        return result;
    }

    convertCSV(imported_data, categories) {
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