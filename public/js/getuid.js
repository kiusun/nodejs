var list_uid = "";
$(document).ready(function(){
    
    $("#btn_start").click(function(){
        var token = $("#token").val();      
        var groupid = $("#groupId").val();
        $.get("https://graph.facebook.com/v3.0/"+groupid+"?fields=member_count&access_token="+token+"&format=json&method=get&pretty=0&suppress_http_code=1",function(res){
            var _for = Math.round(res["member_count"]/1000);
            if(res["error"]){
                alert(" Tokenn Die , kiểm tra lại token!")
            } 
            else{
                var url = 'https://graph.facebook.com/v3.0/'+groupid+'/members?access_token='+token+'&fields=id&limit=1000&format=json&method=get&pretty=0&suppress_http_code=1';
                for(let i = 0 ; i < 3 ; i++){
                    $.get(url,function(res){
                        if(res["error"]){
                            alert("token die");
                        }else{
                            $.each(res["data"] ,function(index , value){
                                var a = value;
                               
                            })
                                                   
                        }
                        url = res["paging"]["next"];
                        console.log(res["paging"]["next"]);
                    })
                }    
            }   
        })
        
    })
    
})