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
            //the onload event is fired when a read was successfull (full exp. https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
            reader.onload = function(event) {
                var converter = new dataConverter();
                dataobject = converter.convert(event.target.result, id);
                app.imported_data.push(dataobject);
            };
            reader.readAsText(selectedFile);
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
    props: ['imported_data']
});

Vue.component('graphcard', {
    props: ['graph'],
    methods: {
        drawGraph: function () {
            console.log('drawing');
        }
    },
    mounted: function () {
        
        // adapted from https://www.freecodecamp.org/news/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386/
        // this is adapted by me
        var svgWidth = calculateWidth();
        // end this is adapted by me
        
        var svgHeight = 300;
        
        //this is adapted by me
        var svg = d3.select("#"+this.graph.graphid)
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("class", "bar-chart");
        //end of adapted by me
        
        var barPadding = 5;
        var barWidth = (svgWidth / this.graph.dataset.length);
        
        var barChart = svg.selectAll("rect")
        .data(this.graph.dataset)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            return svgHeight - d;
        })
        .attr("height", function (d) {
            return d;
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
            var translate = [barWidth * i, 0];
            return "translate(" + translate + ")";
        });
        
        // end https://www.freecodecamp.org/news/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386/
    }
});

function calculateWidth(){
    var parentContainer = document.getElementsByClassName('main-content')[0];
    //width for the element minus padding
    return extractNumericPropertyValue(parentContainer, "width") - extractNumericPropertyValue(parentContainer, "padding-left") - extractNumericPropertyValue(parentContainer, "padding-right");
    
    function extractNumericPropertyValue(element, propertyName){
        // computedStyle because when the DOM is manipulated the normal style attribute is not reliable anymore
        var value = window.getComputedStyle(element, null).getPropertyValue(propertyName);
        // \d searches for digits
        // + one or more instances
        // we expect the width to be in a format like "100px" so no need for the \g for global search, because the first match is expected to be the only match
        return value.match(/\d+/);
    }
}

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
            class: 'btn-clue',
            labelid: 'clueData',
            labeltext: 'Clue Data'
        }, {
            class: 'btn-daylio',
            labelid: 'daylioData',
            labeltext: 'Daylio Data'
        }, {
            class: 'btn-strong',
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
        graphs: [{
            dataset: [80, 100, 56, 120, 180, 30, 40, 120, 160],
            graphid: 'examplegraph1'
        },
        {
            dataset: [90, 30, 120, 10, 80, 35, 60, 200, 33],
            graphid: 'examplegraph2'
        }],
        imported_data: []
    }
});