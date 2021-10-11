const NAME_PATTERN = RegExp('^[A-Z]{1}[a-z]{3,}$');
const DATE_PATTERN = RegExp('^\\d{4}[/](0[1-9]|1[0-2])[/](0[1-9]|[12][0-9]|3[01])$');


class EmployeePayrollData 
{

    constructor(...params) {
        this.name = params[0];
        this.profile = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];

}
    //getter and setters


    get name()
    {
        return this._name;
    }

    set name(name) 
    {
        if (NAME_PATTERN.test(name)) 
        {
            this._name = name;
        }
        else 
        {
            alert("Name is incorrect")
            throw "Name is Incorrect";

        }
    }

    get profile() 
    {
        return this._profile;
    }
    set profile(profile) 
    {
        this._profile = profile;

    } get gender() 
    {
        return this._gender;
    }

    set gender(gender) 
    {
        this._gender = gender;

    }
    get department() 
    {
        return this._department;
    }

    set department(department) 
    {
        this._department = department;

    }

    get salary() 
    {
        return this._salary;
    }

    set salary(salary) 
    {
        this._salary = salary;

    }

    get startDate() 
    {
        return this._startDate;
    }

    set startDate(startDate) 
    {
        if (DATE_PATTERN.test(startDate)) 
        {
            startDate = new Date(startDate)
            var now = new Date();
            var dateBefore30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            var start = dateBefore30Days
            var end = now;

            if (!(startDate > now)) 
            {
                if (startDate > start && startDate < end) 
                {
                    this._startDate = startDate;
                }

                else 
                {
                    alert("date invalid")
                    throw "date cannot be greater than today";
                }
            }
            else 
            {
                throw "date format is invalid"
            }

        }
    }

    get notes() 
    {
        return this._notes;
    }

    set notes(notes) 
    {
        this._notes = notes;

    }
    toString() 
    {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-us", options);
        return "name='" + this.name + ",profile= " + this.profile + ",gender= " + this.gender + ",department= " + this.department +
            ",salary=" + this.salary + ",startDate= " + employeeDate + ",notes= " + this.notes;
    }
}



function save(event) 
{
    var name = document.getElementById("name").value;

    var department = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++)
     {
        department.push(checkboxes[i].value)
    }
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var profile = document.querySelector('input[name="profile"]:checked').value;

    var salary = document.getElementById("salary").value;

    var daySelected = document.getElementById("day");
    var day = daySelected.options[daySelected.selectedIndex].value;
    var monthSelected = document.getElementById("month");
    var month = monthSelected.options[monthSelected.selectedIndex].value;
    var yearSelected = document.getElementById("year");
    var year = yearSelected.options[yearSelected.selectedIndex].value;

    var notes = document.getElementById("notes").value;

    var dateString = year + "/" + month + "/" + day;


    try 
    {

        let employeePayrollData = new EmployeePayrollData(name, profile, gender, department, salary, dateString, notes);
        alert(employeePayrollData.toString())
    }
    catch (e) 
    {
        console.error(e);
    }
}
