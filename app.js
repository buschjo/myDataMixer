//code from pluralsight course
//sw should be handled as progressive enhancement
//see if it is actually available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        //location is important for the sw scope
        .then(r => console.log('SW Registered'))
        .catch(err => console.error('there is a problem', err));
}

Vue.component('import-button', {
    props: ['import_source'],
    methods: {
        importFile() {
            console.log("nothing imported");
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

Vue.component('navigation', {
    props: ['view'],
    methods: {
        changeView: function (new_view) {
            app.current_view = new_view;
        }
    }
});

Vue.component('graphcard', {
    props: ['graph'],
    template: "<svg style='width: 100%;'></svg>",
    methods: {
        drawGraph: function () {
            console.log('drawing');
        }
    },
    mounted: function () {

        // adapted from https://www.freecodecamp.org/news/how-to-create-your-first-bar-chart-with-d3-js-a0e8ea2df386/
        // this is adapted by me
        var parentContainer = document.getElementsByClassName('container-fluid')[0];
        var parentContainerWidth = window.getComputedStyle(parentContainer, null).getPropertyValue("width");
        var parentContainerPaddingLeft = window.getComputedStyle(parentContainer, null).getPropertyValue("padding-left");
        var parentContainerPaddingRight = window.getComputedStyle(parentContainer, null).getPropertyValue("padding-right");
        // \d searches for digits
        // + one or more instances
        // we expect the width to be in a format like "100px" so no need for the \g for global search, because the first match is expected to be the only match
        var parentWidth = parentContainerWidth.match(/\d+/);
        var parentPaddingtLeft = parentContainerPaddingLeft.match(/\d+/);
        var parentPaddingRight = parentContainerPaddingRight.match(/\d+/);
        var svgWidth = parentWidth - parentPaddingRight - parentPaddingtLeft;
        // end this is adapted by me
        
        var svgHeight = 300;

        var svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "bar-chart");


        var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

        var barPadding = 5;
        var barWidth = (svgWidth / dataset.length);

        var barChart = svg.selectAll("rect")
            .data(dataset)
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

//Create vue app with name "app" and data
var app = new Vue({
    el: '#app',
    data: {
        title: 'My Data Mix',
        message: 'No data yet',
        import_sources: [{
            id: 0,
            class: 'btn-clue',
            labelId: 'clueDataImport',
            labelText: 'Clue Data'
        }, {
            id: 1,
            class: 'btn-daylio',
            labelId: 'daylioDataImport',
            labelText: 'Daylio Data'
        }, {
            id: 2,
            class: 'btn-strong',
            labelId: 'strongDataImport',
            labelText: 'Strong Data'
        }],
        current_view: 'importView',
        views: [{
            id: 3,
            label: 'Import',
            viewCode: 'importView'
        }, {
            id: 4,
            label: 'Graphs',
            viewCode: 'graphView'
        }, {
            id: 5,
            label: 'Settings',
            viewCode: 'settingsView'
        }, {
            id: 6,
            label: 'About',
            viewCode: 'aboutView'
        }],
        graphs: [{
            id: 7
        }]
    }
});