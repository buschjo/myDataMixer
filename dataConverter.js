class dataConverter {
    convert(importedData, id) {
        var data = {};
        if (id.includes('clue')) {
            data = JSON.parse(importedData);
        } else if (id.includes('daylio') || id.includes('strong')) {
            data.data = this.convertCSV(importedData);
        }
        data.id = id;
        return data;
    }

    convertCSV(importedData) {
        var data = [];
        var splitdata = importedData.split('\n');
        var categories = splitdata[0].split(',');
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