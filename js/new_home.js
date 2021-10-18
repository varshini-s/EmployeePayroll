var empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {

    if(site_properties.use_local_storage.match("true"))
    {
        getEmployeePayrollDataFromStorage();
    }
    else
    {
        getEmployeePayrollDataFromServer();
    }
});

const getEmployeePayrollDataFromStorage = () => {

    empPayrollList= localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];

        processEmployeePayrollDataResponse();
}


const  processEmployeePayrollDataResponse=()=>{

    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer=()=>{

    makeServiceCall("GET",site_properties.server_url,true)
    .then(responseText=>{
        empPayrollList=JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error=>{
        console.log("GET Error status: "+JSON.stringify(error));
        empPayrollList=[];
        processEmployeePayrollDataResponse();
    
    
    });
}


const createInnerHtml = () => {

    const headerHTML = "<th></th><th>Name</th> <th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) document.querySelector('#table-display').innerHTML = "";
    let innerHtml = `${headerHTML}`;

    for (const empPayrollData of empPayrollList) {

        innerHtml = `${innerHtml}
        
        <tr>
        <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>&#8377
        ${empPayrollData._salary}
        </td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
            <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete"
                    src="../assets/icons/delete-black-18dp.svg">
            <img id="${empPayrollData.id}" alt="edit" onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }

    document.querySelector('#table-display').innerHTML = innerHtml;
}


const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }

    return deptHtml;
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);

    if (!empPayrollData) return;
    const index = empPayrollList
        .map(empData => empData.id)
        .indexOf(empPayrollData.id);
    empPayrollList.splice(index, 1);

    if(site_properties.use_local_storage.match("true"))
    {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        createInnerHtml();

    }
    else
    {
        const deleteURL=site_properties.server_url+empPayrollData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
        .then(responseText=>{
            createInnerHtml();
        })
        .catch(error=>{
            console.log("DELETE Error status: "+JSON,stringify(error))
        })
    }
    if(empPayrollList.length==0)
    {
        localStorage.setItem("EmployeeID",0);

    }
    // document.querySelector(".emp-count").textContent = empPayrollList.length;
}

const update=(node)=>{
    let empPayrollData=empPayrollList.find(empData=>empData.id==node.id)
    if (!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}

function makeServiceCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,request)
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(methodType+" state changed called Ready state: "+xhr.readyState+" Status: "+xhr.status)
            if(xhr.readyState==4)
            {
                if(xhr.status.toString().match('^[2][0-9]{2}$'))
                {
                    resolve(xhr.responseText)
                }
                else if(xhr.status.toString().match('^[4,5][0-9]{2}$'))
                {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    });
                    console.log("XHR failed");
                }

            }
            
        }
        xhr.open(methodType,url,async);

        if(data)
        {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
        console.log(methodType+" Request sent to server ")
    
    });
}