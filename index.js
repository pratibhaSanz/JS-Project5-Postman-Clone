console.log("this is my project 6 from js course");

// utility function 
// 1. utility function to get DOM element from string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// intialize no of parameters 
let addedParamCount = 0;

// hide the parameters box intially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user click on parmas box , hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if the user click on json box , hide the parms box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// if the user click on plus button add more parameters 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div class="form- row g-3 my-2 ">
            <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
            <div class="col-md-4 ">
                <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
            </div>
            <div class="col-md-4  ">
                <input type="text" class="form-control " id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
            </div>
              <button class="btn btn-primary col-md-1 deleteParam"> - </button>
             </div>`;

    // convert the string node to DOM Element 
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // add an event listener to remove the - button  
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})

// if the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in the response box to check the patience of user
    document.getElementById('responseJsonText').value = "please wait....fetching response...";


    // fetching all the values enter by users 
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
   
  

    // if user has used params instead of json then show all the object 
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }

    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
     // log all the values in console for debugging 
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get evoke the fetch api to create a post request 
    if(requestType== 'GET'){
        fetch (url ,{
            method : 'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        })
    }

    else{
        fetch (url , {
            method : 'POST',
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value = text;
        })

    }
});

