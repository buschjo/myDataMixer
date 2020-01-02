//code from pluralsight course
//sw should be handled as progressive enhancement
//see if it is actually available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        //location is important for the sw scope
        .then(r => console.log('SW Registered'))
        .catch(err => console.error('there is a problem', err));
}

// Import View

Vue.component('import', {
    data: function () {
        return {
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
            }]
        };
    }
});

Vue.component('file_importer', {
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

// Datalist View
//in components, data must be a function so that each instance has their own https://vuejs.org/v2/guide/components.html
Vue.component('category_list', {
    data: function () {
        return {
            imported_data: app.imported_data
        };
    }

});

Vue.component('category_list_element', {
    props: ['imported_data_structure'],
    methods: {
        showCategories: function () {
            var categories_container = document.getElementById(this.imported_data_structure.id + 'Categories');

            if (categories_container.style.display === "none") {
                categories_container.style.display = '';
            } else {
                categories_container.style.display = 'none';
            }
        },
        getCssClass: function (id) {
            return app.getCssClass(id);
        }
    },
    mounted: function () {
        var categories = this.imported_data_structure.datasource.categories;
        for (const category_name in categories) {
            const category = categories[category_name];
            if (category.is_extracted_category) {
                removeParentCategory(category_name, this.imported_data_structure.datasource);
                addSubcategories(this.imported_data_structure);
            }
        }

        function removeParentCategory(category_name, datasource) {
            var parent_category = document.getElementById(datasource.title + category_name).parentNode;
            var container = parent_category.parentNode;
            container.removeChild(parent_category);
        }

        function addSubcategories(imported_data_structure) {
            var categories_container = document.getElementById(imported_data_structure.id + 'Categories');
            imported_data_structure.data.extracted_categories.forEach(subCategory => {
                var newContainer = document.createElement('div');
                newContainer.appendChild(createHiddenElement(imported_data_structure.id));
                newContainer.appendChild(createCheckbox(subCategory));
                newContainer.appendChild(createLabel(subCategory));
                categories_container.appendChild(newContainer);
            });
        }

        function createHiddenElement(id) {
            var element = document.createElement('input');
            element.type = 'hidden';
            element.value = id;
            return element;
        }

        function createCheckbox(subCategory) {
            var newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newCheckbox.classList.add('form-check-input');
            newCheckbox.classList.add('datalist-category-option');
            newCheckbox.value = subCategory;
            // removes all spaces (/g is command to look for all occurences)
            var id = subCategory.replace(/ /g, '');
            newCheckbox.id = id;
            return newCheckbox;
        }

        function createLabel(subCategory) {
            var newLabel = document.createElement('label');
            newLabel.classList.add('form-check-label');
            var id = subCategory.replace(/ /g, '');
            newLabel.htmlFor = id;
            newLabel.innerHTML = subCategory;
            return newLabel;
        }
    }
});

Vue.component('graph_creator', {
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

// Graphs View

Vue.component('graph_card', {
    props: ['graph'],
    mounted: function () {
        this.graph.draw(document.getElementById(this.graph.graphid));
    }
});

// Settings View
Vue.component('settings', {
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

// Navigation components
Vue.component('navigation', {
    data: function () {
        return {
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
            }]
        };
    }
});

Vue.component('loose_navigation_element', {
    props: ['view', 'linktext'],
    template: "<button type='button' class='btn btn-outline-secondary btn-lg btn-block' id='createGraphButton' v-on:click='navigate(view)'>{{linktext}}</button>",
    methods: {
        navigate: function (view) {
            app.current_view = view;
        }
    }
});

Vue.component('navigation_element', {
    props: ['view'],
    template: "<div class='col'><button type='button' class='btn btn-link' v-on:click='navigate(view.viewid)'>{{view.label}}</button></div>",
    methods: {
        navigate: function (new_view) {
            app.current_view = new_view;
        }
    }
});

//Vue root app
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