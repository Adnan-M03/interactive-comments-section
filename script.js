const fetchfiles = fetch('data.json');
const body = document.querySelector('body')
let datas;
let comments;

function comms(data){
    let content = '';
    let currentUser = '';
     
    data.comments.map(obj=>{
            content +=  
            `<div class="comment-container">
                <span class="user-date">
                    <img src="${obj.user.image.png}" alt="">
                    <p>${obj.user.username}</p>
                    <p>${obj.createdAt}</p>
                </span>
                <p class="comment-para">${obj.content}</p>
                <div class="vote-container">
                    <button class="incr">
                        <img src="images/icon-plus.svg" alt="" >
                    </button>
                    <p>${obj.score}</p>
                    <button class="decr">
                        <img src="images/icon-minus.svg" alt="" >
                    </button>
                </div>
                <button class="reply-btn">
                    <img src="images/icon-reply.svg" alt="">
                    Reply
                </button>
            </div>`;
            if(obj.replies[0] !== undefined){
                obj.replies.map( objects =>{
                    content += 
                    `<div class="replies-container">
                        <span class="user-date">
                            <img src="${objects.user.image.png}" alt="">
                            <p>${objects.user.username}</p>
                            <p>${objects.createdAt}</p>
                        </span>
                        <p class="comment-para">@${objects.replyingTo} ${objects.content}</p>
                        <div class="vote-container"></div>
                        <button class="reply-btn">
                            <img src="images/icon-reply.svg" alt="">
                            Reply
                        </button>
                    </div>`
                })
            }
            
    })
    currentUser =  
    `<div class="current-user">
        <img src="${data.currentUser.image.png}" alt="" class="current-user-img">
        <input class="current-user-input" placeholder = 'Add a comment'></input>
        <button class="current-user-btn">SEND</button>
    </div>`

    body.innerHTML = content +currentUser;
}

fetchfiles.then( response =>{
    response.json()
    .then(data =>{
        comms(data);
    })
}) 