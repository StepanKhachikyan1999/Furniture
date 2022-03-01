const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})


// const delBtnn = document.querySelectorAll(".delBtn")[0]

// delBtnn.addEventListener("click",function(id) {
//     alert("tay")
// })

// button

// const addInput = document.querySelector(".AddInput")

// addInput.addEventListener("click",function(e) {
//     e.preventDefault()
//     // call.createElement("input")
//     // addInput.after+=`
    
//     // <input type="file" name="avatar" multiple>
//     // `
//     addInput.after.innerHTML=(`<input type="file" name="avatar" multiple>`)
// })


// function addInput(){
//     var newdiv = document.createElement('div');
//     newdiv.id = dynamicInput[counter];
//     newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='file' name='avatar' multiple>'> <input type='file' value='-' onClick='removeInput("+dynamicInput[counter]+");'>";
//     document.getElementById('formulario').appendChild(newdiv);
//     counter++;
// }
  
//   function removeInput(id){
//     var elem = document.getElementById(id);
//     return elem.parentNode.removeChild(elem);
//   }