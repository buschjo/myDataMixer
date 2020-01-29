class DataStructure {
    constructor(categories, data, id, labeltext, datasource){
        this.categories = categories;
        this.data = data;
        this.id = id;
        this.labeltext = labeltext;
        this.datasource = datasource;
    }
}

class GraphTrace {
    constructor(data, dates, yaxis_title, categoryarray){
        this.data = data;
        this.dates = dates;
        this.yaxis_title = yaxis_title;
        this.categoryarray = categoryarray;
    }
}