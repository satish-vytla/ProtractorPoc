let userDetails = credentials.users[browser.params.env].Examinee["0"];
module.exports = {
 dashBoardTitles = [userDetails.accountName,
    'Exam Registration',
    'Quick Links',
    'Exam History (since January 2018)',
    'Practice with Official MCAT® Prep Products',
    'Service Requests'
]
}
