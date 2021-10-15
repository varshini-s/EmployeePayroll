const NAME_PATTERN = RegExp('^([A-Z]{1}[a-z]{2,})( [A-Z]{1}[a-z]{2,})*$');


class EmployeePayrollData {

    get id()
    {
        return this._id;
    }

    set id(id)
    {
        this._id=id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (NAME_PATTERN.test(name)) {
            this._name = name;
        }
        else {
            throw "Name is Incorrect";

        }
    }

    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;

    } get gender() {
        return this._gender;
    }

    set gender(gender) {
        this._gender = gender;

    }
    get department() {
        return this._department;
    }

    set department(department) {
        this._department = department;

    }

    get salary() {
        return this._salary;
    }

    set salary(salary) {
        this._salary = salary;

    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {

        let now=new Date();
        if(startDate>now) throw 'Start date is a future Date!';
        var diff=Math.abs(now.getTime()-startDate.getTime());
        if(diff/(1000*60*80*24)>30)
            throw 'Start Date is beyond 30 Days!';
        this._startDate=startDate;


    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;

    }
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-us", options);
        return "id= "+this.id+"name='" + this.name + ",profile= " + this.profilePic + ",gender= " + this.gender + ",department= " + this.department +
            ",salary=" + this.salary + ",startDate= " + employeeDate + ",notes= " + this.notes;
    }
}

