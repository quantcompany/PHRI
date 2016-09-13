// riskTables.chads2 is an array
// every item in the array correspons to a possible
// chads2 score. so item 0 corresponds to a chads score of 0,
// item 1 correspons to a chads score of 1, etc.
var riskTables = {
    chads2: [
        {percentage: 1.9, ci: {lower: 1.2, upper: 3.0}},
        {percentage: 2.8, ci: {lower: 2.0, upper: 3.8}},
        {percentage: 4.0, ci: {lower: 3.1, upper: 5.1}},
        {percentage: 5.9, ci: {lower: 4.6, upper: 7.3}},
        {percentage: 8.5, ci: {lower: 6.3, upper: 11.1}},
        {percentage: 12.5, ci: {lower: 8.2, upper: 17.5}},
        {percentage: 18.2, ci: {lower: 10.5, upper: 27.4}}
    ]
};


// this is just a nice way to group the risk-calculating functions.
// they use the riskTables from above. so, to find the stroke risk
// of a patient with a chads2 score of 4, you would write the following:

// calculateRisk.stroke.chads2Score(4).percentage
// according to the table, this will return 1.9

// to get the upper and lower bounds of the CI:
// calculateRisk.stroke.chads2Score(4).ci.lower
// calculateRisk.stroke.chads2Score(4).ci.upper

var risks = {
    stroke : {
        chads2Score: function(score){return riskTables.chads2[score]},
        cha2Score: function(score){return null},
    },

    bleeding: {
        hasbledScore: function(score){return null}
    }
}
