const datasources = {
    CLUE: {
        title: 'clue',
        date_field: 'day',
        default_graph_category: 'period',
        standardize_date: function (date) {
            if (date != "") {
                //source: Clue date format: YYYY-MM-DDTHH:MM:SSZ
                var date_and_time = date.split('T');
                var date_pieces = date_and_time[0].split('-');
                var yyyy = date_pieces[0];
                var mm = date_pieces[1];
                var dd = date_pieces[2];
                var time_pieces = date_and_time[1].split(':');
                var hh = time_pieces[0];
                var min = time_pieces[1];
                //mm-1 because january == 0
                return new Date(Date.UTC(yyyy, mm-1, dd, hh, min));
            }
        },
        categories: {
            period: {
                values: {
                    HEAVY: 'heavy',
                    MEDIUM: 'medium',
                    LIGHT: 'light',
                    SPOTTING: 'spotting'
                }
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
                values: {
                    EXHAUSTED: 'exhausted',
                    LOW: 'low',
                    HIGH: 'high',
                    ENERGIZED: 'energized'
                }
            },
            ailment: {},
            poop: {
                values: {
                    GREAT: 'great',
                    NORMAL: 'normal',
                    CONSTIPATED: 'constipated',
                    DIARRHEA: 'diarrhea'
                }
            },
            motivation: {
                values: {
                    MOTIVATED: 'motivated',
                    UNMOTIVATED: 'unmotivated',
                    PRODUCTIVE: 'productive',
                    UNPRODUCTIVE: 'unproductive'
                }
            },
            craving: {},
            collection_method: {},
            sex: {
                values: {
                    UNPROTECTED: 'unprodtected',
                    PROTECTED: 'protected',
                    HIGH: 'high sex drive',
                    WITHDRAWAL: 'withdrawal'
                }
            },
            appointment: {},
            social: {},
            party: {},
            hair: {
                values: {
                    BAD: 'bad',
                    OILY: 'oily',
                    DRY: 'dry',
                    GOOD: 'good'
                }
            },
            test: {},
            mood: {
                values: {
                    HAPPY: 'happy',
                    SENSITIVE: 'sensitive',
                    SAD: 'sad',
                    PMS: 'pms'
                }
            },
            medication: {},
            skin: {
                values: {
                    GOOD: 'good',
                    OILY: 'oily',
                    DRY: 'dry',
                    ACNE: 'acne'
                }
            },
            pain: {},
            exercise: {},
            mental: {
                values: {
                    FOCUSED: 'focused',
                    DISTRACTED: 'distracted',
                    CALM: 'calm',
                    STRESSED: 'stressed'
                }
            },
            sleep: {
                values: {
                    0: '0 to 3 hours',
                    3: '3 to 6 hours',
                    6: '6 to 9 hours',
                    9: '9 hours or more'
                }
            },
            pill: {
                values: {
                    TAKEN: 'taken',
                    LATE: 'late',
                    DOUBLE: 'double',
                    MISSED: 'missed'
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
                var time_pieces = year_and_time[1].split(':');
                var hh = time_pieces[0];
                var min = time_pieces[1];
                //mm-1 because january == 0
                return new Date(Date.UTC(yyyy, mm-1, dd, hh, min));
            }
        },
        categories: {
            ExerciseName: {},
            Reps: {},
            Distance: {},
            Seconds: {},
        }
    },
    DAYLIO: {
        title: 'daylio',
        date_field: 'full_date',
        time_field: 'time',
        default_graph_category: 'mood',
        standardize_date: function (date, time) {
            //source: daylio date format: DD-MM-YY | time format HH:MM
            if (date != "") {
                var date_pieces = date.split('-');
                var dd = date_pieces[0];
                var mm = date_pieces[1];
                var yyyy = '20' + date_pieces[2];
                var hh = 0;
                var min = 0;
                if (time != "") {
                    var time_pieces = time.split(':');
                    hh = time_pieces[0];
                    min = time_pieces[1];
                }
                //mm-1 because january == 0
                return new Date(Date.UTC(yyyy, mm-1, dd, hh, min));
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