module.exports = {
    ACGME: {
        parentSpecialities: ['Neurology','Internal Medicine'],
        childSpecialities: [
            {
                parentSpecialityName: 'Neurology',
                childSpecialities: ['Neuromuscular Medicine (Neurology)']
            }
        ],
        states: ['Massachusetts', 'Michigan'],
        stateShortCodes: [{
            stateName: 'Massachusetts',
            shortCode: 'MA'
        },
        {
            stateName: 'Michigan',
            shortCode: 'MI'
        }],
        cities: [
            {
                stateName: 'Massachusetts',
                cities: ['Boston', 'Burlington']
            },
            {
                stateName: 'Michigan',
                cities: ['Farmington Hills','Madison Heights' ]
            }
        ]
    },
    AOA: {
        parentSpecialities: ['Addiction Medicine', 'Anesthesiology', 'Cardiology'],
        childSpecialities: [],
        states: ['Kentucky', 'New York'],
        stateShortCodes: [{
            stateName: 'Kentucky',
            shortCode: 'KY'
        },
        {
            stateName: 'New York',
            shortCode: 'NY'
        }],
        cities: [
            {
                stateName: 'Kentucky',
                cities: ['Bowling Green']
            },
            {
                stateName: 'New York',
                cities: ['Brooklyn', 'East Meadow']
            }
        ]
    }
}
