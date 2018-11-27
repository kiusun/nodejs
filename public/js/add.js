var list_uid  , results , time_add_friend , limit_uid;
var BreakException = {};
$(document)["ready"](function(callback){
    $("#btn_start")["click"](function(){
        var list_token = $("#list_token")["val"]()["split"](/\n/);
        list_uid = $("#list_uid")["val"]()["split"](/\n/);
        time_add_friend = $("#time_add_friend")["val"]()*1000;
        limit_uid = $("#limit_uid")["val"]();
        $("#tbody")["text"]("");
        var tbody;
        if(list_token == "" || list_uid ==""){
            if(list_token ==""){
               alert("Token Trống , Điền token") ;
            }else{
                alert("LIST UID trống , nhập UID");
            }
        }else{
            results = chunkArray(list_uid , limit_uid)
            var token_count = 0;
            $["each"](list_token , function(index , token){
                token_count++;
                tbody += '<tr>';
                tbody += '<td style="font-weight: bold; text-align: center;">' + token_count + '</td>';
                tbody += '<td style="text-align: center"><div class="btn-group"><button class="btn btn-success success_' + token + '">OK (<span>0</span>)</button></div> <div class="btn-group"><button class="btn btn-danger count_error_' + token + '">NO (<span>0</span>)</button><button class="btn btn-danger dropdown-toggle" user_info-toggle="dropdown" style="padding: 8px;"><span class="caret"></span></button> <ul class="dropdown-menu error_' + token + '"></ul></div></td>';
                tbody += '<td class="log_' + token + '" style="font-style: italic;"></td>';
                tbody += '<td class="name_' + token + '"></td>';
                tbody += '<td class="token_' + token + '">' + token['substring'](0, 25) + ' .......</td>';
                tbody += '</tr>';
            });
            $("#tbody")["append"](tbody);
        }
        try {
            $["each"](list_token , function(index , token){
                 addFriend(index,token);
            });

            
        } catch (error) {
            throw error;
        }
    });
});
function addFriend(index ,token){
    $['get']('https://graph.facebook.com/v2.3/me/?fields=name,id&access_token=' + token +'&format=json&method=get&pretty=0&suppress_http_code=1', function (user_info){
        if(user_info["error"]){
            $('.log_' + token)['text'](JSON['stringify'](user_info));
            $('.token_' + token)['append']('Token Die');
        }else{
            $('.log_' + token)['append']('Đang Add Friends...');
            $('.name_' + token)['text'](user_info['name']);
            id = (user_info['id']);
            try {
                $["each"](results[index] , function(ele , uid){
                        var time_out = ele * time_add_friend;
                        setTimeout(function(){
                            $["post"]('http://graph.facebook.com/me/friends?uid='+uid+'&access_token='+token+'&method=post&pretty=0&suppress_http_code=1', function (res){
                                if(res["error"]){
                                    var error_count = $('.count_error_' + token + ' span')['text']();
                                    error_count++;
                                    $('.count_error_' + token + ' span')['text'](error_count);
                                }else{
                                    var success_count = $('.success_' + token + ' span')['text']();
                                    success_count++;
                                    $('.success_' + token + ' span')['text'](success_count);                                    
                                }
                            });
                        }, time_out);                    
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        }       
    });
    
}
function chunkArray(myArray, chunk_size) {
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}