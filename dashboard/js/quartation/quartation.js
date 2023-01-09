

const quartation = {
    set_preview_data: async function (quartation_number = null) {
        let res_data = await quartation.ajax_set_preview_data(quartation_number);
        title = res_data['title']

        // Quartation Detail
        $('.inp-quo_no').val(title['quartation_number']);
        $('.inp-sign_st').val((title['status'] == '1' ? 'Signed' : 'Not Sign'));
        $('.sel_consignee').val(title['consignee_number']);
        $('.inp-commodity').val(title['commodity']);
        $('.sel-type-title').val(title['type']);
        // ขาด type

        // END Quartation Detail

        // Base service


        var carrier_type = $('.inp-carrier-type').parent().html();
        var select_pod = $('.inp-port_load').parent().html();
        var select_del = $('.inp-port_del').parent().html();
        var select_currency = $('.select-currency').parent().html();
        var html_select_carrier = $('.inp-carrier').parent().html();

        $('.base-row').html('')
        let base_data = [];
        

        $.each(res_data['detail'], function (i, v) {
            if (v['type'] === 'base_service') {
                base_data.push(v);
            }
        });
        let html = '';
        let num = 1;
        $.each(base_data, function (i, v) {
            html = `
                    <div class="base-add" data-id="${v['ID']}">
                        <H5 class="mb-3">Route ${num}</H5>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center sel-carrier" for="pwd2">Carrier :</label>
                            <div class="col-lg-5 col-md-5">
                                <div class="db-select-carrier db-select-carrier${i}">
                                       ${html_select_carrier}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Container size :</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-lg-5 col-md-4 db-select-carrier_type db-select-carrier_type${i}">
                                        ${carrier_type}
                                    </div>
                                    <label class="control-label col-sm-2 col-md-4 col-lg-2 align-self-center mb-0" for="pwd2">Container Quantity</label>
                                    <div class="col-lg-2 col-md-2 ">
                                        <input type="text" class="form-control form-control-sm inp_qty "value='${v['qty']}'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Port of loading</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-md-4 col-lg-4">
                                        <div class="db-select-pol db-select-pol${i}">
                                            ${select_pod}
                                        </div>
                                    </div>
                                    <label class="control-label col-sm-2 col-md-3 col-lg-2 align-self-center mb-0" for="pwd2">Port of Delivery</label>
                                    <div class=" col-md-4  col-lg-4">
                                        <div class="db-select-pod db-select-pod${i}">
                                            ${select_del}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Budget :</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4">
                                        <input type="text" class="form-control form-control-sm inp-budget" value="${v['price']}" readonly>
                                    </div>
                                    <div class="col-lg-3 col-md-3 db-select-currency db-select-currency${i}">
                                        ${select_currency}
                                    </div>
                                    <div class="col-sm-9 col-md-5 col-lg-4">
                                        <button type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" onclick="quartation.addhtmlbase_server(this);" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                 `;
                 num++;
                $('.base-row').append(html);

                $(`.db-select-carrier${i} > select`).val(v['carrier_number']); 
                $(`.db-select-carrier_type${i} > select`).val(v['container_type']);                                
                $(`.db-select-pol${i} > select`).val(v['pol']);                                
                $(`.db-select-pod${i} > select`).val(v['pod']);                                
                $(`.db-select-currency${i} > select`).val(v['currency']).attr('disabled','disabled') ;                                

        });
        // END Base service


        // trucking fee (import)
        $('.truck_fee_import_row').parent().html('');
        $.each(res_data['truck_fee']['import'], function (i, v) { 
            html = `
                <div class="truck_fee_import_row">                    
                    <h5> Import ${i+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="${v['pickup']}">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="${v['dropoff']}">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="${v['price']}">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="${v['currency']}">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_import(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>
            `
            $('.truck_fee_import').append(html);
        });


        // trucking fee (export)
        $('.truck_fee_export_row').parent().html('');

        $.each(res_data['truck_fee']['export'], function (i, v) { 
            html = `
                <div class="truck_fee_export_row">                    
                    <h5>Export ${i+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="${v['pickup']}">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="${v['dropoff']}">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="${v['price']}">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="${v['currency']}">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_export(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    <button type="button" target="_blank" class="btn btn-danger rounded-pill btn-sm bg-gradient" onclick="quartation.del_truck_fee_export(this);; style=" box-shadow:="" 0px="" 4px="" rgba(0,="" 0,="" 0.25);"=""><i class="bi bi-dash-lg"></i> Delete Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>
            `;
            $('.truck_fee_export').append(html);
        });


        // Sup service
            let sel_sup_service = $('.sel-sup_des_service').parent().html();

            $('[name = "sub-tbl"] tbody').html('');
            $.each(res_data['sup_service'], function (i, v) { 
                html = `
                    <tr class="sub_des sub_des${i}">
                        <td class="select_des_sup">
                            ${sel_sup_service}</td>
                        <td><select name="" id="" class="form-select form-select-sm sel_type_sup_service">
                                <option value="Import">Import</option>
                                <option value="Export">Export</option>
                                <option value="Other">Other service</option>
                            </select></td>
                        <td><input type="input" class="form-control form-control-sm inp_price_sup_service" id="" placeholder="" value="${v['price']}"></td>
                        <td><select name="" class="form-select form-select-sm sel_currency_sup_service" id="" >
                                <option value="THB">THB</option>
                                <option value="USD">USD</option>
                                <option value="RMB">RMB</option>
                            </select></td>
                        <td><input type="input" class="form-control form-control-sm inp_sup_remark" id="" placeholder="" value="${v['remark']}"></td>
                        
                        <td  onclick="quartation.del_sup_row(this);"><svg class="del-tr"  width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red"></path>
                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red"></path>
                            </svg>
                        </td>
                    </tr>
                `;
                $('[name = "sub-tbl"] tbody').append(html);
                $(`.sub_des${i} .sel_type_sup_service`).val(v['type']);
                $(`.sub_des${i} .sel-sup_des_service`).val(v['description']);
                $(`.sub_des${i} .sel_currency_sup_service`).val(v['currency']);

            });


    },
    addhtmlbase_server: function (e = null) {
        let sl_carrier = $(".db-select-carrier").html();
        let sl_pol = $(".db-select-pol").html();
        let sl_pod = $(".db-select-pod").html();
        let sl_carrier_type = $(".db-select-carrier_type").html();
        let num = $('.base-add').length +1;
        html = `
                <div class="base-add">
                <H4>Route ${num}</H4>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Carrier :</label>
                            <div class="col-lg-5 col-md-5">
                                ${sl_carrier}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Container size :</label>
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-lg-5 col-md-4">
                                            ${sl_carrier_type}
                                        </div>
                                        <label class="control-label col-sm-2 col-md-4 col-lg-2 align-self-center mb-0" for="pwd2">Container Quantity</label>
                                        <div class="col-lg-2 col-md-2">
                                            <input type="text" class="form-control form-control-sm" inp_qty >
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Port of loading</label>
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-md-4">
                                            ${sl_pol}
                                        </div>
                                        <label class="control-label col-sm-2 col-md-3 col-lg-2 align-self-center mb-0" for="pwd2">Port of Delivery</label>
                                        <div class="col-lg-4">
                                            ${sl_pod}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Budget :</label>
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-4">
                                            <input type="text" class="form-control form-control-sm" readonly>
                                        </div>
                                        <div class="col-lg-3 col-md-3">
                                            <select name="" class="form-select form-select-sm" id="" disabled>
                                                <option value="" selected>THB</option>
                                                <option value="">USD</option>
                                                <option value="">RMB</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-9 col-md-5 col-lg-4">
                                            <button type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" onclick="quartation.addhtmlbase_server();" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                            <button type="button" target="_blank" class="btn btn-danger rounded-pill btn-sm bg-gradient" onclick="quartation.del_base(this); style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-dash-lg"></i> Delete Route</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        $(".base-row").append(html);
    },
    addhtmlsub_tbl: function () {
        let sel_sup_service = $('.sel-sup_des_service').parent().html();
        let sel_type_sup_service = $('.sel_type_sup_service').parent().html();
        let sel_currency_sup_service = $('.sel_currency_sup_service').parent().html();

        html = `
            <tr class="sub_des">
                <td class="">
                ${sel_sup_service}</td>
                <td>
                    ${sel_type_sup_service}
                </td>
                <td><input type="input" class="form-control form-control-sm inp_price_sup_service" id="" placeholder=""></td>
                <td>${sel_currency_sup_service}</td>
                <td><input type="input" class="form-control form-control-sm inp_sup_remark" id="" placeholder=""></td>
                <td  onclick="quartation.del_sup_row(this);"><svg class="del-tr"  width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red"></path>
                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red"></path>
                    </svg>
                </td>
            </tr>
            `;
        $('[name="sub-tbl"]>tbody').append(html);
    },
    del_sup_row: function (e = null) {
        let num = $('.sub_des').length;
        console.log(num);
        if (num == 1) {
            alert('You can not remove this one');
            return
        }else{
            $(e).closest("tr").remove();

        }
    },
    check_get: function () {
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        };
        let get_quo = getUrlParameter('quartation_number');
        let get_action = getUrlParameter('action');

        let quartation_number = get_quo == false ? null : get_quo;
        let action = get_action == false ? null : get_action;

        if (action == 'preview') {
            quartation.set_preview_data(quartation_number);
        } else {

        }
    },
    set_preview_data: async function (quartation_number = null) {
        let res_data = await quartation.ajax_set_preview_data(quartation_number);
        title = res_data['title']

        // Quartation Detail
        $('.inp-quo_no').val(title['quartation_number']);
        $('.inp-sign_st').val((title['status'] == '1' ? 'Signed' : 'Not Sign'));
        $('.sel_consignee').val(title['consignee_number']);
        $('.inp-commodity').val(title['commodity']);
        $('.sel-type-title').val(title['type']);
        // ขาด type

        // END Quartation Detail

        // Base service


        var carrier_type = $('.inp-carrier-type').parent().html();
        var select_pod = $('.inp-port_load').parent().html();
        var select_del = $('.inp-port_del').parent().html();
        var select_currency = $('.select-currency').parent().html();
        var html_select_carrier = $('.inp-carrier').parent().html();

        $('.base-row').html('')
        let base_data = [];
        

        $.each(res_data['detail'], function (i, v) {
            if (v['type'] === 'base_service') {
                base_data.push(v);
            }
        });
        let html = '';
        let num = 1;
        $.each(base_data, function (i, v) {
            html = `
                    <div class="base-add" data-id="${v['ID']}">
                        <H5 class="mb-3">Route ${num}</H5>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center sel-carrier" for="pwd2">Carrier :</label>
                            <div class="col-lg-5 col-md-5">
                                <div class="db-select-carrier db-select-carrier${i}">
                                       ${html_select_carrier}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Container size :</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-lg-5 col-md-4 db-select-carrier_type db-select-carrier_type${i}">
                                        ${carrier_type}
                                    </div>
                                    <label class="control-label col-sm-2 col-md-4 col-lg-2 align-self-center mb-0" for="pwd2">Container Quantity</label>
                                    <div class="col-lg-2 col-md-2 ">
                                        <input type="text" class="form-control form-control-sm inp_qty "value='${v['qty']}'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Port of loading</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-md-4 col-lg-4">
                                        <div class="db-select-pol db-select-pol${i}">
                                            ${select_pod}
                                        </div>
                                    </div>
                                    <label class="control-label col-sm-2 col-md-3 col-lg-2 align-self-center mb-0" for="pwd2">Port of Delivery</label>
                                    <div class=" col-md-4  col-lg-4">
                                        <div class="db-select-pod db-select-pod${i}">
                                            ${select_del}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " for="pwd2">Budget :</label>
                            <div class="col-sm-9">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4">
                                        <input type="text" class="form-control form-control-sm inp-budget" value="${v['price']}" readonly>
                                    </div>
                                    <div class="col-lg-3 col-md-3 db-select-currency db-select-currency${i}">
                                        ${select_currency}
                                    </div>
                                    <div class="col-sm-9 col-md-5 col-lg-4">
                                        <button type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" onclick="quartation.addhtmlbase_server(this);" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                 `;
                 num++;
                $('.base-row').append(html);

                $(`.db-select-carrier${i} > select`).val(v['carrier_number']); 
                $(`.db-select-carrier_type${i} > select`).val(v['container_type']);                                
                $(`.db-select-pol${i} > select`).val(v['pol']);                                
                $(`.db-select-pod${i} > select`).val(v['pod']);                                
                $(`.db-select-currency${i} > select`).val(v['currency']).attr('disabled','disabled') ;                                

        });
        // END Base service


        // trucking fee (import)
        $('.truck_fee_import_row').parent().html('');
        $.each(res_data['truck_fee']['import'], function (i, v) { 
            html = `
                <div class="truck_fee_import_row">                    
                    <h5> Import ${i+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="${v['pickup']}">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="${v['dropoff']}">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="${v['price']}">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="${v['currency']}">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_import(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>
            `
            $('.truck_fee_import').append(html);
        });


        // trucking fee (export)
        $('.truck_fee_export_row').parent().html('');

        $.each(res_data['truck_fee']['export'], function (i, v) { 
            html = `
                <div class="truck_fee_export_row">                    
                    <h5>Export ${i+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="${v['pickup']}">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="${v['dropoff']}">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="${v['price']}">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="${v['currency']}">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_export(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    <button type="button" target="_blank" class="btn btn-danger rounded-pill btn-sm bg-gradient" onclick="quartation.del_truck_fee_export(this);; style=" box-shadow:="" 0px="" 4px="" rgba(0,="" 0,="" 0.25);"=""><i class="bi bi-dash-lg"></i> Delete Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>
            `;
            $('.truck_fee_export').append(html);
        });


        // Sup service
            let sel_sup_service = $('.sel-sup_des_service').parent().html();

            $('[name = "sub-tbl"] tbody').html('');
            $.each(res_data['sup_service'], function (i, v) { 
                html = `
                    <tr class="sub_des sub_des${i}">
                        <td class="select_des_sup">
                            ${sel_sup_service}</td>
                        <td><select name="" id="" class="form-select form-select-sm sel_type_sup_service">
                                <option value="Import">Import</option>
                                <option value="Export">Export</option>
                                <option value="Other">Other service</option>
                            </select></td>
                        <td><input type="input" class="form-control form-control-sm inp_price_sup_service" id="" placeholder="" value="${v['price']}"></td>
                        <td><select name="" class="form-select form-select-sm sel_currency_sup_service" id="" >
                                <option value="THB">THB</option>
                                <option value="USD">USD</option>
                                <option value="RMB">RMB</option>
                            </select></td>
                        <td><input type="input" class="form-control form-control-sm inp_sup_remark" id="" placeholder="" value="${v['remark']}"></td>
                        
                        <td  onclick="quartation.del_sup_row(this);"><svg class="del-tr"  width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red"></path>
                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red"></path>
                            </svg>
                        </td>
                    </tr>
                `;
                $('[name = "sub-tbl"] tbody').append(html);
                $(`.sub_des${i} .sel_type_sup_service`).val(v['type']);
                $(`.sub_des${i} .sel-sup_des_service`).val(v['description']);
                $(`.sub_des${i} .sel_currency_sup_service`).val(v['currency']);

            });


    },
    ajax_set_preview_data: function (quartation_number) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/quotation/get_preview_data.php",
                data: { 'quartation_number': quartation_number },
                dataType: "json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    get_consignee_sel: async function () {
        let res_consignee = await quartation.ajax_get_consingee();
        return res_consignee;

    },
    ajax_get_consingee: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/quotation/get_consignee.php",
                data: {},
                dataType: "json",
                success: function (res) {
                    resolve(res);
                },
            });
        });
    },
    html_consignee: async function (data) {
        let res = await quartation.get_consignee_sel();
        let html = '';
        $.each(res, function (i, k) {
            html += `
            <option value="${k['ID']}">${k['consignee_name']}</option>
            `;
        });

        $('.sel_consignee').append(html);
    },
    html_base_service: function () {

    },
    get_base_service: async function () {

    },
    ajax_get_base_service: function () {

    },
    add_truck_fee_import : function (e = null) {  
        num = $('.truck_fee_import_row').length;
        let html = `
                <div class="truck_fee_import_row">                    
                    <h5> Import ${num+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_import(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    <button type="button" target="_blank" class="btn btn-danger rounded-pill btn-sm bg-gradient" onclick="quartation.del_truck_fee_import(this);; style=" box-shadow:="" 0px="" 4px="" rgba(0,="" 0,="" 0.25);"=""><i class="bi bi-dash-lg"></i> Delete Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>     
            `;

        $('.truck_fee_import').append(html);
    },
    add_truck_fee_export : function (e = null) {  
        num = $('.truck_fee_export_row').length;
        let html = `
                <div class="truck_fee_export_row">                    
                    <h5> Export ${num+1}</h5>
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center " on>Pickup :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_pickup " value="">
                                </div>
                                <label class="control-label col-sm-2 col-md-2 col-lg-1 align-self-center mb-0">Dropoff :</label>
                                <div class="col-lg-3 col-md-5">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_drop" value="">
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="form-group row">
                        <label class="control-label col-sm-3 col-md-3 col-lg-2 align-self-center inp-tr_fee_budget">Budget :</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-lg-3 col-md-4">
                                    <input type="text" class="form-control form-control-sm inp-truck_fee_budget" value="">
                                </div>
                                <div class="col-lg-2 col-md-3">
                                    <select name="" class="form-select form-select-sm sel-tr_fee_currency" id="" value="">
                                        <option value="THB" selected>THB</option>
                                        <option value="USD">USD</option>
                                        <option value="RMB">RMB</option>
                                    </select>
                                </div>
                                <div class="col-sm-9 col-md-5 col-lg-4">
                                    <button onclick="quartation.add_truck_fee_export(this);" type="button" target="_blank" class="btn btn-primary rounded-pill btn-sm bg-gradient" style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);"><i class="bi bi-plus"></i> Add Route</button>
                                    <button type="button" target="_blank" class="btn btn-danger rounded-pill btn-sm bg-gradient" onclick="quartation.del_truck_fee_export(this);; style=" box-shadow:="" 0px="" 4px="" rgba(0,="" 0,="" 0.25);"=""><i class="bi bi-dash-lg"></i> Delete Route</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <hr>     
            `;

        $('.truck_fee_export').append(html);
    },
    html_modal_add_consignee : function () {
        if ($('#add_consignee_moda').length >= 1 ) {
            $('#add_consignee_moda').remove();
        }
        html = `
        <div class="modal fade" id="add_consignee_moda">
            <div class="modal-dialog">
                <div class="modal-content">
            
                    <!-- Modal Header -->
                    <div class="modal-header">
                    <h4 class="modal-title">Add Consignee</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
            
                    <!-- Modal body -->
                    <div class="modal-body ps-5">
                        <div class="form-group">
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">Consignee Name:</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">e-mail:</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">user_sale :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">tax :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">bank_account_name :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">bank_number :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">address :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">contact_person_name :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="control-label col-sm-3 col-md-3 col-lg-3" for="">contact_person_tel :</label>
                                <div class="col-sm-11 col-lg-8 col-md-6">
                                    <input type="text" class="form-control form-control-sm inp-quo_no" >
                                </div>
                            </div>












                            
                        </div>
                    </div>
            
                    <!-- Modal footer -->
                    <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
            
                </div>
            </div>
        </div>`;

        $('body').append(html);
        $('#add_consignee_moda').modal('show')
    },
    quotation_save : async function (param) {  
        data = {};
        let quo_no = $('.inp-quo_no').val();
        let sign_st = $('.inp-sign_st').val();
        let consignee = $('.sel_consignee').val();
        let term = $('.sel_term').val();
        let commod = $('.inp-commodity').val();
        let type_title = $('.sel-type-title').val();
        let detail = {
            'quo_no'  :quo_no,
            'sign_st'  :sign_st,
            'consignee' :consignee,
            'term' :term,
            'commod' :commod,
            'type_title':type_title,

        }

        let base_arr = [];
        $('.base-add').each(function (i, e) {
            // element == this
            let base_arr_tmp = {};

            let carrier = $('.inp-carrier', this).val();
            let carrier_type = $('.inp-carrier-type', this).val();
            let pol = $('.inp-port_load', this).val();
            let pod = $('.inp-port_del', this).val();
            let qty = $('.inp_qty', this).val();

            base_arr_tmp = {
                'carrier' :carrier,
                'carrier_type' : carrier_type,
                'pol' : pol,
                'pod' : pod,  
                'qty' : qty,
            }
            base_arr.push(base_arr_tmp);
        });

        let truck_fee_import = [];
        $('.truck_fee_import_row').each(function (i, e) {
            let truck_fee_import_tmp = {};

            let truck_pickup = $('.inp-truck_fee_pickup', this).val();
            let truck_drop = $('.inp-truck_fee_drop', this).val();
            let budget = $('.inp-truck_fee_budget', this).val();
            let currency = $('.sel-tr_fee_currency', this).val();
            truck_fee_import_tmp = {
                'truck_pickup' :truck_pickup,
                'truck_drop' : truck_drop,
                'budget' : budget,
                'currency' : currency,  
            }
            truck_fee_import.push(truck_fee_import_tmp);
        });

        let truck_fee_export = [];
        $('.truck_fee_export_row').each(function (i, e) {
            let truck_fee_export_tmp = {};

            let truck_pickup = $('.inp-truck_fee_pickup', this).val();
            let truck_drop = $('.inp-truck_fee_drop', this).val();
            let budget = $('.inp-truck_fee_budget', this).val();
            let currency = $('.sel-tr_fee_currency', this).val();
            truck_fee_export_tmp = {
                'truck_pickup' :truck_pickup,
                'truck_drop' : truck_drop,
                'budget' : budget,
                'currency' : currency,  
            }
            truck_fee_export.push(truck_fee_export_tmp);
        });

        let sup_service = [];
        $('.sub_des').each(function (i, e) {
            // element == this
            let sup_service_tmp = {};

            let service = $('.sel-sup_des_service',this).val();
            let type = $('.sel_type_sup_service',this).val();
            let unit_price = $('.inp_price_sup_service',this).val();
            let currency = $('.sel_currency_sup_service',this).val();
            let remark = $('.inp_sup_remark',this).val();

            sup_service_tmp = {
                'service' :service,
                'type' : type,
                'unit_price' : unit_price,
                'currency' : currency,  
                'remark' : remark,  

            }
            sup_service.push(sup_service_tmp);
        });

        let save_data = {
            'detail' : detail,
            'base' : base_arr,
            'truck_import' : truck_fee_import,
            'truck_export' : truck_fee_export,
            'sup_service' : sup_service
        }
        console.log(save_data);
        let res = await quartation.ajax_save_quotation(save_data);
    },
    ajax_save_quotation : function (data) { 
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/quotation/save_quotation.php",
                data: data,
                dataType: "json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    fillter_route_carrier:async function (e) { 
        let parent = $(e).closest('.base-add');
        let val = $(e).val();
        $('.inp-carrier-type', parent).val('');
        $('select.inp-port_load, select.inp-port_del ,input.inp-budget, select.select-currency' , parent).val('');
        
        let res = await quartation.ajax_get_containner_by_route({'carrier_no' : val});
        $('.inp-carrier-type>option', parent).hide();
        $('.inp-port_load>option', parent).hide();
        $('.inp-port_del>option', parent).hide();

        $.each(res, function (i, v) { 
            container_type = v['container_type'];
            pol = v['pol'];
            pod = v['pod'];

            $('.inp-carrier-type>option[value="'+container_type+'"]', parent).show();
            $('.inp-port_load>option[value="'+pol+'"]', parent).show();
            $('.inp-port_del>option[value="'+pod+'"]', parent).show();
        });
    },
    ajax_get_containner_by_route : function (data) { 
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "post",
                url: "php/quotation/get_container_by_route.php",
                data: data,
                dataType: "json",
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },


};

$(function () {
    quartation.html_consignee();
    quartation.check_get(); 
});
