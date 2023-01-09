const petty_cash_payment_list_set = {
   
    set_data_rows: async function (job_doc_pt) {
        
        
        let res_data = await petty_cash_payment_list_set.ajax_set_preview_data(job_doc_pt);
        
        console.log(res_data);
        $('[name = "data-table-list"] tbody').html('');

        $.each(res_data['pct'], function (i, v) {         
            pf_amount = parseFloat(v['total_amount_request']);
            set_payble = '';
            res_payble = v['payble_check'];
            if(res_payble == '1'){
                set_payble = '<span class="badge rounded-pill bg-success" style="border-radius: 12px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">Success</span>';
            }else{
                set_payble = '<span class="badge rounded-pill bg-danger" style="border-radius: 12px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">fail</span>';
            }

            html_set_pct = `
            <tr>
                <td>${v['datetime_request']}</td>
                <td>${v['petty_cash_number']}</td>
                <td>${v['first_name']} ${v['last_name']}</td>
                <td>${v['COUNT_job']}</td>
                <td>${number_format(pf_amount.toFixed(2))}</td>
                <td>${set_payble}</td>
                <td><button type="button" onclick="pettycash_payment_list.preview('${v['petty_cash_number']}');" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-eye"></i> Preview</button></td>
            </tr>
            `;

            $('[name = "data-table-list"] tbody').append(html_set_pct);
           
        });
      
      
    }, 
    

    ajax_set_preview_data: function (job_doc_pt) {
        
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/petty-cash-payment-list/get_detail.php",
                data: {},
                dataType: "json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },

};


function number_format(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}