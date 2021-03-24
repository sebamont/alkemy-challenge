
//new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(Math.abs(num)) turns -1000 to 1.000,00 

export const formatToAbsCurrency = (num) => {
    return new Intl.NumberFormat("de-DE",{minimumFractionDigits:2}).format(Math.abs(num));
}