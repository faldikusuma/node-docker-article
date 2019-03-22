function myclick(a)
{
    hasil.tampil.value += a;
}

function calculate()
{
    hasil.tampil.value = eval(myform.display.value);
}
function allclear()
{
    hasil.tampil.value="";   
}

function backspace()
{
    let nilai = hasil.tampil.value
    hasil.tampil.value = nilai.substr(0,nilai.length - 1);
}