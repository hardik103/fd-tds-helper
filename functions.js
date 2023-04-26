function incomplete_data_check(){
    let principal = Number(document.getElementById('principal').value);
    let rate = Number(document.getElementById('rate').value);
    let time = Number(document.getElementById('time').value);
    let checked;
    let age = document.getElementsByClassName('age');
    for(let i=0;i<age.length;i++) {
        if( age[i].checked ) {
            checked = Number(i);
        }
    }

    if( !principal || !rate || !time || checked==undefined ){
        alert("Incomplete Data");
    }else if( principal<=0 || rate<=0 || time<=0 ){
        alert("Invalid Data");
    }else{
        clear_data();
        analyse(checked);
    }

}

function clear_data(){
    document.getElementById('analysis').innerHTML="";
}

function analyse(checked){
    let principal = Number(document.getElementById('principal').value);
    let rate = Number(document.getElementById('rate').value);
    let time = Number(document.getElementById('time').value);
    
    let age = document.getElementsByClassName('age');
    let limit = Number( age[checked].value);
    
    let maximum_possible_amount=Math.pow(rate/100+1,time)*principal,maximum_possible_interest=maximum_possible_amount-principal;
    let total_tax=0,generated_interest=0,generated_amount=0;
    
    let P=0,I=0,A=principal,year=0,tax,Ir
    while(time--){
        year++;
        P = (Number(A)).toFixed(2);
        I = (Number(P) * Number(rate) / Number(100)).toFixed(2);

        if(I>limit){

            tax = (Number(I) / 10).toFixed(2);
            Ir = (Number(I) - Number(tax)).toFixed(2);
            A = (Number(P) + Number(Ir)).toFixed(2);
            document.getElementById('analysis').innerHTML += `
            <div id="box" class="taxed">
            <br>
            ${year}<br>
            Principal = ${P}<br>
            Rate = ${rate}<br>
            Interest Generated= ${I}<br>
            Annual Interest exceeded the non-taxable limit of Rs. ${limit}.<br>
            Tax(TDS) = 10% of Annual Interest<br>
            Tax Amount(TDS) to be Deducted = ${tax}<br>
            Interest to be Compounded after Tax(TDS) is Deducted = ${Ir}<br>
            A = ${A}<br><br>
            </div>
            <br><br>`;

            total_tax += Number(tax);
            
        }else{
            
            A = (Number(P) + Number(I)).toFixed(2);
            document.getElementById('analysis').innerHTML += `
            <div id="box" class="untaxed">
            <br>
            ${year}<br>
            Principal = ${P}<br>
            Rate = ${rate}<br>
            Interest Generated= ${I}<br>
            Annual Interest is in the non-taxable limit of Rs. ${limit}.<br>
            No Tax Amount(TDS) to be Deducted<br>
            A = ${A}<br><br>
            </div>
            <br><br>`;
        }
    }

    document.getElementById('analysis').innerHTML += `
    <div id="conclusion">
    CONCLUSION<br>
    Maximum Possible Interest = Rs. ${maximum_possible_interest.toFixed(2)}<br>
    Maximum Possible Amount = Rs. ${maximum_possible_amount.toFixed(2)}<br>
    Total Tax Deducted = Rs. ${total_tax.toFixed(2)}<br>
    Interest Earned = Rs. ${A-principal-total_tax.toFixed(2)}<br>
    </div>`;

}