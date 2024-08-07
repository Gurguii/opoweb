<?php
namespace Utils;
	
	function generateHTML($content){
		return "<p><b>$content</b></p>";
	}

	function generateButton($id, $content, $class = null){
		return $class == null ? "<button id='$id'>$content</button>" : "<button id='$id' class='$class'>$content</button>";
	}
?>