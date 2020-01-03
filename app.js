//code from pluralsight course
//sw should be handled as progressive enhancement
//see if it is actually available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        //location is important for the sw scope
        .then(r => console.log('SW Registered'))
        .catch(err => console.error('Problem with service worker.', err));
}

// Import View

//  v-on:change listens to "change" event and calls importFile method defined in component import-button
// only components used by the router are declared as const
const Import = Vue.component('import', {
    template: "<div> <file_importer v-for='item in import_sources' v-bind:import_source='item' v-bind:key='item.labelid'></file_importer><loose_navigation_element linktext='Create Graph ->' target='categories'></loose_navigation_element></div>",
    data: function () {
        return {
            import_sources
        };
    }
});

Vue.component('file_importer', {
    template: "<div><label v-bind:for='import_source.labelid' v-bind:class='import_source.cssclass' class='btn btn-lg btn-block'>{{ import_source.labeltext }}</label><input type='file' v-bind:name='import_source.labelid' v-bind:id='import_source.labelid' v-on:change='importFile(import_source.labelid)'></div>",
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
        adjustColor(this.import_source);
        hideInputfields();

        function adjustColor(import_source) {
            var colorcode = import_source.colorcode;
            var classname = "." + import_source.cssclass;
            document.querySelectorAll(classname).forEach(function (p) {
                p.style.backgroundColor = colorcode;
                p.style.border = colorcode;
            });
        }

        function hideInputfields() {
            //adapted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
            //hide the input elements
            //display = none instead of hidden or disabled because of screen readers 
            var fileInputs = document.getElementsByTagName('input');
            for (var input of fileInputs) {
                input.style.display = 'none';
            }
            //end https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
        }
    }
});

// Datalist View
//in components, data must be a function so that each instance has their own https://vuejs.org/v2/guide/components.html
// id is used for styling 
const Categories = Vue.component('category_list', {
    template: "<div><template v-if='imported_data.length === 0'><p>No data is imported yet</p></template><template v-else><category_list_element v-for='item in imported_data' v-bind:imported_data_structure='item' v-bind:key='item.id'></category_list_element><graph_creator target='graphs' linktext='Create Graph from Selection'></graph_creator></template></div>",
    data: function () {
        return {
            imported_data: app.imported_data
        };
    }
});

Vue.component('category_list_element', {
    template: "<div><button type='button' class='btn btn-lg btn-block dropdown-toggle source-list-button' v-bind:class='getCssClass(imported_data_structure.id)' v-on:click='showCategories' v-bind:value='imported_data_structure.id'>{{imported_data_structure.labeltext}} </button><div class='form-check' style='display: none;' v-bind:id='getId()'><div v-for='category in imported_data_structure.categories'><input type='hidden' v-bind:value='imported_data_structure.id'><input class='form-check-input datalist-category-option' type='checkbox' v-bind:value='category.id' v-bind:id='imported_data_structure.datasource.title + category.id'><label class='form-check-label' v-bind:for='imported_data_structure.datasource.title + category.id'>{{category.title}}</label></div></div></div>",
    props: ['imported_data_structure'],
    methods: {
        getId: function () {
            return this.imported_data_structure.id + 'Categories';
        },
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
        },
    },
    mounted: function () {
        adjustColor(getImportSource(this.imported_data_structure.id));
        prepareCategorylist(this.imported_data_structure);

        // Get color codes for all ui elements
        function adjustColor(import_source) {
            var colorcode = import_source.colorcode;
            var classname = "." + import_source.cssclass;
            document.querySelectorAll(classname).forEach(function (p) {
                p.style.backgroundColor = colorcode;
                p.style.border = colorcode;
            });
        }

        function getImportSource(id) {
            return app.getImportSource(id);
        }

        // prepare category list
        function prepareCategorylist(imported_data_structure) {
            var categories = imported_data_structure.datasource.categories;
            for (const category_name in categories) {
                const category = categories[category_name];
                if (category.is_extracted_category) {
                    removeParentCategory(category_name, imported_data_structure.datasource);
                    addSubcategories(imported_data_structure);
                }
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
    props: ['target', 'linktext'],
    template: "<button type='button' class='btn btn-outline-secondary btn-lg btn-block' id='createGraphButton' v-on:click='createGraph()'>{{linktext}}</button>",
    methods: {
        routeTo: function (target) {
            routes.forEach(route => {
                if (route.name === target) {
                    this.$router.push(route);
                }
            });
        },
        createGraph: function () {
            var selectedCategories = getSelectedCategories();
            if (selectedCategories.length > 3) {
                alert('Please only select up to three categories.');
            } else {
                app.graphs.push(createGraph(getSelectedCategories()));
                this.routeTo(this.target);
            }

            function createGraph(selectedCategories) {
                var creator = new GraphCreator();
                return creator.createCustomGraph(selectedCategories);
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

// https://getbootstrap.com/docs/4.0/components/card/

// Graphs View
const Graphs = Vue.component('graphs', {
    template: "<div><template v-if='graphs.length === 0'><p>No data is imported yet</p></template><template v-else><graph_card v-for='item in graphs' v-bind:graph='item' v-bind:key='item.graphid'></graph_card></template></div>",
    data: function () {
        return {
            graphs: app.graphs
        };
    }
});


Vue.component('graph_card', {
    template: "<div class='card'><div class='card-body'><h5 class='card-title'>{{graph.title}}</h5><div v-bind:id='graph.graphid' style='width:100%;'></div></div></div>",
    props: ['graph'],
    mounted: function () {
        this.graph.draw(document.getElementById(this.graph.graphid));
    }
});

// Settings View
const Settings = Vue.component('settings', {
    template: "<div><div class='row'><div class='col'><button type='button' class='btn btn-outline-danger btn-lg btn-block' v-on:click='deleteData()'>Delete Imported Data</button><button type='button' class='btn btn-outline-danger btn-lg btn-block' v-on:click='deleteGraphs()'>Delete Graphs</button><button type='button' class='btn btn-danger btn-lg btn-block' v-on:click='deleteAllData()'>Delete Everything</button></div></div><color_changer></color_changer></div>",
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

Vue.component('color_changer', {
    data: function () {
        return {
            import_sources
        };
    },
    template: "<div class='row'><h5>Customize Color Code</h5><div class='col'><color_changer_element v-for='item in import_sources' v-bind:import_source='item' v-bind:key='item.labelid'></color_changer_element></div></div>",
});

Vue.component('color_changer_element', {
    template: "<div class='col'>Customize {{import_source.name}} Color Code <input type='color' v-bind:id='import_source.labelid'></div>",
    props: ['import_source'],
    mounted: function () {
        var colorPicker = document.getElementById(this.import_source.labelid);
        var local_import_source = this.import_source;
        colorPicker.addEventListener("change", function () {watchColorPicker(local_import_source);}, false);
        // getColor(this.import_source);

        function watchColorPicker(import_source) {
            var global_import_source = getImportSource(import_source.labelid);
            global_import_source.colorcode = event.target.value;
        }

        function getColor(import_source) {
            var colorcode = getImportSource(local_import_source.labelid).hexcode;
            colorPicker.value = colorcode;
        }

        function getImportSource(id) {
            return app.getImportSource(id);
        }
    }
});

const About = Vue.component('about', {
    template: "<div><p>This app was developed by Josefine S. Busch.</p><p>The app stores your imported data as data objects and graphs. All data is stored locally and is never transmitted to a remote server.</p><p>You can delete all your imported data and all graphs in settings.</p><loose_navigation_element linktext='Go to settings ->' target='settings' ></loose_navigation_element></div>"
});

Vue.component('loose_navigation_element', {
    props: ['target', 'linktext'],
    template: "<button type='button' v-on:click='routeTo(target)' class='btn btn-outline-secondary btn-lg btn-block' id='createGraphButton' >{{linktext}}</button>",
    methods: {
        routeTo: function (target) {
            routes.forEach(route => {
                if (route.name === target) {
                    this.$router.push(route);
                }
            });
        }
    }
});

const routes = [{
    name: 'home',
    path: '/',
    component: Import
}, {
    name: 'import',
    path: '/import',
    component: Import
}, {
    name: 'graphs',
    path: '/graphs',
    component: Graphs
}, {
    name: 'settings',
    path: '/settings',
    component: Settings
}, {
    name: 'about',
    path: '/about',
    component: About
}, {
    name: 'categories',
    path: '/categories',
    component: Categories
}];


const router = new VueRouter({
    routes // short for `routes: routes`
});

const import_sources = [{
    name: 'Clue',
    cssclass: 'btn-clue',
    colorcode: 'rgb(189, 0, 0)',
    hexcode: '#BD0000',
    labelid: 'clueData',
    labeltext: 'Clue Data'
}, {
    name: 'Daylio',
    cssclass: 'btn-daylio',
    colorcode: 'rgb(86, 0, 94)',
    hexcode: '#56005E',
    labelid: 'daylioData',
    labeltext: 'Daylio Data'
}, {
    name: 'Strong',
    cssclass: 'btn-strong',
    colorcode: 'rgb(9, 0, 136)',
    hexcode: '#090088',
    labelid: 'strongData',
    labeltext: 'Strong Data'
}];

//Vue root app
var app = new Vue({
    router,
    el: '#app', //identifier for vue internals
    data: {
        title: 'My Data Mix',
        import_sources: import_sources,
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
        },
        getImportSource(id) {
            var import_source;
            this.import_sources.forEach(source => {
                if (source.labelid === id) {
                    import_source = source;
                }
            });
            return import_source;
        }
    }
}).$mount('#app');