$(document).ready(function(){
    const database = firebase.database();
    //console.log(database);

    const scrollTo = () => {
        let dispHt = $('#display').height();
        console.log(dispHt);
        $('#display').scrollTop(dispHt);
    }; 

    database.ref("/whatsapp").on("value", function(getMsg){
        var storeMsg = getMsg.val();
        //console.log(storeMsg);
        let display = $("#display");
        $(display).empty();
        for(let msg in storeMsg){
            var showMsg = storeMsg[msg].message;
            var showAuthor = storeMsg[msg].author;
            $(display).append(`
                <div class="msg-container">
                    <span class="key">${msg}</span>
                    <span class="option-btn"><i class="fa fa-angle-down"></i></span>
                    <div class="options">
                        <ul>
                            <li><span>Delete Message</span></li>
                        </ul>
                    </div>
                    <span class="author">${showAuthor}</span>
                    <p>${showMsg}</p>
                </div>
            `);
        }
    
        scrollTo();

        $('body').click(function(e){
            $('span.option-btn').parent('.msg-container').removeClass('op-active');
        });

        $('span.option-btn').click(function(e){
            e.stopPropagation();
            $(this).parent('.msg-container').toggleClass('op-active');
        });

        $('.options').click(function(e){
            e.stopPropagation();
            let delNode = $(this).siblings('.key').text();
            //console.log(delNode);
            database.ref("/whatsapp").child(delNode).remove();
        });
    });

    $(".send-btn").click(function(){
        let inp = $("#inp").val();
        
        database.ref("/whatsapp").push({
            author: "Piyush",
            message: inp
        });

        $("#inp").val("");
        scrollTo();
    });

    $('window').resize(function(){
        scrollTo();
    });

});