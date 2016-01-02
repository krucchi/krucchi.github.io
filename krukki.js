var fs = require('fs');
var fse = require('fs-extra')

fse.removeSync('./_posts/*')
/*fse.removeSync('./img/thumb/*')
fse.removeSync('./img/large/*')*/

var chat = fs.readFileSync('chat.txt').toString().split("\n");


var filteredArray = chat.filter(function(line, index){

	return (line.indexOf("IMG-") > -1);

});

//console.log(filteredArray)
filteredArray.forEach(function(line, index){
	

	var splittedLine = line.split("\t");

	
	var imageData = splittedLine[5].split(":")[1];

	var author; 
	var caption; 

	if(splittedLine[2] === "out"){
		author = "Jacob";
	}else{
		author = splittedLine[5].split(":")[0];
	}

	var date = splittedLine[0];

	var time = splittedLine[1];
	time.replace(/:/g, "-");


	var imgName = line.match(/IMG-.*\.jpg/g)[0];

	if(splittedLine[5].split(":")[3]){
		caption = splittedLine[5].split(":")[3];
	}
	else{
		caption = " ";
	}

	var markdown = "---\n"
				   + "layout: default\n"
				   + "date: " + date + " " + time + "\n"
				   + "photo: " + imgName + "\n"
				   + "caption_header: " + caption + "\n"
				   + "caption: " + author + "\n"
				   + "---\n";
	//console.log(markdown);
	
	fs.writeFile("./_posts/" + date + "-" + time + ".markdown", markdown); 

	
	/*fse.copy('./all_images/' + imgName, './img/large/' + imgName, function (err) {
	  if (err) return console.error(err)
	  //console.log("success!")
	}) // copies filee));	

	fse.copy('./all_images/' + imgName, './img/thumb/' + imgName, function (err) {
	  if (err) return console.error(err)
	  //console.log("success!")
	}) // copies filee));
	*/

})

fs.readdir('./old_krukki', function(err, files){
	if (err) return console.error(err)
	files.forEach(function(file, index){

		var dateYYYYMMDD = file.split("-")[1];
		var date = dateYYYYMMDD.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$1-$2-$3');
		var time = "00-00-" + index;
		var author = "unknown";
		var caption = "unknown";

		var markdown = "---\n"
					   + "layout: default\n"
					   + "date: " + date + " " + time + "\n"
					   + "photo: " + file + "\n"
					   + "caption_header: " + caption + "\n"
					   + "caption: " + author + "\n"
					   + "---\n";

		fs.writeFile("./_posts/" + date + "-" + time + ".markdown", markdown); 
		
		//console.log(date)
	});
});