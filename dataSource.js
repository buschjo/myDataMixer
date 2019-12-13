const datasources = {
    CLUE: {
        title: 'clue',
        date_field: 'day',
        default_graph_category: 'period',
        categories: {
            period: {
                values: {
                    HEAVY: 'heavy',
                    MEDIUM: 'medium',
                    LIGHT: 'light',
                    SPOTTING: 'spotting'
                },
                digestion: {
                    values: {
                        GREAT: 'great',
                        BLOATED: 'bloated',
                        NAUSEATED: 'nauseated',
                        GASSY: 'gassy'
                    }
                },
                energy: {
                    EXHAUSTED: 'exhausted',
                    LOW: 'low',
                    HIGH: 'high',
                    ENERGIZED: 'energized'
                },
                ailment: {},
                poop: {
                    GREAT: 'great',
                    NORMAL: 'normal',
                    CONSTIPATED: 'constipated',
                    DIARRHEA: 'diarrhea'
                },
                motivation: {
                    MOTIVATED: 'motivated',
                    UNMOTIVATED: 'unmotivated',
                    PRODUCTIVE: 'productive',
                    UNPRODUCTIVE: 'unproductive'
                },
                craving: {},
                collection_method: {},
                sex: {
                    UNPROTECTED: 'unprodtected',
                    PROTECTED: 'protected',
                    HIGH: 'high sex drive',
                    WITHDRAWAL: 'withdrawal'
                },
                appointment: {},
                social: {},
                party: {},
                hair: {
                    BAD: 'bad',
                    OILY: 'oily',
                    DRY: 'dry',
                    GOOD: 'good'
                },
                test: {},
                mood: {
                    HAPPY: 'happy',
                    SENSITIVE: 'sensitive',
                    SAD: 'sad',
                    PMS: 'pms'
                },
                medication: {},
                skin: {
                    GOOD: 'good',
                    OILY: 'oily',
                    DRY: 'dry',
                    ACNE: 'acne'
                },
                pain: {},
                exercise: {},
                mental: {
                    FOCUSED: 'focused',
                    DISTRACTED: 'distracted',
                    CALM: 'calm',
                    STRESSED: 'stressed'
                },
                sleep: {
                    0: '0 to 3 hours',
                    3: '3 to 6 hours',
                    6: '6 to 9 hours',
                    9: '9 hours or more'
                }
            }
        }
    },
    STRONG: {
        title: 'strong',
        date_field: 'Date',
        default_graph_category: 'ExerciseName',
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
        categories: {
            ExerciseName: {},
            Reps:{},
            Distance:{},
            Seconds:{},
        }
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
        categories: {
            mood: {
                values: {
                    AWFUL: 'awful',
                    BAD: 'bad',
                    MEH: 'meh',
                    GOOD: 'good',
                    RAD: 'rad'
                },
            },
            activities: {},
            weekday: {}
        }
    },
};

//https://blog.prototypr.io/enumeration-objects-in-javascript-ec06a83f39f2?gi=c85768b6d0d2
//freeze makes the object immutable
Object.freeze(datasources);