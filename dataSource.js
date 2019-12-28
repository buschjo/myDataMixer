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
                return new Date(Date.UTC(yyyy, mm - 1, dd, hh, min));
            }
        },
        categories: {
            ailment: {
                title: 'Ailment',
                id: 'ailment',
                values: {
                    FEVER: 'fever',
                    //TODO: check export
                    COLDFLU: 'cold',
                    ALLERGY: 'allergy',
                    INJURY: 'injury'
                }
            },
            appointment: {
                title: 'Appointment',
                id: 'appointment',
                values: {
                    //TODO: check export
                    GYN: 'gyn',
                    VACATION: 'vacation',
                    DOCTOR: 'doctor',
                    DATE: 'date'
                }
            },
            collection_method: {
                title: 'Collection Method',
                id: 'collection_method',
                values: {
                    TAMPON: 'tampon',
                    PAD: 'pad',
                    //TODO: check export
                    PANTYLINER: 'panty liner',
                    //TODO: check export
                    MENSTRUALCUP: 'menstrual cup',
                }
            },
            craving: {
                title: 'Craving',
                id: 'craving',
                values: {
                    SWEET: 'sweet',
                    SALTY: 'salty',
                    CARBS: 'carbs',
                    CHOCOLATE: 'chocolate'
                }
            },
            digestion: {
                title: 'Digestion',
                id: 'digestion',
                values: {
                    GREAT: 'great',
                    BLOATED: 'bloated',
                    NAUSEATED: 'nauseated',
                    GASSY: 'gassy'
                }
            },
            energy: {
                title: 'Energy',
                id: 'energy',
                values: {
                    EXHAUSTED: 'exhausted',
                    LOW: 'low',
                    HIGH: 'high',
                    ENERGIZED: 'energized'
                }
            },
            exercise: {
                title: 'Exercise',
                id: 'exercis',
                values: {
                    RUNNING: 'running',
                    YOGA: 'yoga',
                    BIKING: 'biking',
                    SWIMMING: 'swimming'
                }
            },
            fluid: {
                title: 'Fluid',
                id: 'fluid',
                values: {
                    EGGWHITE: 'egg-white',
                    STICKY: 'sticky',
                    CREAMY: 'creamy',
                    ATYPICAL: 'atypical'
                }
            },
            hair: {
                title: 'Hair',
                id: 'hair',
                values: {
                    BAD: 'bad',
                    OILY: 'oily',
                    DRY: 'dry',
                    GOOD: 'good'
                }
            },
            injection: {
                title: 'Injection',
                id: 'injection',
                values: {
                    ADMINISTERED: 'administered'
                }
            },
            iud: {
                title: 'IUD',
                id: 'iud',
                values: {
                    //TODO: check export
                    CHECKED: 'thread checked',
                    INSERTED: 'inserted',
                    REMOVED: 'removed'
                }
            },
            medication: {
                title: 'Medication',
                id: 'medication',
                values: {
                    PAIN: 'pain',
                    //TODO: check export
                    COLD: 'cold',
                    ANTIBIOTIC: 'antibiotic',
                    ANTIHISTAMINE: 'anstihistamine'
                }
            },
            meditation: {
                title: 'Meditation',
                id: 'meditation',
                values: {
                    DURATION: 'duration_in_minutes'
                }
            },
            mental: {
                title: 'Mental',
                id: 'mental',
                values: {
                    FOCUSED: 'focused',
                    DISTRACTED: 'distracted',
                    CALM: 'calm',
                    STRESSED: 'stressed'
                }
            },
            motivation: {
                title: 'Motivation',
                id: 'motivation',
                values: {
                    MOTIVATED: 'motivated',
                    UNMOTIVATED: 'unmotivated',
                    PRODUCTIVE: 'productive',
                    UNPRODUCTIVE: 'unproductive'
                }
            },
            mood: {
                title: 'Mood',
                id: 'mood',
                values: {
                    HAPPY: 'happy',
                    SENSITIVE: 'sensitive',
                    SAD: 'sad',
                    PMS: 'pms'
                }
            },
            pain: {
                title: 'Pain',
                id: 'pain',
                values: {
                    CRAMPS: 'cramps',
                    HEADACHE: 'headache',
                    OVULATION: 'ovulation',
                    // TODO: check in export
                    BREASTS: 'tender breasts'
                }
            },
            party: {
                title: 'Party',
                id: 'party',
                values: {
                    DRINKS: 'drinks',
                    CIGARETTES: 'cigarettes',
                    HANGOVER: 'hangover',
                    // TODO: Check export
                    BIGNIGHT: 'big night'
                }
            },
            patch: {
                title: 'Patch',
                id: 'patch',
                values: {
                    REMOVED: 'removed',
                    REPLACED: 'replaced',
                    // TODO: check export
                    REMOVEDLATE: 'removed late',
                    // TODO: check export
                    REPLACEDLATE: 'replaced late'
                }
            },
            period: {
                title: 'Period',
                id: 'period',
                values: {
                    HEAVY: 'heavy',
                    MEDIUM: 'medium',
                    LIGHT: 'light',
                    SPOTTING: 'spotting'
                }
            },
            pill: {
                title: 'Pill',
                id: 'pill',
                values: {
                    TAKEN: 'taken',
                    LATE: 'late',
                    DOUBLE: 'double',
                    MISSED: 'missed'
                }
            },
            poop: {
                title: 'Poop',
                id: 'poop',
                values: {
                    GREAT: 'great',
                    NORMAL: 'normal',
                    CONSTIPATED: 'constipated',
                    DIARRHEA: 'diarrhea'
                }
            },
            ring: {
                title: 'Ring',
                id: 'ring',
                values: {
                    REMOVED: 'removed',
                    REPLACED: 'replaced',
                    // TODO: check export
                    REMOVEDLATE: 'removed late',
                    // TODO: check export
                    REPLACEDLATE: 'replaced late'
                }
            },
            sex: {
                title: 'Sex',
                id: 'sex',
                values: {
                    UNPROTECTED: 'unprodtected',
                    PROTECTED: 'protected',
                    HIGH: 'high sex drive',
                    WITHDRAWAL: 'withdrawal'
                }
            },
            skin: {
                title: 'Skin',
                id: 'skin',
                values: {
                    GOOD: 'good',
                    OILY: 'oily',
                    DRY: 'dry',
                    ACNE: 'acne'
                }
            },
            sleep: {
                title: 'Sleep',
                id: 'sleep',
                values: {
                    0: '0 to 3 hours',
                    3: '3 to 6 hours',
                    6: '6 to 9 hours',
                    9: '9 hours or more'
                }
            },
            social: {
                title: 'Socioal',
                id: 'social',
                values: {
                    CONFLICT: 'conflict',
                    SUPPORTIVE: 'supportive',
                    SOCIABLE: 'sociable',
                    WITHDRAWN: 'withdrawn'
                }
            },
            temperature: {
                title: 'Temperature',
                // TODO: does that work?
                id: 'bbt',
                values: {
                    TEMPERATURE: 'temperature'
                }
            },
            test: {
                title: 'Test',
                id: 'test',
                values: {
                    // TODO: check all of those in export
                    OVULATIONPOS: 'ovulation test pos',
                    OVULATIONNEG: 'ovulation test neg',
                    PREGNANCYPOS: 'pregnancy test pos',
                    PREGNANCYNEG: 'pregnancy test neg'
                }
            },
            weight: {
                title: 'Weight',
                id: 'weight',
                values: {
                    WEIGHT: 'weight'
                }
            }
        }
    },
    STRONG: {
        title: 'strong',
        date_field: 'Date',
        default_graph_category: 'exerciseName',
        standardize_date: function (date) {
            if (date != "") {
                //source: Strong date format: DD-MM-YY HH:MM
                //target: ISO Date Time (YYYY-MM-DDTHH:MM:SSZ)
                var date_pieces = date.split('-');
                var year_and_time = date_pieces[2].split(' ');
                var dd = date_pieces[0];
                var mm = date_pieces[1];
                var yyyy = '20' + year_and_time[0];
                var time_pieces = year_and_time[1].split(':');
                var hh = time_pieces[0];
                var min = time_pieces[1];
                //mm-1 because january == 0
                return new Date(Date.UTC(yyyy, mm - 1, dd, hh, min));
            }
        },
        categories: {
            exerciseName: {
                id: 'exerciseName',
                title: 'All Exercises',
                is_extracted_category: true,
                moreSpaceNeeded: true
            },
            exercised: {
                id: 'exercised',
                title: 'Did Exercise'
            }
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
                return new Date(Date.UTC(yyyy, mm - 1, dd, hh, min));
            }
        },
        categories: {
            mood: {
                title: 'Mood',
                id: 'mood',
                values: {
                    AWFUL: 'awful',
                    BAD: 'bad',
                    MEH: 'meh',
                    GOOD: 'good',
                    RAD: 'rad'
                },
            },
            activities: {
                title: 'Activities',
                id: 'activities',
                isMultipleValueCategory: true,
                moreSpaceNeeded: true
            }
        }
    },
};

//https://blog.prototypr.io/enumeration-objects-in-javascript-ec06a83f39f2?gi=c85768b6d0d2
//freeze makes the object immutable
Object.freeze(datasources);