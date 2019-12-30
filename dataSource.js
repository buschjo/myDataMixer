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
                isMultipleValueCategory: true,
                values: {
                    FEVER: 'fever_ailment',
                    COLDFLU: 'cold_flu_ailment',
                    ALLERGY: 'allergy_ailment',
                    INJURY: 'injury_ailment'
                }
            },
            appointment: {
                title: 'Appointment',
                id: 'appointment',
                isMultipleValueCategory: true,
                values: {
                    GYN: 'ob_gyn_appointment',
                    VACATION: 'vacation_appointment',
                    DOCTOR: 'doctor_appointment',
                    DATE: 'date_appointment'
                }
            },
            collection_method: {
                title: 'Collection Method',
                id: 'collection_method',
                isMultipleValueCategory: true,
                values: {
                    TAMPON: 'tampon_collection_method',
                    PAD: 'pad_collection_method',
                    PANTYLINER: 'panty_liner_collection_method',
                    MENSTRUALCUP: 'menstrual_cup_collection_method'
                }
            },
            craving: {
                title: 'Craving',
                id: 'craving',
                isMultipleValueCategory: true,
                values: {
                    SWEET: 'sweet_craving',
                    SALTY: 'salty_craving',
                    CARBS: 'carbs_craving',
                    CHOCOLATE: 'chocolate_craving'
                }
            },
            digestion: {
                title: 'Digestion',
                id: 'digestion',
                isMultipleValueCategory: true,
                values: {
                    GREAT: 'great_digestion',
                    BLOATED: 'bloated',
                    NAUSEATED: 'nauseated',
                    GASSY: 'gassy'
                }
            },
            energy: {
                title: 'Energy',
                id: 'energy',
                isMultipleValueCategory: true,
                values: {
                    EXHAUSTED: 'exhausted',
                    LOW: 'low_energy',
                    HIGH: 'high_energy',
                    ENERGIZED: 'energized'
                }
            },
            exercise: {
                title: 'Exercise',
                id: 'exercise',
                isMultipleValueCategory: true,
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
                    EGGWHITE: 'egg_white',
                    STICKY: 'sticky',
                    CREAMY: 'creamy',
                    ATYPICAL: 'atypical'
                }
            },
            hair: {
                title: 'Hair',
                id: 'hair',
                isMultipleValueCategory: true,
                values: {
                    BAD: 'bad_hair',
                    OILY: 'oily_hair',
                    DRY: 'dry_hair',
                    GOOD: 'good_hair'
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
                    CHECKED: 'thread_checked',
                    INSERTED: 'inserted',
                    REMOVED: 'removed'
                }
            },
            medication: {
                title: 'Medication',
                id: 'medication',
                isMultipleValueCategory: true,
                values: {
                    PAIN: 'pain_medication',
                    COLD: 'cold_flu_medication',
                    ANTIBIOTIC: 'antibiotic_medication',
                    ANTIHISTAMINE: 'antihistamine_medication'
                }
            },
            // meditation: {
            //     // TODO: does not work
            //     title: 'Meditation',
            //     id: 'meditation',
            //     values: {
            //         DURATION: 'duration_in_minutes'
            //     }
            // },
            mental: {
                title: 'Mental',
                id: 'mental',
                isMultipleValueCategory: true,
                values: {
                    FOCUSED: 'focused',
                    DISTRACTED: 'distracted',
                    CALM: 'calm',
                    STRESSED: 'stressed'
                }
            },
            mood: {
                title: 'Mood',
                id: 'mood',
                isMultipleValueCategory: true,
                values: {
                    HAPPY: 'happy',
                    SENSITIVE: 'sensitive',
                    SAD: 'sad',
                    PMS: 'pms'
                }
            },
            motivation: {
                title: 'Motivation',
                id: 'motivation',
                isMultipleValueCategory: true,
                values: {
                    MOTIVATED: 'motivated',
                    UNMOTIVATED: 'unmotivated',
                    PRODUCTIVE: 'productive',
                    UNPRODUCTIVE: 'unproductive'
                }
            },
            pain: {
                title: 'Pain',
                id: 'pain',
                isMultipleValueCategory: true,
                values: {
                    CRAMPS: 'cramps',
                    HEADACHE: 'headache',
                    OVULATION: 'ovulation_pain',
                    BREASTS: 'tender_breasts'
                }
            },
            party: {
                title: 'Party',
                id: 'party',
                isMultipleValueCategory: true,
                values: {
                    DRINKS: 'drinks_party',
                    CIGARETTES: 'cigarettes',
                    HANGOVER: 'hangover',
                    BIGNIGHT: 'big_night_party'
                }
            },
            patch: {
                title: 'Patch',
                id: 'patch',
                values: {
                    REMOVED: 'removed',
                    REPLACED: 'replaced',
                    REMOVEDLATE: 'removed_late',
                    REPLACEDLATE: 'replaced_late'
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
                isMultipleValueCategory: true,
                values: {
                    GREAT: 'great_poop',
                    NORMAL: 'normal_poop',
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
                    REMOVEDLATE: 'removed_late',
                    REPLACEDLATE: 'replaced_late'
                }
            },
            sex: {
                title: 'Sex',
                id: 'sex',
                isMultipleValueCategory: true,
                values: {
                    UNPROTECTED: 'unprotected',
                    PROTECTED: 'protected',
                    HIGH: 'high_sex_drive',
                    WITHDRAWAL: 'withdrawal'
                }
            },
            skin: {
                title: 'Skin',
                id: 'skin',
                isMultipleValueCategory: true,
                values: {
                    GOOD: 'good_skin',
                    OILY: 'oily_skin',
                    DRY: 'dry_skin',
                    ACNE: 'acne_skin'
                }
            },
            sleep: {
                // TODO: not ordered and one value missing (0-3)
                title: 'Sleep',
                id: 'sleep',
                values: {
                    ZERO: '0_to_3_hours',
                    THREE: '3_to_6_hours',
                    SIX: '6_to_9_hours',
                    NINE: '9_or_more_hours'
                }
            },
            social: {
                title: 'Socioal',
                id: 'social',
                isMultipleValueCategory: true,
                values: {
                    CONFLICT: 'conflict_social',
                    SUPPORTIVE: 'supportive_social',
                    SOCIABLE: 'sociable',
                    WITHDRAWN: 'withdrawn_social'
                }
            },
            tags: {
                title: 'Tags',
                id: 'tags',
                isMultipleValueCategory: true
            },
            // temperature: {
            //     title: 'Temperature',
            //     // TODO: doesn't work yet
            //     id: 'bbt',
            //     values: {
            //         TEMPERATURE: 'temperature'
            //     }
            // },
            test: {
                title: 'Test',
                id: 'test',
                isMultipleValueCategory: true,
                values: {
                    OVULATIONPOS: 'ovulation_test_pos',
                    OVULATIONNEG: 'ovulation_test_neg',
                    PREGNANCYPOS: 'pregnancy_test_neg',
                    PREGNANCYNEG: 'pregnancy_test_pos'
                }
            }
            // weight: {
            //     // TODO: doesn't work yet
            //     title: 'Weight',
            //     id: 'weight',
            //     values: {
            //         WEIGHT: 'weight'
            //     }
            // }
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