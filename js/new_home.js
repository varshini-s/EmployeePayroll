var empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {

    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {

    const headerHTML = "<th></th><th>Name</th> <th>Gender</th>" +
        "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHTML}`;

    for (const empPayrollData of empPayrollList) {
        let startDate=getDateInGivenFormat(new Date(empPayrollData._startDate))

        innerHtml = `${innerHtml}
        
        <tr>
        <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>&#8377
        ${empPayrollData._salary}
        </td>
        <td>${startDate}</td>
        <td>
            <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete"
                    src="../assets/icons/delete-black-18dp.svg">
            <img name="${empPayrollData._id}" alt="edit" onclick="update(this)"
                    src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }

    document.querySelector('#table-display').innerHTML = innerHtml;
}


const getDateInGivenFormat =(date)=>{

    let day=date.getDate();
    let year=date.getFullYear();
    let month = "";

    switch(date.getMonth()+1)
    {
        case 1: month = "Jan";
            break;
        case 2: month = "Feb";
            break;
        case 3: month = "Mar";
            break;
        case 4: month = "Apr";
            break;
        case 5: month = "May";
            break;
        case 6: month = "Jun"; 
            break;
        case 7: month = "Jul";
            break;
        case 8: month = "Aug";
            break;
        case 9: month = "Sep";
            break;
        case 10: month = "Oct";
            break;
        case 11: month = "Nov";
            break;
        case 12: month = "Dec";
            break;
    }
    return day+" "+month+" "+year
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }

    return deptHtml;
}

