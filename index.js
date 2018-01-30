const fs = require('fs')
const extractTags = require('./utilities/extractTags');

const argsLength = process.argv.length-1;

if (argsLength < 3)
    throw new Error('not enough arguments')

const inputTag = process.argv[2];
const inputOption = applyInputOption(process.argv[3])
let inputLink;

if (argsLength > 3){
	if(isLink(process.argv[4]))
		inputLink = process.argv[4]
	else
		throw new Error('not a valid link')
}

				
fs.readFile('link.txt', 'utf-8', (err, link) => {
	if (err) throw err

	const request = require('request')
	
	request(inputLink || link, (error, response, html) => {
		const extract = extractTags(inputLink || link, html,inputTag)
		console.log(extract)
		if(inputOption.outputFile){
			fs.writeFile(inputOption.outputFile, extract, err => {
				if (err) throw err

				console.log(`saved in ${inputOption.outputFile}`)
			})
		}
	})
})

function applyInputOption(option){
	switch(option){
		case '-t':
			return {outputFile: 'extract'+ inputTag.toUpperCase() + Date.now() +'.txt'}
		case '-w':
			return {outputFile: 'extract'+ inputTag.toUpperCase() + Date.now() +'.html'}
		default:
			return {help: 'helpita', outputFile: ''}
	}
}

function isLink(link){
	if(link.search('http')!== -1)
		return true
	
	return false
}