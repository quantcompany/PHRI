// riskTables.chads2 is an array
// every item in the array correspons to a possible
// chads2 score. so item 0 corresponds to a chads score of 0,
// item 1 correspons to a chads score of 1, etc.
var riskTables = {
    chads2: [
        {percentage: 1.9, ci: '1.2 - 3.0'},
        {percentage: 2.8, ci: '2.0 - 3.8'},
        {percentage: 4.0, ci: '3.1 - 5.1'},
        {percentage: 5.9, ci: '4.6 - 7.3'},
        {percentage: 8.5, ci: '6.3 - 11.1'},
        {percentage: 12.5, ci: '8.2 - 17.5'},
        {percentage: 18.2, ci: '10.5 - 27.4'}
    ],
    cha2: [
        {percentage: 0.0},
        {percentage: 1.3},
        {percentage: 2.2},
        {percentage: 3.2},
        {percentage: 4.0},
        {percentage: 6.7},
        {percentage: 9.6},
        {percentage: 12.5},
        {percentage: 15.2}
    ],
     hasbled: [
        {percentage: 1.13},
        {percentage: 1.02},
        {percentage: 1.88},
        {percentage: 3.74},
        {percentage: 8.70},
        {percentage: 12.5},
        {percentage: 12.5},
        {percentage: 12.5},
        {percentage: 12.5},
        {percentage: 12.5}
    ]
};


// this is just a nice way to group the risk-calculating functions.
// they use the riskTables from above. so, to find the stroke risk
// of a patient with a chads2 score of 4, you would write the following:

// risks.stroke.chads2Score(4).percentage
// according to the table, this will return 1.9

// to get the the CI:
// risks.stroke.chads2Score(4).ci

var risks = {
    stroke : {
        chads2Score: function(score){return riskTables.chads2[score]},
        cha2Score: function(score){return riskTables.cha2[score]}
    },

    bleeding: {
        hasbledScore: function(score){return riskTables.hasbled[score]}
    }
}
