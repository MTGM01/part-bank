export const convertToPersianNumber = (latinNum) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return latinNum.toString().replace(/\d/g, (digit) => persianDigits[digit]);
}

export const threeDigitSeprator = (number) => {
    var str = number.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1٬');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export const turnMiladiToPersian = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6);
    let optionYear = { year: 'numeric' };
    let dateYear = new Date(year).toLocaleDateString('fa-IR', optionYear);
    let optionMonth = { month: 'numeric' };
    let dateMonth = new Date(month).toLocaleDateString('fa-IR', optionMonth);
    let optionDay = { day: 'numeric' };
    let dateDay = new Date(month).toLocaleDateString('fa-IR', optionDay);
    let finalDate = `${dateYear}/${dateMonth}/${dateDay}`;
    return finalDate;
}

export const hejriDateAndTime = (isoDate) => {
    const optionTime = { hour: 'numeric', minute: 'numeric' }
    const persianDate = new Date(isoDate).toLocaleDateString('fa-IR')
    const persianTime = new Date(isoDate).toLocaleTimeString('fa-IR', optionTime)
    const dateAndTime = `${persianTime} ${persianDate}`
    return dateAndTime
}

export const determineType = (type) => {
    switch (type) {
        case 'withdraw':
            return 'برداشت'

        default:
            return 'واریز'
    }
}

export const determineSrcIcon = (type) => {
    switch (type) {
        case 'withdraw':
            return '/src/assets/icons/withdraw.svg'

        default:
            return '/src/assets/icons/deposit.svg'
    }
}