// Short Hand cú pháp dom id
function getId(id) {
    return document.getElementById(id);
}

// Tạo mảng chứa các phần tử là object staff
var staffs = [];
init();

// Function init sẽ được gọi đầu tiên khi chương trình chạy
function init() {
    staffs = JSON.parse(localStorage.getItem("Staffs")) || [];
    for (var i = 0; i < staffs.length; i++) {
        var staff = staffs[i];
        staffs[i] = new Staff(
            staff.account,
            staff.name,
            staff.email,
            staff.pass,
            staff.date,
            staff.salary,
            staff.position,
            staff.time,
        );
    }
    display(staffs);
}


// Function DOM các value từ input
function getStaff() {
    // DOM
    var account = getId("tknv").value;
    var name = getId("name").value;
    var email = getId("email").value;
    var pass = getId("password").value;
    var date = getId("datepicker").value;
    var salary = +getId("luongCB").value;
    var position = getId("chucvu").value;
    var time = +getId("gioLam").value;
    // Tạo đối tượng staff từ lớp đói tượng
    var staff = new Staff(account, name, email, pass, date, salary, position, time);
    return staff;
};


// Function thêm nhân viên
function addStaff() {
    // Tạo biến gọi hàm DOM
    var staff = getStaff();
    // Gọi hàm kiểm tra hợp lệ, nếu isValid là false thì ngưng chạy các hàm phía dưới
    var isValid = validation();
    if (!isValid) {
        return;
    }
    // Thêm phần tử là đối tượng staff vào mảng staffs
    staffs.push(staff);
    // Lưu dữ liệu xuống Local Storage
    localStorage.setItem("Staffs", JSON.stringify(staffs));
    // Gọi hàm hiển thị và hiển thị kết quả ra table
    display(staffs);
    // Gọi hàm resetForm để không bị lưu lại giá trị ở ô input sau khi thêm staff
    resetForm();
};


// Function hiển thị ra table
function display(staffs) {
    // Tạo biến gán giá trị là 1 chuỗi rỗng
    var show = "";
    // Duyệt mảng
    for (var i = 0; i < staffs.length; i++) {
        var staff = staffs[i];
        // Với mỗi lần show thì thêm 1 thẻ tr và từng thẻ td chứa các thông tin của staff
        show += `
            <tr>
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td>${staff.email}</td>
                <td>${staff.date}</td>
                <td>${staff.position}</td>
                <td>${staff.calcTotalSalary()}</td>
                <td>${staff.calcRank()}</td>
                <td>
                    <button class="btn btn-info" onclick="editStaff('${staff.account}')" data-toggle="modal"
                    data-target="#myModal">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStaff('${staff.account}')">Delete</button>
                </td>
            </tr>
        `
    }
    // Hiển thị nội dung ra table
    getId("tableDanhSach").innerHTML = show;
};


// Function tìm kiếm nhân viên theo loại (xuất sắc, giởi, khá, trung bình)
function searchStaff() {
    // Dom input search lấy value
    var searchValue = getId("searchType").value;
    searchValue = searchValue.toLowerCase();
    // Tạo mảng mới hiển thị kết quả sau khi tìm
    var newStaff = [];
    // Duyệt mảng
    for (var i = 0; i < staffs.length; i++) {
        // Lấy ra đối tượng muốn tìm
        var staff = staffs[i];
        var staffRank = staff.calcRank().toLowerCase();
        if (staffRank.indexOf(searchValue) !== -1) {
            newStaff.push(staff);
        }
    }
    // Hiển thị mảng mới sau khi tìm
    display(newStaff);
}


// Function xóa 1 nhân viên
function deleteStaff(staffAccount) {
    // Tạo biến gọi hàm findIndex, tìm chỉ mục của nhân viên muốn xóa
    var index = findIndex(staffAccount);
    // Nhân viên có chỉ mục khác -1 thì thực hiện xóa
    if (staffs[index] !== -1) {
        staffs.splice(index, 1);
        // Lưu dữ liệu xuống Local Storage
        localStorage.setItem("Staffs", JSON.stringify(staffs));
        // Hiển thì lại giao diện mới
        display(staffs);
    }
};


// Function chỉnh sửa thông tin nhân viên
function editStaff(staffAccount) {
    // Tìm chỉ mục của nhân viên muốn chỉnh sửa
    var index = findIndex(staffAccount);
    // Lấy ra nhân viên muốn chỉnh sửa
    var staff = staffs[index];
    // Đưa thông tin của student này lên giao diện
    getId("tknv").value = staff.account;
    getId("name").value = staff.name;
    getId("email").value = staff.email;
    getId("password").value = staff.pass;
    getId("datepicker").value = staff.date;
    getId("luongCB").value = staff.salary;
    getId("chucvu").value = staff.position;
    getId("gioLam").value = staff.time;

    // Khi hiển thị lên giao diện thì disabled input tài khoản và button thêm nhân viên
    getId("tknv").disabled = true;
    getId("btnThemNV").disabled = true;
};


// Function cập nhật nhân viên
function updateStaff() {
    // Gọi hàm kiểm tra hợp lệ, nếu isValid là false thì ngưng chạy các hàm phía dưới
    var isValid = validation();
    if (!isValid) {
        return;
    }
    // Khi cập nhật thì hiển thị lại input tài khoản và button thêm nhân viên
    getId("tknv").disabled = false;
    getId("btnThemNV").disabled = false;
    // Gọi hàm DOM lấy giá trị value và khởi tạo 1 đối tượng nhân viên
    var staff = getStaff();
    // Tìm chỉ mục của nhân viên muốn cập nhật
    var index = findIndex(staff.account);
    // Cập nhật
    staffs[index] = staff;
    // Lưu dữ liệu xuống Local Storage
    localStorage.setItem("Staffs", JSON.stringify(staffs));
    // Hiển thị lại giao diện table mới
    display(staffs);
    resetForm();
};


// Function tìm vị trí index của phần tử là đối tượng staff trong mảng staffs
function findIndex(staffAccount) {
    var index = -1;
    for (var i = 0; i < staffs.length; i++) {
        // Kiếm phần tử staff trong mảng có account khớp với staffAccount, nếu tìm thấy thì break ngừng vòng lặp
        if (staffs[i].account === staffAccount) {
            index = i;
            break;
        }
    }
    return index;
}


// Function reset form input
function resetForm() {
    getId("tknv").value = "";
    getId("name").value = "";
    getId("email").value = "";
    getId("password").value = "";
    getId("datepicker").value = "";
    getId("luongCB").value = "";
    getId("chucvu").value = "Chọn chức vụ";
    getId("gioLam").value = "";
};


// Function tính tổng lương
function totalSalary(salary, position) {
    var total = 0;
    if (position === "Sếp") {
        total = salary * 3;
    }
    if (position === "Trưởng phòng") {
        total = salary * 2;
    }
    if (position === "Nhân viên") {
        total = salary;
    }
    return total.toLocaleString();
};


// Function xếp loại chức vụ staff
function getRank(time) {
    var showRank = "";
    if (time >= 192) {
        showRank = "Nhân viên xuất sắc";
    } else if (time >= 176) {
        showRank = "Nhân viên giỏi";
    } else if (time >= 160) {
        showRank = "Nhân viên khá";
    } else {
        showRank = "Nhân viên trung bình";
    }
    return showRank;
};


