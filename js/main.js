var websiteName=document.getElementById("websiteName");
var websiteURL=document.getElementById("websiteURL");
var tableBody=document.getElementById("tableBody");
var bookmarkNameRule=document.getElementById("bookmarkNameRule");
var bookmarkLinkRule=document.getElementById("bookmarkLinkRule");
var bookmarkNameScan=false;
var bookmarkLinkScan=false;
var bookmarkList;

if(localStorage.getItem("BookmarkArray")!=null){
    bookmarkList=JSON.parse(localStorage.getItem("BookmarkArray"));
    displayBookmarkArrayInBookmarkTable(bookmarkList);
}

else{
    bookmarkList=[];
}



function addBookmarkInputsToObject(name,link){
    var bookmarkItem={
        bookmarkName:name,
        bookmarkLink:link
    }
    return bookmarkItem;
}

// /////////////
function validateBookmarkLink(link){
    regex=/^((https|http):\/\/)?(w{3}\.)?\w+\.\w{3,}\/?(:\d{2,5})?(\/\w+)*$/;
  return regex.test(link);
}

function repeatScanBookmarkName(name){
    for(var i=0;i<bookmarkList.length;i++){
if(name==bookmarkList[i].bookmarkName){
    return false;
}
else{
    return true;
}
    }
    return true;
}

// ///////////////
function ScanBookmarkNameNumberOfCharacters(nameValue){
if(nameValue.length>=3){
    if(bookmarkList.length>0){
        for(var i=0;i<bookmarkList.length;i++){
            if(nameValue!=bookmarkList[i].bookmarkName){
                bookmarkNameRule.classList.replace("d-block","d-none");
                websiteName.classList.remove("input-invalid");
                websiteName.classList.add("input-valid");
                bookmarkNameScan=true;
                return true;
            }

            else{
                bookmarkNameRule.classList.replace("d-none","d-block");
    websiteName.classList.remove("input-valid");
    websiteName.classList.add("input-invalid");
            
    bookmarkNameScan=false;
    return false;
            }
        }
    }

    else{
        bookmarkNameRule.classList.replace("d-block","d-none");
        websiteName.classList.remove("input-invalid");
        websiteName.classList.add("input-valid");
        bookmarkNameScan=true;
        return true;
    }
    
    
}
else{
    bookmarkNameRule.classList.replace("d-none","d-block");
    websiteName.classList.remove("input-valid");
    websiteName.classList.add("input-invalid");
            
    bookmarkNameScan=false;
    return false;
}
}

// //////////////
function ScanBookmarkLinkUrlValidation(link){
    if(validateBookmarkLink(link)){
bookmarkLinkRule.classList.replace("d-block","d-none");
websiteURL.classList.remove("input-invalid");
websiteURL.classList.add("input-valid");
bookmarkLinkScan=validateBookmarkLink(link);
return validateBookmarkLink(link);
    }
    else{
        bookmarkLinkRule.classList.replace("d-none","d-block");
        websiteURL.classList.remove("input-valid");
    websiteURL.classList.add("input-invalid");
        bookmarkLinkScan=validateBookmarkLink(link); 
return validateBookmarkLink(link);
    }
}

// ///////////////
function addBookmarkItemToTable(){

if(repeatScanBookmarkName(websiteName.value)&&validateBookmarkLink(websiteURL.value) &&bookmarkNameScan&&(websiteURL.value !="")&&(websiteName.value !=""))
   { displayBookmarkArrayInBookmarkTable(addBookmarkArrayTOlocalStorage(addBookmarkObjectToBookmarkArray(addBookmarkInputsToObject(websiteName.value,websiteURL.value))));
    clearBookmarkItemDataAfterAdditionTOBookmarkTable();
   }

else if((repeatScanBookmarkName(websiteName.value)==false)&&(validateBookmarkLink(websiteURL.value)==true)&&(websiteURL.value !="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name repeated!", "error");
    websiteName.value="";

}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==true)&&(websiteURL.value !="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark link invalid!", "error");
    websiteURL.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==true)&&(websiteURL.value =="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark link empty!", "error");
    websiteURL.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==true)&&(bookmarkNameScan==false)&&(websiteURL.value !="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name less than 3 characters!", "error");
    websiteName.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==true)&&(bookmarkNameScan==false)&&(websiteURL.value !="")&&(websiteName.value =="")){
    sweetAlert("Oops...", "Bookmark name empty!", "error");
    websiteName.value="";
}


else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==false)&&(websiteURL.value !="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name less than 3 characters! and Bookmark link invalid", "error");
    websiteName.value="";
    websiteURL.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==false)&&(websiteURL.value =="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name less than 3 characters! and Bookmark link empty", "error");
    websiteName.value="";
    websiteURL.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==true)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==false)&&(websiteURL.value !="")&&(websiteName.value =="")){
    sweetAlert("Oops...", "Bookmark name empty and Bookmark link invalid", "error");
    websiteName.value="";
    websiteURL.value="";
}


else if((repeatScanBookmarkName(websiteName.value)==false)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==false)&&(websiteURL.value =="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name repeated and Bookmark link empty", "error");
    websiteName.value="";
    websiteURL.value="";
}

else if((repeatScanBookmarkName(websiteName.value)==false)&&(validateBookmarkLink(websiteURL.value)==false)&&(bookmarkNameScan==false)&&(websiteURL.value !="")&&(websiteName.value !="")){
    sweetAlert("Oops...", "Bookmark name repeated and Bookmark link invalid", "error");
    websiteName.value="";
    websiteURL.value="";
}

else{
    sweetAlert("Oops...", "Bookmark name  and Bookmark link empty!", "error");
    websiteName.value="";  
    websiteURL.value="";
} 
}

// /////////////////////
function addBookmarkObjectToBookmarkArray(bookmarkObject){
    bookmarkList.push(bookmarkObject);
    return bookmarkList;
}

function addBookmarkArrayTOlocalStorage(BookmarkArray){
localStorage.setItem("BookmarkArray",JSON.stringify(BookmarkArray));
return JSON.parse(localStorage.getItem("BookmarkArray"));
}

function displayBookmarkArrayInBookmarkTable(BookmarkArray){
    var container="";
    for(var i=0;i<BookmarkArray.length;i++){
        container+=`  
        <tr>
        <th scope="row" class="fw-normal">${i+1}</th>
        <td>${BookmarkArray[i].bookmarkName}</td>
        <td><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i><a class="text-decoration-none text-white" href="${BookmarkArray[i].bookmarkLink.toLowerCase().includes("https://")?BookmarkArray[i].bookmarkLink:"https://"+BookmarkArray[i].bookmarkLink}" target="_blank">Visit</a></button></td>
        <td><button onclick=" deleteBookmarkItemRow(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      </tr>
      `;
    }
    tableBody.innerHTML=container;
}
// /////////////
function deleteBookmarkItemRow(index){
    bookmarkList.splice(index,1);
    displayBookmarkArrayInBookmarkTable(addBookmarkArrayTOlocalStorage(bookmarkList));
}

function clearBookmarkItemDataAfterAdditionTOBookmarkTable(){
    websiteName.value="";
    websiteURL.value="";
    bookmarkNameScan=false;
 bookmarkLinkScan=false;
 websiteName.classList.remove("input-valid");
 websiteURL.classList.remove("input-valid");
   

}