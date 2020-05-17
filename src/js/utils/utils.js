export default function showToast(message){
	var toast = document.getElementById("toast");
	var toastTitle = message.title;
	var toastContent = message.content;


	var div = document.createElement("div");
	var h2 = document.createElement("h2");
	h2.textContent = toastTitle;
	div.appendChild(h2);
	div.appendChild(toastContent);
	toast.innerHTML = "";
	toast.appendChild(div);
	toast.className = "show";
	setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 10500);
	}
  
  
  
  function  noteNameFromNoteNumber(noteNumber){
    return noteNumber + "dingo"
    }
