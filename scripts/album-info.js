$(document).ready(function(){
	$('#album-title').text(album.title);
	$('img#album-cover-art').attr('src', album.albumArtUrl);
	$('a#album-link').attr('href', album.link)
					 .attr('target', '_new');
//we need artist name in .artist
	$('.artist').text(album.artist);
//we need general release info in #release-info would be text too inside a div
	$('#release-info').text(album.releaseInfo);

});