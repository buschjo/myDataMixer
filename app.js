//code from pluralsight course
//sw should be handled as progressive enhancement
//see if it is actually available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        //location is important for the sw scope
        .then(r => console.log('SW Registered'))
        .catch(err => console.error('there is a problem', err));
}

Vue.component('import_component', {
    props: ['import_source'],
    methods: {
        importFile(id) {
            var selectedFile = document.getElementById(id).files[0];
            var reader = new FileReader();
            // need to get the labeltext here because here 'this' is the component
            var labeltext = this.import_source.labeltext;
            //the onload event is fired when a read was successfull (full exp. https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
            reader.onload = function (event) {
                var converter = new DataConverter();
                dataobject = converter.convert(event.target.result, id, labeltext);
                createGraph(dataobject);
                app.imported_data.push(dataobject);
            };
            reader.readAsText(selectedFile);

            function createGraph(dataobject) {
                var creator = new GraphCreator(dataobject);
                app.graphs.push(creator.createDefaultGraph());
            }
        }
    },
    mounted: function () {
        //adapted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
        //hide the input elements
        //display = none instead of hidden or disabled because of screen readers 
        var fileInputs = document.getElementsByTagName('input');
        for (var input of fileInputs) {
            input.style.display = 'none';
        }
        //end https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
    }
});

Vue.component('create_graph_component', {
    template: "<button type='button' class='btn btn-secondary btn-lg btn-block' id='createGraphButton' v-on:click='openDataSelection()'>Create a Graph</button>",
    methods: {
        openDataSelection: function () {
            app.current_view = "listView";
        }
    }
});

Vue.component('datalist_component', {
    props: ['imported_data_structure'],
    methods: {
        showCategories: function () {
            var categories_container = document.getElementById(this.imported_data_structure.id + "Categories");
            if (categories_container.style.display === "none") {
                categories_container.style.display = '';
            } else {
                categories_container.style.display = 'none';
            }
        },
        getCssClass: function (id) {
            return app.getCssClass(id);
        }
    }
});

Vue.component('graphcard', {
    props: ['graph'],
    mounted: function () {
        this.graph.draw(document.getElementById(this.graph.graphid));
    }
});

Vue.component('navigation_component', {
    props: ['view'],
    template: "<div class='col'><button type='button' class='btn btn-link' v-on:click='changeView(view.viewid)'>{{view.label}}</button></div>",
    methods: {
        changeView: function (new_view) {
            app.current_view = new_view;
        }
    }
});

//Create vue app with name "app" and data
var app = new Vue({
    el: '#app',
    data: {
        title: 'My Data Mix',
        import_sources: [{
            cssclass: 'btn-clue',
            labelid: 'clueData',
            labeltext: 'Clue Data'
        }, {
            cssclass: 'btn-daylio',
            labelid: 'daylioData',
            labeltext: 'Daylio Data'
        }, {
            cssclass: 'btn-strong',
            labelid: 'strongData',
            labeltext: 'Strong Data'
        }],
        current_view: 'importView',
        views: [{
            label: 'Import',
            viewid: 'importView'
        }, {
            label: 'Graphs',
            viewid: 'graphView'
        }, {
            label: 'Settings',
            viewid: 'settingsView'
        }, {
            label: 'About',
            viewid: 'aboutView'
        }],
        graphs: [
            new Graph([80, 100, 56, 120],
                [new Date("2015-03-25"), new Date("2015-03-26"), new Date("2015-03-27"), new Date("2015-03-28")],
                'examplegraph1',
                'dates',
                'values',
                'Example Graph'),
            new Graph([12, 50, 100, 200, 80, 50, 10, 120],
                [new Date("2015-03-25"), new Date("2015-03-26"), new Date("2015-03-27"), new Date("2015-03-28"), new Date("2015-03-29"), new Date("2015-03-30"), new Date("2015-03-31"), new Date("2015-04-01")],
                'examplegraph2', 
                'dates',
                'values',
                'Example Graph'),
        ],
        imported_data: []
    },
    methods: {
        getCssClass: function (id) {
            for (var import_source of this.import_sources) {
                // === checks for equal value and equal type (== only checks value)
                if (import_source.labelid === id) {
                    return import_source.cssclass;
                }
            }
            //if no fitting css class can be found an empty string is returned, which means no added class to the html tag
            return "";
        }
    }
});