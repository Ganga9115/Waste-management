function isValidIndianPhone(phone) {
    const phonePattern = /^[6-9]\d{9}$/; // Starts 6-9, total 10 digits
    return phonePattern.test(phone);
}

module.exports = isValidIndianPhone;
