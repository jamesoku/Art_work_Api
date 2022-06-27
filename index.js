var api = 'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=';
var query = '&q=';


async function loadintoselect(url){
    var options = ''
    const response = await fetch(url);
    const data = await response.json();
    count = Object.keys(data.departments).length;
    var lists = document.getElementById("list");

    for (var i = 0; i < count; i++) {
        options += `<option value="`+data.departments[i].departmentId+`">`
        +data.departments[i].displayName+`</option>`
      }    
    var lists = document.getElementById("list");
    lists.innerHTML = `<select class="department" name="department" id="department">`
    + options + `</select>`; 

    document.querySelector('select')
}




loadintoselect("https://collectionapi.metmuseum.org/public/collection/v1/departments");
  // var api_url = api + id_no + query + keyword;

  
async function getimages(){
  
  document.getElementById("display").innerHTML = "";
  var id_no = document.querySelector('select').value;
  var keyword = document.getElementById('keyword').value;
  var url2 ="https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  var api_url = api + id_no + query + keyword;
  const response1 = await fetch(api_url);
  const data1 = await response1.json();
  console.log(data1.objectIDs[1])
  var i=0;
  var img_list ='';
  while (i < 20){
    var image_url= url2 + data1.objectIDs[i];
    const response2 = await fetch(image_url);
    if (response2.ok){
      const data2 = await response2.json()
      console.log(data2)
      console.log(data2.primaryImageSmall)
      if (data2.primaryImageSmall.length != 0){
          img_list += `<img src="`+data2.primaryImageSmall+`">`
      }

    }
    i++;
  }
console.log(img_list)
var final = `<ul>`+ img_list +`</ul>`
document.getElementById("display").innerHTML = final;


}