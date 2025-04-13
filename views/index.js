window.addEventListener('DOMContentLoaded', analytics);

async function analytics(){
    const newRow=(originalUrl,shortUrl,clickCount)=>{
        const table=document.getElementById('table');
        const newEntry=table.insertRow();
        newEntry.insertCell(0).innerText=originalUrl.slice(0,50);
        newEntry.insertCell(1).innerHTML=`<a href="https://url-shortener-fqrr.onrender.com/${shortUrl}" target="_blank">https://url-shortener-fqrr.onrender.com/${shortUrl}</a>`;;
        newEntry.insertCell(2).innerText=clickCount;
    }
    console.log('in function')
    try{
        const db = await axios.get('/analytics');
        const urls = db.data;
        const table = document.getElementById('table');
        while(table.rows.length > 1) {
            table.deleteRow(1);
        }
        urls.forEach(row=>{
            newRow(row.originalUrl, row.shortUrl, row.clickCount);
        });
    }
    catch(error){
        console.error("error occurred while updating the table");
    }
}

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const qrCode = document.getElementById('qr');
    const cntnr = document.getElementById('imgCntnr');
    const qrBtn = document.getElementById('qrGen');

    qrCode.classList.remove('hide');
    qrBtn.classList.remove('hide');  // <- ADD THIS LINE TO SHOW QR BUTTON AGAIN
    cntnr.style.display = 'none';
    qrCode.src = '';

    const inputUrl = document.getElementById('input').value;
    const res = await axios.post('/shortUrl', {
        originalUrl: inputUrl
    });

    document.getElementById('shorturl').value = `https://url-shortener-fqrr.onrender.com/${res.data.key}`;
});

document.getElementById('qrGen').addEventListener('click', async(e) => {
    e.preventDefault();
    const qrCode = document.getElementById('qr');
    const cntnr = document.getElementById('imgCntnr');
    const qrBtn = document.getElementById('qrGen');
    const inputUrl=document.getElementById('input').value;

    const res=await axios.post('/shortUrl',{
        originalUrl:inputUrl
    });

    qrCode.src=res.data.qrCode;
    if (!qrCode.src) return alert("Please short a URL first!");

    cntnr.style.display = 'inline-block';
    cntnr.style.padding = '10px';
    cntnr.style.borderRadius = '10px';
    cntnr.style.marginTop = '1%';
    qrCode.style.width = '150px';
    qrCode.style.borderRadius='10px';
    qrBtn.classList.add('hide');
    cntnr.classList.add('show');
});