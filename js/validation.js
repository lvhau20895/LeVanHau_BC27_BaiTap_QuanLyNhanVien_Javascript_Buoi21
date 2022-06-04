// Function validation
function validation() {
    var staff = getStaff();
    var isValid = true;
    // Kiểm tra tên tài khoản nhân viên (account) phải từ 4 - 6 ký tự và không để trống
    var isAccount = new RegExp("^-?[0-9][0-9,\.]+$");
    if (!isRequired(staff.account)) {
        isValid = false;
        getId("tbTKNV").style.display = "block";
        getId("tbTKNV").innerHTML = "Vui lòng nhập tài khoản";
    } else if (!checkLength(staff.account.length, 4, 6)) {
        isValid = false;
        getId("tbTKNV").style.display = "block";
        getId("tbTKNV").innerHTML = "Tài khoản phải từ 4 - 6 ký số";
    } else if(!isAccount.test(staff.account)) {
        isValid = false;
        getId("tbTKNV").style.display = "block";
        getId("tbTKNV").innerHTML = "Tài khoản phải là số";
    } else {
        getId("tbTKNV").style.display = "none";

    }

    // Kiểm tra tên nhân viên (name) phải là chữ và không được để trống
    var isLetters = /^[a-zA-Z_ÁÀẠÃĂẮẰẶẴÂẤẦẬẪáàạáăắằặẵâấầậãĐ" + "ÉÈẸẼÊẾỀỆỄéèẹẽêếềệễ" + "ÍÌỊĨíìịĩ" + "ÓÒỌÕÔỐỒỘỖƠỚỜỢỠóòọõôốồộỗơớờợỡ" + "ÚÙỤŨƯỨỪỰỮúùụũưứừựữ" + "ÝỲỴỸýỳỵỹ\\s]+$/;
    if (!isRequired(staff.name)) {
        isValid = false;
        getId("tbTen").style.display = "block";
        getId("tbTen").innerHTML = "Vui lòng nhập họ tên";
    } else {
        if (!isLetters.test(staff.name)) {
            isValid = false;
            getId("tbTen").style.display = "block";
            getId("tbTen").innerHTML = "Họ tên phải là chữ";
        } else {
            getId("tbTen").style.display = "none";
        }
    }

    // Kiểm tra email nhân viên (email) có hợp lệ hay không
    var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!isRequired(staff.email)) {
        isValid = false;
        getId("tbEmail").style.display = "block";
        getId("tbEmail").innerHTML = "Vui lòng nhập email";
    } else {
        if(!isEmail.test(staff.email)) {
            isValid = false;
            getId("tbEmail").style.display = "block";
            getId("tbEmail").innerHTML = "Email không hợp lệ";
        } else {
            getId("tbEmail").style.display = "none";
        }
    }

    // Kiểm tra mật khẩu (pass) phải có ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt và không để trống
    var isUpperCase = /[A-Z]/g; // ký tự in hoa
    var isNum = /[0-9]/g; // ký tự số
    var isChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // ký tự đặc biệt
    if (!isRequired(staff.pass)) {
        isValid = false;
        getId("tbMatKhau").style.display = "block";
        getId("tbMatKhau").innerHTML = "Vui lòng nhập mật khẩu";
    } else if(!checkLength(staff.pass.length, 6, 10)) {
        isValid = false;
        getId("tbMatKhau").style.display = "block";
        getId("tbMatKhau").innerHTML = "Mật khẩu phải từ 6 - 10 ký tự";
    } else {
        if(!isUpperCase.test(staff.pass) || !staff.pass.match(isNum) || !isChar.test(staff.pass)) {
            isValid = false;
            getId("tbMatKhau").style.display = "block";
            getId("tbMatKhau").innerHTML = "Mật khẩu phải có ký tự in hoa, số và ký tự đặc biệt";
        } else {
            getId("tbMatKhau").style.display = "none";
        }
    }

    // Kiểm tra ngày làm (date) theo định dạng mm/dd/yyy và không để trống
    var isDate = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (!isRequired(staff.date)) {
        isValid = false;
        getId("tbNgay").style.display = "block";
        getId("tbNgay").innerHTML = "Vui lòng nhập ngày làm";
    } else {
        if(!isDate.test(staff.date)) {
            isValid = false;
            getId("tbNgay").style.display = "block";
            getId("tbNgay").innerHTML = "Ngày làm phải theo định dạng mm/dd/yyyy";
        } else {
            getId("tbNgay").style.display = "none";
        }
    }

    // Kiểm tra lương (salary) phải từ 1.000.000 - 20.000.000 và không để trống
    if (!isRequired(staff.salary)) {
        isValid = false;
        getId("tbLuongCB").style.display = "block";
        getId("tbLuongCB").innerHTML = "Vui lòng nhập lương cơ bản";
    } else {
        if(!checkLength(staff.salary, 1e6, 20e6)) {
            isValid = false;
            getId("tbLuongCB").style.display = "block";
            getId("tbLuongCB").innerHTML = "Lương cơ bản phải từ 1.000.000 - 20.000.000";
        } else {
            getId("tbLuongCB").style.display = "none";
        }
    }

    // Kiểm tra chức vụ (position) phải chọn hợp lệ
    if (staff.position === "Chọn chức vụ") {
        isValid = false;
        getId("tbChucVu").style.display = "block";
        getId("tbChucVu").innerHTML = "Vui lòng nhập chức vụ";
    } else {
        getId("tbChucVu").style.display = "none";
    }

    // Kiểm tra 
    if (!isRequired(staff.time)) {
        isValid = false;
        getId("tbGiolam").style.display = "block";
        getId("tbGiolam").innerHTML = "Vui lòng nhập giờ làm";
    } else {
        if(!checkLength(staff.time, 80, 200)) {
            isValid = false;
            getId("tbGiolam").style.display = "block";
            getId("tbGiolam").innerHTML = "Số giờ làm trong tháng phải từ 80 - 200 giờ";
        } else {
            getId("tbGiolam").style.display = "none";
        }
    }
    return isValid;
}


// Function kiểm tra input rỗng hay không
function isRequired(value) {
    if (value) {
        return true;
    }
    return false;
};


// Function kiểm tra min max
function checkLength(value, min, max) {
    if (value < min || value > max) {
        return false;
    }
    return true;
};