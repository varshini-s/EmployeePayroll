var empId;
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";

        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });


    const startDate=document.querySelector(".date-selector");
    const dateError = document.querySelector('.date-error');

    
        startDate.addEventListener('input', function () 
    {
        if(getInputValueById("#year")==""||getInputValueById("#month")==""||getInputValueById("#day")=="")
        {
            dateError.textContent = "Date Invalid";

        }
        else
        {

            let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
      
        try {
            (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
            dateError.textContent = "";

        }
        catch (e) {
            dateError.textContent = e;
        }
        }

        
    });
    
    
});


const save=()=>{

    try {

        let employeePayrollData= createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
        
    }
     catch (e) 
    {
        return;
        
    }
}

function createAndUpdateStorage(employeePayrollData)
{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList=[employeePayrollData]
    }

    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll=()=>{

    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeePayrollList==null)
    {
        empId=0;
    }
    else
    {
        empId=employeePayrollList.length;
    }

let employeePayrollData = new EmployeePayrollData();

try
{
    employeePayrollData.name =getInputValueById('#name');
}
catch(e)
{
    setTextValue('.text-error',e);
    throw e;
}

employeePayrollData.id=empId;
employeePayrollData.profilePic= getSelctedValues('[name=profile]').pop();
employeePayrollData.gender=getSelctedValues('[name=gender]').pop();
employeePayrollData.department=getSelctedValues('[name=department]');
employeePayrollData.salary=getInputValueById('#salary');
employeePayrollData.note=getInputValueById('#notes');
let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
employeePayrollData.startDate = new Date(Date.parse(date));
alert(employeePayrollData.toString());
return employeePayrollData;


}

const getSelctedValues =(propertyValue)=>{

    let allItems= document.querySelectorAll(propertyValue);
    let selectedItems=[];
    allItems.forEach(item=>{
        if(item.checked) selectedItems.push(item.value);
    });

    return selectedItems;
}

const getInputValueById =(id)=>{

    let value=document.querySelector(id).value;
    return value;
}

const resetForm=()=>{

    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
    setErrorField('.text-error',"");
    setErrorField('.date-error',"");
}

const unsetSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    })
}

const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}

const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}

const setErrorField=(id,value)=>{

    const element=document.querySelector(id);
    element.textContent=value
}