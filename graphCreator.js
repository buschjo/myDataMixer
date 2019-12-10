class GraphCreator {
    constructor(data) {
        this.data = data;
    }

    createDefaultGraph() {
        switch(this.data.datasource){
            case datasources.CLUE:
                return clueDefaultGraph(this.data);
            case datasources.DAYLIO:
                return daylioDefaultGraph(this.data);
            case datasources.STRONG:
                return strongDefaultGraph(this.data);
        }

        function clueDefaultGraph(alldata) {
            console.log('create default clue graph');
            var data = [];
            var dates = [];
    
            var category_name = 'period';
    
            console.log(alldata);

            alldata.data.forEach(el => {
                dates.push(el.day);
                data.push(el[category_name]);
            });
    
            var graphid = alldata.id + '_default_graph';
            var xaxis_title = 'dates';
            var yaxis_title = category_name;
            var title = alldata.labeltext + ' Default Graph';
    
            return new Graph(data, dates, graphid, xaxis_title, yaxis_title, title);
        }

        function daylioDefaultGraph() {
            var data = [];
            var dates = [];
    
            var category_name = 'mood';
    
            dataobject.data.forEach(el => {
                dates.push(el.full_date);
                data.push(el[category_name]);
            });
    
            var graphid = dataobject.id + '_default_graph';
            var xaxis_title = 'dates';
            var yaxis_title = category_name;
            var title = dataobject.labeltext + ' Default Graph';
    
            return new Graph(data, dates, graphid, xaxis_title, yaxis_title, title);
        }

        function strongDefaultGraph() {
            // var data = [];
            // var dates = [];
    
            // var category_name = 'period';
    
            // dataobject.data.forEach(el => {
            //     dates.push(el.day);
            //     data.push(el[category_name]);
            // });
    
            // var graphid = dataobject.id + '_default_graph';
            // var xaxis_title = 'dates';
            // var yaxis_title = category_name;
            // var title = dataobject.labeltext + ' Default Graph';
    
            // return new Graph(data, dates, graphid, xaxis_title, yaxis_title, title);
        }
    }
}