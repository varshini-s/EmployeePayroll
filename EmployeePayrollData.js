const idRegex =RegExp('^[1-9]\\d*$');
const nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
const salaryRegex =RegExp('^[1-9]\\d*$');
const genderRegex = RegExp('^[M|F]$');
const dateRegex=RegExp('^\\d{4}[/](0[1-9]|1[0-2])[/](0[1-9]|[12][0-9]|3[01])$');


class EmployeePayrollData
 {

    constructor(...params) 
    {
        this.id = params[0];
        this.name = params[1];
        this.salary = params[2];
        this.gender = params[3];
        this.startDate = params[4];

    }

    //getter and setters

    get id() 
    {
        return this._id;
    }

    set id(id) 
    {
        
        if (idRegex.test(id))
        {
            this._id = id;
        }
        else 
        {
            throw "id is Incorrect";
        }
    }
    get name() 
    {
        return this._name;
    }

    set name(name) 
    {
        if (nameRegex.test(name))
        {
            this._name = name;
        }
        else
        {
            throw  "Name is Incorrect";
        }
    }

    get salary() 
    {
        return this._salary;
    }

    set salary(salary) 
    {
        if (salaryRegex.test(salary))
        {
            this._salary = salary;
        }
        else 
        {
            throw "salary is Incorrect";
        }
    }
    get gender() 
    {
        return this._gender;
    }

    set gender(gender) 
    {
        if (genderRegex.test(gender))
        {
            this._gender = gender;
        }
        else 
        {
            throw "Gender is Incorrect";
        }
    }
    get startDate() 
    {
        return this._startDate;
    }

    set startDate(startDate) 
    {
        if(dateRegex.test(startDate))
        {
            startDate = new Date(startDate)
            var now = new Date();
            if (!(startDate > now)) 
            {
                this._startDate = startDate;

            }
            else 
            {
                throw "date cannot be greater than today";
            }
        }
        else
        {
            throw "date format is invalid"
        }
        
            
    }


    toString() 
    {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-us", options);
        return "id=" + this.id + ",name='" + this.name + ",salary=" + this.salary +
            ",gender= " + this.gender + ",startDate= " + employeeDate;
    }
}

{

    try 
    {
        let employeePayrollData = new EmployeePayrollData(1, "Mark", 20000, "M", "2013/01/16");
        console.log(employeePayrollData.toString());
        employeePayrollData.name = "Jo";
        console.log(employeePayrollData.toString());
        let newEmployeePayrollData = new EmployeePayrollData(1, "Terisa", 30000, "F", new Date());
        console.log(newEmployeePayrollData.toString());
    }
    catch (e)
    {
        console.error(e);
    }
}



