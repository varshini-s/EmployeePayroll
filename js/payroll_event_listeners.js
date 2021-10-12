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

    startDate.addEventListener('input', function () {
        const day = document.querySelector('#day').value;
        const month = document.querySelector('#month').value;
        const year = document.querySelector('#year').value;
    
        const dateString = year + "/" + month + "/" + day;
      
        try {
            (new EmployeePayrollData()).startDate = dateString;
            dateError.textContent = "";

        }
        catch (e) {
            dateError.textContent = e;
        }
    });
})




