const datasources = {
    CLUE: {
        title: 'clue',
        date_field: 'day',
        default_graph_category: 'period',
        included_categories: [
            'digestion',
            'energy',
            'ailment',
            'poop',
            'motivation',
            'craving',
            'collection_method',
            'sex',
            'appointment',
            'social',
            'party',
            'hair',
            'test',
            'mental',
            'medication',
            'skin',
            'pain',
            'exercise',
            'mood'
        ]
    },
    STRONG: {
        title: 'strong',
        date_field: 'Date',
        default_graph_category: 'Exercise Name',
        standardize_date: function (date_string) {
            if (date_string != "") {
                //source: Strong date format: DD-MM-YY HH:MM
                //target: ISO Date Time (YYYY-MM-DDTHH:MM:SSZ)
                var date_pieces = date_string.split('-');
                var year_and_time = date_pieces[2].split(' ');
                var dd = date_pieces[0];
                var mm = date_pieces[1];
                var yyyy = '20' + year_and_time[0];
                var time = 'T' + year_and_time[1] + ':00Z';
                // return new Date(yyyy + '-' + mm + '-' + dd + time);
                return yyyy + '-' + mm + '-' + dd + time;
            }
        },
        included_categories: ['Exercise Name', 'Reps', 'Distance', 'Seconds']
    },
    DAYLIO: {
        title: 'daylio',
        date_field: 'full_date',
        time_field: 'time',
        default_graph_category: 'mood',
        standardize_date: function (date, time) {
            //source: daylio date format: DD-MM-YY | time format HH:MM
            //target: ISO Date Time (YYYY-MM-DDTHH:MM:SSZ)
            if (date != "" || time != "") {
                var date_pieces = date.split('-');
                var dd = date_pieces[0];
                var mm = date_pieces[1];
                var yyyy = '20' + date_pieces[2];
                // return new Date(yyyy + '-' + mm + '-' + dd + "T" + time + ":00Z");
                return yyyy + '-' + mm + '-' + dd + 'T' + time + ':00Z';
            }
        },
        included_categories: ['activities', 'mood', 'weekday']
    },
};