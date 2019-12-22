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
                // event target is the file reader, in result is the read data
                dataobject = converter.convert(event.target.result, id, labeltext);
                createDefaultGraph(dataobject);
                app.imported_data.push(dataobject);
            };
            reader.readAsText(selectedFile);

            function createDefaultGraph(dataobject) {
                var creator = new GraphCreator();
                var graph = creator.createDefaultGraph(dataobject);
                app.graphs.push(graph);
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

Vue.component('open_data_selection_component', {
    template: "<button type='button' class='btn btn-outline-secondary btn-lg btn-block' id='createGraphButton' v-on:click='openDataSelection()'>Create a Graph &rarr;</button>",
    methods: {
        openDataSelection: function () {
            app.current_view = "listView";
        }
    }
});

//in components, data must be a function so that each instance has their own https://vuejs.org/v2/guide/components.html
Vue.component('datalist_component', {
    data: function () {
        return {
            imported_data: app.imported_data
        };
    }

});

Vue.component('datalist_element_component', {
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

Vue.component('create_graph_component', {
    template: "<button type='button' class='btn btn-outline-secondary btn-lg btn-block' v-on:click='createGraph()' id='createGraphButton'>Create Graph from Selection &rarr;</button>",
    methods: {
        createGraph: function () {
            createGraph(getSelectedCategories());
            app.current_view = "graphView";

            function createGraph(selectedCategories) {
                var creator = new GraphCreator();
                var graph = creator.createCustomGraph(selectedCategories);
                app.graphs.push(graph);
            }

            function getSelectedCategories() {
                //all checkboxes have this class
                var categoryToggles = document.getElementsByClassName('datalist-category-option');
                var categories = [];
                // gets all checked checkboxes and their datasources
                for (let index = 0; index < categoryToggles.length; index++) {
                    const toggle = categoryToggles[index];
                    if (toggle.checked) {
                        categories.push({
                            datasource: getDatasource(toggle),
                            categoryname: toggle.value
                        });
                    }
                }
                return categories;

                function getDatasource(toggle) {
                    // filter the correct datasource (as DataStructure) from the list of imported_data in root (app)
                    //the id of the data source is stored as value in the hidden element previous to the toggle (checkbox) element
                    //filter returns an array, but we only need the first match (there should only be one match)
                    return app.imported_data.filter(datastructre => datastructre.id === toggle.previousElementSibling.value)[0];
                }
            }
        }
    }
});

Vue.component('graphcard_component', {
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

Vue.component('settings_component', {
    methods: {
        deleteAllData: function () {
            app.graphs = [];
            app.imported_data = [];
            alert('All imported data and graphs were deleted.');
        },
        deleteGraphs: function () {
            app.graphs = [];
            alert('All graphs were deleted.');
        },
        deleteData: function () {
            app.imported_data = [];
            alert('All imported data was deleted.');
        }
    }
});

//Create vue app with name "app" and data
var app = new Vue({
    el: '#app', //identifier for vue internals
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
        graphs: [],
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