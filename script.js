const fetchfiles = fetch('data.json');
const body = document.querySelector('body');
const para = document.getElementById('');
const overlay = document.createElement('div');
overlay.setAttribute('id', 'overlay')

let scorePara;
let datas;
let comments;
let count = 4;

function comms(data){
    let content = '';
    let currentUser = '';
     
    data.comments.map(obj=>{
            content +=  
            `<div class="comment-container" data-id="${obj.id}">
                <span class="user-date">
                    <img src="${obj.user.image.png}" alt="">
                    <p>${obj.user.username}</p>
                    <p>${obj.createdAt}</p>
                </span>
                <p class="comment-para">${obj.content}</p>
                <div class="vote-container">
                    <button class="incr" data-id = ${obj.id}>
                        <img src="images/icon-plus.svg" alt="" >
                    </button>
                    <p>${obj.score}</p>
                    <button class="decr" data-id = ${obj.id}>
                        <img src="images/icon-minus.svg" alt="" >
                    </button>
                </div>
                <button class="reply-btn" data-id = ${obj.id}>
                    <img src="images/icon-reply.svg" alt="">
                    Reply
                </button>
            </div>`;
            if(obj.replies[0] !== undefined){
                obj.replies.map( objects =>{
                    //if(objects.user.username !== 'juliusomo'){}else{}
                    if(objects.user.username !== 'juliusomo'){
                        content += 
                        `<div class="replies-container" data-id = "${objects.id}">
                            <span class="user-date">
                                <img src="${objects.user.image.png}" alt="">
                                <p>${objects.user.username}</p>
                                <p>${objects.createdAt}</p>
                            </span>
                            <p class="comment-para"><b>@${objects.replyingTo}</b> ${objects.content}</p>
                            <div class="vote-container">
                                <button class="incr" data-id = ${objects.id}>
                                    <img src="images/icon-plus.svg" alt="" >
                                </button>
                                <p>${objects.score}</p>
                                <button class="decr" data-id = ${objects.id}>
                                    <img src="images/icon-minus.svg" alt="" >
                                </button>
                            </div>
                            <button class="reply-btn" data-id = ${objects.id}>
                                <img src="images/icon-reply.svg" alt="">
                                Reply
                            </button>
                        </div>`
                    }else{
                        content += 
                        `<div class="replies-container" data-id = "${objects.id}">
                            <span class="user-date">
                                <img src="${objects.user.image.png}" alt="">
                                <p>${objects.user.username}</p>
                                <p class="you">you</p>
                                <p>${objects.createdAt}</p>
                            </span>
                            <p class="comment-para"><b>@${objects.replyingTo}</b> ${objects.content}</p>
                            <div class="vote-container">
                                <button class="incr" data-id = ${objects.id}>
                                    <img src="images/icon-plus.svg" alt="" >
                                </button>
                                <p>${objects.score}</p>
                                <button class="decr" data-id = ${objects.id}>
                                    <img src="images/icon-minus.svg" alt="" >
                                </button>
                            </div>
                            <button class="delete-btn" data-id = "${objects.id}">
                                <img src="images/icon-delete.svg" alt="">
                                Delete
                            </button>
                            <button class="edit-btn" data-id = "${objects.id}">
                                <img src="images/icon-edit.svg" alt="">
                                Edit
                            </button>
                        </div>`
                    }
                })
            }
            
    })
    currentUser =  
    `<div class="current-user">
        <img src="${data.currentUser.user.image.png}" alt="" class="current-user-img">
        <input class="current-user-input" placeholder = 'Add a comment'></input>
        <input class="current-user-btn" value="SEND" type="submit"></input>
    </div>`

    body.innerHTML = content + currentUser;
    body.prepend(overlay);
    update()
    
}

function timeAgo(date) {
    const now = new Date();
    const past = new Date(date); // Ensure the input is a Date object
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000); // Years
    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000); // Months
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400); // Days
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600); // Hours
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60); // Minutes
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}


function update(){
    let incrBtns = document.querySelectorAll('.incr');
    let decrBtns = document.querySelectorAll('.decr');
    let replyBtns = document.querySelectorAll('.reply-btn');
    let deleteBtns = document.querySelectorAll('.delete-btn');
    let editBtns = document.querySelectorAll('.edit-btn');

    deleteBtns.forEach(deleteBtn =>{
        deleteBtn.addEventListener('click', ()=>{
            /*let person = datas.comments.find(item => item.id == dataId);
            if(person == undefined){
                for(comments of datas.comments){
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                        }
                    }
                }
            }*/
            let div = document.createElement('div');
            div.setAttribute('class', 'modal');
            div.innerHTML = `<h2 class="modal-header">Delete comment</h2>
                            <p class="modal-para">Are you sure you want to remove the comment? This will remove the comment and can't be undone.</p>
                            <button class="modal-nobtn">NO, CANCEL</button>
                            <button class="modal-yesbtn">YES, DELETE</button>`;
            document.body.appendChild(div);
            console.log(overlay)
            /*overlay.styles.opacity = '0';*/
            
            function remove(){
                let parent = deleteBtn.parentElement;
                let grandpa = parent.parentElement;
                grandpa.removeChild(parent);
                
            }                
        })
    })

    editBtns.forEach(editBtn =>{
        editBtn.addEventListener('click', ()=>{
            let parent = editBtn.parentElement;
            let dataId = editBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);
            let para = parent.querySelector('.comment-para');
            let div = document.createElement('div');

            if(person == undefined){
                for(comments of datas.comments){
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                        }
                    }
                }
            }
            let content = 
            `<div class="current-user-edit">
                <img src="${datas.currentUser.user.image.png}" alt="" class="current-user-img">
                <input class="current-user-input" value="${person.content}" placeholder="Edit"></input>
                <input class="current-user-btn" value="UPDATE" type="submit"></input>
            </div>`;
            div.innerHTML = content;
            parent.insertBefore(div, para);
            parent.removeChild(para);

            let input = parent.querySelector('.current-user-input');
            let btn = parent.querySelector('.current-user-btn');
            btn.addEventListener('click', ()=>{
                let value = input.value;
                let para = document.createElement('p');
                let content = `<b>${person.replyingTo}</b> ${value}`;
                para.setAttribute('class', 'comment-para');
                para.innerHTML = content;
                parent.insertBefore(para, div);
                parent.removeChild(div);
                person.content = `${value}`;

            })
        })
    })

    replyBtns.forEach(replyBtn =>{
        replyBtn.addEventListener('click', ()=>{
            let dataId = replyBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);//The object where i twick its data
            let user;
            let personTwo;
            let parent = replyBtn.parentElement; 
            if(person == undefined){
                for(comments of datas.comments){
                    person = comments;
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            personTwo = replies;
                        }
                    }
                }

        // The user must be the one i am replying to regardless of were the reply is saved
                user = personTwo.user.username;
            }else{
                user = person.user.username;
            }
            
            let content = 
            `<div class="current-user-reply">
                <img src="${datas.currentUser.user.image.png}" alt="" class="current-user-img">
                <input class="current-user-input" placeholder="Reply"></input>
                <input class="current-user-btn" value="REPLY" type="submit"></input>
            </div>`;
            let div = document.createElement('div');
            div.innerHTML = content;
            parent.appendChild(div);
            let me = parent.querySelector('.current-user-btn');
            let input = parent.querySelector('.current-user-input');
            input.focus();
            me.addEventListener('click', ()=>{
                count += 1;
                parent = replyBtn.parentElement; 
                parent.removeChild(div);
                let value = input.value;
                class people{
                    constructor(content,createdAt,score,replyingTo,id){
                        this.content = content;
                        this.createdAt = createdAt;
                        this.score = score;
                        this.replyingTo = replyingTo;
                        this.id = id;
                    }
                    user = {
                        image: {
                            png: "./images/avatars/image-juliusomo.png",
                            webp: "./images/avatars/image-juliusomo.webp"
                        },
                        username: "juliusomo"
                    }
                }
                let commentDate = new Date();
                let replier = Object.assign({}, new people(`${value}`,timeAgo(commentDate),0,user,count));
                /*let replier = datas.currentUser;
                 replier.content = `${value}`;
                 replier.createdAt = 'Today';
                 replier.score = 0;
                 replier.replyingTo = user;*/
                person.replies.push(replier);
                comms(datas);


            })
            
        })
    })

    

    incrBtns.forEach(incrBtn =>{
        incrBtn.addEventListener('click' , ()=>{
            scorePara = incrBtn.nextElementSibling;
            scorePara.textContent = Number(scorePara.textContent) + 1;
            let dataId = incrBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);
            if(person == undefined){
                for(comments of datas.comments){
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                        }
                    }
                }
                person.score = scorePara.textContent;
            }else{
                person.score = scorePara.textContent;
            } 
        })
        
    })
    decrBtns.forEach(decrBtn =>{
        decrBtn.addEventListener('click' , ()=>{
            scorePara = decrBtn.previousElementSibling;
            scorePara.textContent = Number(scorePara.textContent) - 1;
            let dataId = decrBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);
            if(person == undefined){
                for(comments of datas.comments){
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                        }
                    }
                }
                person.score = scorePara.textContent;
            }else{
                person.score = scorePara.textContent;
            } 
        })
    })
}



fetchfiles.then( response =>{
    datas = response.json()
    datas.then(data =>{
        datas = data;
        comms(data);
    })
}) 