const NAME_PATTERN = RegExp('^[A-Z]{1}[a-z]{2,}$');


class EmployeePayrollData {

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

        startDate = new Date(startDate)
        var now = new Date();
        var dateBefore30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        var start = dateBefore30Days
        var end = now;

        if (!(startDate > now)) {
            if (startDate > start && startDate < end) {
                this._startDate = startDate;
            }

            else {
                throw "date invalid";
            }
        }
        else {
            throw "date cannot be future date";
        }


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
        return "name='" + this.name + ",profile= " + this.profilePic + ",gender= " + this.gender + ",department= " + this.department +
            ",salary=" + this.salary + ",startDate= " + employeeDate + ",notes= " + this.notes;
    }
}

