// Tạp lớp đối tượng Staff
function Staff(account, name, email, pass, date, salary, position, time) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.time = time;
};
// Phương thức tính tổng lương nhân viên
Staff.prototype.calcTotalSalary = function() {
    var total = totalSalary(this.salary, this.position);
    return total;
};
// Phương thức xếp loại nhân viên
Staff.prototype.calcRank = function() {
    var showRank = getRank(this.time);
    return showRank;
}