var empId;
let isUpdate = false;
let employeePayrollObj = {};
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


    const startDate = document.querySelector(".date-selector");
    const dateError = document.querySelector('.date-error');


    startDate.addEventListener('input', function () {
        if (getInputValueById("#year") == "" || getInputValueById("#month") == "" || getInputValueById("#day") == "") {
            dateError.textContent = "Date Invalid";

        }
        else {

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

    checkForUpdate();


});


const save = (event) => {

    event.preventDefault();
    event.stopPropagation();

    try 
    {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);

    }
    catch (e) 
    {
        return;

    }
}


const setEmployeePayrollObject = () => {
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
            .find(empData => empData._id == employeePayrollObj._id);

        if (!employeePayrollData) 
        {
            employeePayrollList.push(createEmployeePayrollData());
        }
        else 
        {
            const index = employeePayrollList
                .map(empData => empData._id)
                .indexOf(employeePayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(employeePayrollData._id))
        }
    }

    else 
    {
        employeePayrollList = [createEmployeePayrollData()]
    }

    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {

    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData._id = createNewEmployeeId();
    else employeePayrollData._id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try 
    {
        employeePayrollData.name = employeePayrollObj._name;
    }
    catch (e) 
    {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;

    try 
    {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));

    } catch (e) 
    {
        setTextValue('.date-error', e);
        throw e;
    }

    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {

    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const createEmployeePayroll = () => {

    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList == null) 
    {
        empId = 0;
    }
    else 
    {
        empId = employeePayrollList.length;
    }

    let employeePayrollData = new EmployeePayrollData();

    try 
    {
        employeePayrollData.name = getInputValueById('#name');
    }
    catch (e) 
    {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.id = empId;
    employeePayrollData.profilePic = getSelctedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelctedValues('[name=gender]').pop();
    employeePayrollData.department = getSelctedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
    employeePayrollData.startDate = new Date(Date.parse(date));
    alert(employeePayrollData.toString());
    return employeePayrollData;


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