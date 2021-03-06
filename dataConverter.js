class DataConverter {
    constructor() {
        this.new_date_field_name = 'unified_date';
    }

    convert(imported_data, id, labeltext) {
        var categories;
        var data;
        var current_datasource;
        if (id.includes(datasources.CLUE.title)) {
            categories = datasources.CLUE.categories;
            data = this.extractClueDatasetsFromJson(JSON.parse(imported_data));
            current_datasource = datasources.CLUE;
        } else if (id.includes(datasources.DAYLIO.title)) {
            categories = datasources.DAYLIO.categories;
            data = this.extractDaylioDatasetsFromCsv(imported_data);
            current_datasource = datasources.DAYLIO;
        } else if (id.includes(datasources.STRONG.title)) {
            categories = datasources.STRONG.categories;
            data = this.extractStrongDatasetsFromCsv(imported_data);
            current_datasource = datasources.STRONG;
        }
        return new DataStructure(categories, data, id, labeltext, current_datasource);
    }

    extractClueDatasetsFromJson(imported_data) {
        //rename date attribute
        //"data" is the key in the JSON for the data I need
        //add new date field (unified_date) to each dataset
        imported_data.data.forEach(element => {
            //creates a new property and adds the value of the old date field in the standardized form to it
            element[this.new_date_field_name] = datasources.CLUE.standardize_date(element[datasources.CLUE.date_field]);
            //deletes the old property
            delete element[datasources.CLUE.date_field];
        });
        return imported_data.data;
    }

    extractStrongDatasetsFromCsv(imported_data) {
        var columntitles = this.getCsvColumnTitles(imported_data);
        var extracted_categories_field_name = 'extracted_categories';
        return addCalculatedDatasets(this.extractDatasetsFromCsv(imported_data, columntitles, datasources.STRONG), datasources.STRONG.categories);

        function addCalculatedDatasets(data, categories) {
            var newData = data;
            newData.forEach(dataset => {
                dataset[categories.exercised.id] = categories.exercised.id;
            });
            return addExerciseAsCategories(newData);
        }

        function addExerciseAsCategories(data) {
            var newData = data;
            var exercises = [];
            data.forEach(dataset => {
                if (!exercises.includes(dataset.ExerciseName)) {
                    exercises.push(dataset.ExerciseName);
                }
            });
            newData[extracted_categories_field_name] = exercises;
            newData.forEach(dataset => {
                for (let index = 0; index < exercises.length; index++) {
                    const exercise = exercises[index];
                    if (dataset.ExerciseName === exercise) {
                        dataset[exercise] = exercise;
                    } else {
                        dataset[exercise] = undefined;
                    }
                }
            });
            return newData;
        }
    }

    getCsvColumnTitles(imported_data) {
        var splitdata = imported_data.split('\n');
        //first line has category info
        return splitdata[0].split(',');
    }

    extractDaylioDatasetsFromCsv(imported_data) {
        var columntitles = this.getCsvColumnTitles(imported_data);
        var extractedDatasets = this.extractDatasetsFromCsv(imported_data, columntitles, datasources.DAYLIO);

        return extractMultiValueCategories(extractedDatasets);

        function extractMultiValueCategories(datasets) {
            var enrichedData = datasets;
            // for each multivalue category, split the multiple values on '|'
            for (const category_name in datasources.DAYLIO.categories) {
                if (datasources.DAYLIO.categories.hasOwnProperty(category_name)) {
                    const category = datasources.DAYLIO.categories[category_name];
                    if (category.isMultipleValueCategory) {
                        enrichedData.forEach(dataset => {
                            dataset[category.id] = extractValues(dataset[category.id]);
                        });
                    }
                }
            }
            return enrichedData;

            function extractValues(dataset) {
                if (dataset != "") {
                    return dataset.split(' | ');
                }else{
                    return [];
                }
            }
        }
    }

    //changes csv format to key value pairs
    extractDatasetsFromCsv(imported_data, column_titles, datasource) {
        var data = [];
        var lines = imported_data.split('\n');
        for (var j = 1; j < lines.length; j++) {
            if (!isEmptyLine(lines[j])) {
                data.push(this.standardize(datasource, createDataset(lines[j])));
            }
        }
        return data;

        function isEmptyLine(line) {
            return line.startsWith(',,') || line === '';
        }

        function createDataset(line) {
            var dataset = {};
            var values = line.split(',');
            for (var i = 0; i < column_titles.length; i++) {
                //remove all spaces to make the keys better usable
                dataset[column_titles[i].replace(" ", "")] = values[i];
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