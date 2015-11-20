var artiBpmfs = '';





var updateChewing = function(){
	var nowchars = $("#文章").val().split('');

	var prev = null;
	var newchars = nowchars.map(function(o,ind){
		if(o == "\n" || o == "\r"){
			prev = o;
			return o;
		}

		if(o == " "){
			return " ";
		}

		if(ind == 0 || prev =="\n"){
			prev = o;					
			return window.chars[o] || "-";
		}else{
			prev = o;					
			return " " + (window.chars[o] || "-");
		}
	});

	$("#文章注音").val(newchars.join(""));
};



onArticleChange();
onArtiBpmfChange();

document.querySelector('#文章').addEventListener('keyup', onArticleChange);
document.querySelector('#文章注音').addEventListener('keyup', onArtiBpmfChange);

function onArticleChange(e) {
	updateChewing();
	var node = document.querySelector('article');


	var content = document.querySelector('#文章').value;	
	var ps = content.split('\n');

	node.innerHTML = '';

	var index = 0;
	for(var pi=0;pi<ps.length;++pi) {
		var ss = ps[pi].replace(/\s/g,'').split('');
		if(ss.length <= 0) {
			continue;
		}
		
		var pNode = document.createElement('p');
		node.appendChild(pNode);
		for(var si=0;si<ss.length;++si) {
			var sNode = document.createElement('span');
			pNode.appendChild(sNode);
			sNode.textContent = ss[si];
			sNode.index = index++;
			
			sNode.addEventListener('mouseenter', onWordSelect);
			sNode.addEventListener('touchstart', onWordSelect);
		}
	}
	onArtiBpmfChange();
}
function onArtiBpmfChange(e) {
	artiBpmfs = document.querySelector('#文章注音').value.trim().split(/\s+/);
}

function onWordSelect(e) {
	if(artiBpmfs.length <= 0) {
		bpmfNode.textContent = '';
		return;
	}
	document.querySelector('#單字注音').textContent = artiBpmfs[e.target.index % artiBpmfs.length];
}