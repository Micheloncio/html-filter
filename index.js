const fs = require('fs')
const extractTags = require('./utilities/extractTags');

if (process.argv.length !== 3)
    throw new Error('not enough arguments')

var inputTag = process.argv[2];
    
fs.readFile('link.txt', 'utf-8', (err, link) => {
	if (err) throw err

	var request = require('request')

	request(link, (error, response, html) => {
		console.log(extractTags(html,inputTag))
	})
})
