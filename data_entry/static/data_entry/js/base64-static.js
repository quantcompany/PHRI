function getPioneerBase64Img(){
	console.log('getPioneerBase64Img');
	return "data:image/png;base64,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";
}