//code from pluralsight course
//sw should be handled as progressive enhancement
//see if it is actually available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        //location is important for the sw scope
        .then(r => console.log('SW Registered'))
        .catch(err => console.error('there is a problem', err));
}
//end of pluralsight code

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
            },
            {
                id: 1,
                class: 'btn-daylio',
                labelId: 'daylioDataImport',
                labelText: 'Daylio Data'
            },
            {
                id: 2,
                class: 'btn-strong',
                labelId: 'strongDataImport',
                labelText: 'Strong Data'
            }
        ],
        current_view: 'importView',
        views: [{
                id: 3,
                label: 'Import',
                viewCode: 'importView'
            },
            {
                id: 4,
                label: 'Graphs',
                viewCode: 'graphView'
            },
            {
                id: 5,
                label: 'Settings',
                viewCode: 'settingsView'
            },
            {
                id: 6,
                label: 'About',
                viewCode: 'aboutView'
            }
        ]
    }
});