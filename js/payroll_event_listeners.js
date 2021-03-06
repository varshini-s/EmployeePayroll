
let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {

    const form=document.querySelector('.form');
    form.addEventListener('input',function(){
        document.getElementById("submitButton").disabled = false;

    })

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try 
        {
            checkName(name.value);
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


    const startDate = document.querySelector(".date-selector");
    const dateError = document.querySelector('.date-error');


    startDate.addEventListener('input', function () {
        if (getInputValueById("#year") == "" || getInputValueById("#month") == "" || getInputValueById("#day") == "") {
            dateError.textContent = "Date Invalid";

        }
        else {

            let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");

            try {
                checkStartDate(new Date(Date.parse(date)));
                dateError.textContent = "";

            }
            catch (e) {
                dateError.textContent = e;
            }
        }


    });

    document.querySelector('.cancelButton').href=site_properties.home_page;
    checkForUpdate();


});


const save = (event) => {

    event.preventDefault();
    event.stopPropagation();

    try 
    {
        setEmployeePayrollObject();
        if(site_properties.use_local_storage.match("true"))
        {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);

        }
        else
        {
            createOrUpdateEmployeePayroll();
        }
        

    }
    catch (e) 
    {
        return;

    }
}


const createOrUpdateEmployeePayroll=()=>{

    let postURL = site_properties.server_url;
    let methodCall="POST";
    if(isUpdate)
    {
        methodCall="PUT";
        postURL=postURL+employeePayrollObj.id.toString();
    }

    makeServiceCall(methodCall,postURL,true,employeePayrollObj)
    .then(responseText=>{
        resetForm();
        window.location.replace(site_properties.home_page);
    })
    .catch(error=>{
        throw error;
    })


}


const setEmployeePayrollObject = () => {

    if(!isUpdate && site_properties.use_local_storage.match("true"))
    {
        employeePayrollObj.id=createNewEmployeeId();
    }
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelctedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelctedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelctedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
    employeePayrollObj._startDate = date;

}


function createAndUpdateStorage() 
{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));


    if (employeePayrollList) 
    {
        let employeePayrollData = employeePayrollList
            .find(empData => empData.id == employeePayrollObj.id);

        if (!employeePayrollData) 
        {
            employeePayrollList.push(employeePayrollObj);
        }
        else 
        {
            const index = employeePayrollList
                .map(empData => empData.id)
                .indexOf(employeePayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj)
        }
    }

    else 
    {
        employeePayrollList = [employeePayrollObj]
    }

    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const createNewEmployeeId = () => {

    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}


const getSelctedValues = (propertyValue) => {

    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) selectedItems.push(item.value);
    });

    return selectedItems;
}

const getInputValueById = (id) => {

    let value = document.querySelector(id).value;
    return value;
}

const setForm = () => {

    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj.salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDateNumericForm(employeePayrollObj._startDate).split("/");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);

}


const resetForm = () => {

    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;

    setValue('#notes', '');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
    setErrorField('.text-error', "");
    setErrorField('.date-error', "");
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index
}

const setSelectedValues = (propertyValue, value) => {

    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;

    });

}

const setErrorField = (id, value) => {

    const element = document.querySelector(id);
    element.textContent = value
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

