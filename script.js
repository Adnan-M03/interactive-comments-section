const fetchfiles = fetch('data.json');
const body = document.querySelector('body');
const html = document.querySelector('html');
const para = document.getElementById('');
const overlay = document.createElement('div');

overlay.setAttribute('id', 'overlay');

let count = 4;
let scorePara;
let datas;
//let comments;
 
function comms(data){
    let content = '';
    let currentUser = '';
    let reply = '';
    let value = '';
     
    data.comments.map(obj=>{
        if(obj.user.username !== 'juliusomo'){
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
        }else{
            content += 
                `<div class="comment-container" data-id = "${obj.id}">
                    <span class="user-date">
                        <img src="${obj.user.image.png}" alt="">
                        <p>${obj.user.username}</p>
                        <p class="you">you</p>
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
                    <div>
                        <button class="delete-btn" data-id = "${obj.id}">
                            <img src="images/icon-delete.svg" alt="">
                            Delete
                        </button>
                        <button class="edit-btn" data-id = "${obj.id}">
                            <img src="images/icon-edit.svg" alt="">
                            Edit
                        </button>
                    </div>
                </div>`
        }
            if(obj.replies[0] !== undefined){
                obj.replies.map( objects =>{
                    //if(objects.user.username !== 'juliusomo'){}else{}
                    if(objects.user.username !== 'juliusomo'){
                        value = 
                        `<div class="replies-container" data-reply-id = "${objects.id}">
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
                        </div>`;
                        /*content += value;*/
                        reply += value;
                        content += value;
                    }else{
                        value =
                        `<div class="replies-container" data-reply-id = "${objects.id}">
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
                            <div>
                            <button class="delete-btn" data-id = "${objects.id}">
                                <img src="images/icon-delete.svg" alt="">
                                Delete
                            </button>
                            <button class="edit-btn" data-id = "${objects.id}">
                                <img src="images/icon-edit.svg" alt="">
                                Edit
                            </button>
                            </div>
                            </div>`;
                        /*content += value;*/
                        reply += value;
                        content += value;
                    }
                })
            }
            
    })
    currentUser =  
    `<div class="current-user">
        <img src="${data.currentUser.user.image.png}" alt="" class="current-user-img">
        <textarea class="current-user-input" placeholder = 'Add a comment'></textarea>
        <input class="current-user-btn" value="SEND" type="submit"></input>
    </div>`

    let replies = `<div class = "body-replies">
    ${reply}
    </div>
    `
    //console.log(replies);
    body.innerHTML = content + currentUser;
    html.prepend(overlay);
    overlay.style.display = 'none';
    update()
}

// Picked it up from deepseek for counting the time
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
    if(seconds < 1){ // Added this myself : Instead of it saying 0 seconds ago it says now
        return 'now';
    }else{
        return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
}

function updateTimeAgo(){}


            // Below function adds all the event listener's

function update(){
    const incrBtns = document.querySelectorAll('.incr');
    const decrBtns = document.querySelectorAll('.decr');
    const replyBtns = document.querySelectorAll('.reply-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const editBtns = document.querySelectorAll('.edit-btn');
    const sendBtn = document.querySelector('.current-user-btn');
    console.log(sendBtn)




                        //  THE SEND BUTTON
    sendBtn.addEventListener('click', ()=>{
        let input = document.querySelector('.current-user-input');
        let value = input.value;
        if(value !== ''){
            let commentDate = new Date();
            count += 1;
            class people {
                constructor(content,createdAt,id,date){
                    this.content = content;
                    this.createdAt = createdAt;
                    this.id = id;
                    this.date = date;
                }
                replies = [];
                score = 0;
                user = datas.currentUser.user;
            }
            let object = Object.assign({}, new people(value,timeAgo(commentDate),count,new Date()));
            datas.comments.push(object);
            comms(datas);
        }else{
            input.style.border = '1px solid red';
            input.setAttribute('placeholder', 'Type atleast one character');
        }
    });





                        //  THE DELETE BUTTON
    deleteBtns.forEach(deleteBtn =>{
        deleteBtn.addEventListener('click', ()=>{
            let dataId = deleteBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);// The object itself which the button is clicked on
            let parentData;// For removing it from the objects parent

            // The below double for loops are used to check the array and also the subarray(the replies)
            if(person == undefined){
                for(comments of datas.comments){
                    if(comments == dataId){
                        person = datas.comments;
                    }
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                            parentData = comments.replies;
                        }
                    }
                }
            }else{
                parentData = datas.comments;
            }

            // The below div is the modal for comfirmation of the deletion
            let div = document.createElement('div');
            div.setAttribute('class', 'modal');
            div.innerHTML = `<h3 class="modal-header">Delete comment</h3>
                            <p class="modal-para">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                            <div class = "modal-btns">
                                <button class="modal-nobtn">NO, CANCEL</button>
                                <button class="modal-yesbtn">YES, DELETE</button>
                            </div>`;
            document.body.appendChild(div);
            console.log(overlay)
            overlay.style.display = 'inline';

            let yesBtn = document.querySelector('.modal-yesbtn');
            let noBtn = document.querySelector('.modal-nobtn');

            yesBtn.addEventListener('click', () =>{
                remove(true)
            });
            noBtn.addEventListener('click', remove);
            
            function remove(polarity){
                if(polarity == true){
                    let parent = deleteBtn.parentElement.parentElement;
                    let grandpa = parent.parentElement;
                    let index = parentData.indexOf(person);
                    parentData.splice(index,1);
                    grandpa.removeChild(parent);
                    document.body.removeChild(div);
                    overlay.style.display = 'none';
                    count -= 1;
                }else{
                    document.body.removeChild(div);
                    overlay.style.display = 'none';
                }
            }                
        })
    })


    function disable(polarity,editBtn){
        let deleteBtn = editBtn.previousElementSibling;
        if(polarity == true){
            editBtn.disabled = true;
            deleteBtn.disabled = true;
        }else{
            editBtn.disabled = false;
            deleteBtn.disabled = false;
        }
    }
                        //  THE EDIT BUTTON
    editBtns.forEach(editBtn =>{
        editBtn.addEventListener('click', ()=>{
            let parent = editBtn.parentElement.parentElement;
            let dataId = editBtn.getAttribute('data-id');
            let person = datas.comments.find(item => item.id == dataId);
            let para = parent.querySelector('.comment-para');
            let div = document.createElement('div');
            let polarity = false;

            if(person == undefined){
                for(comments of datas.comments){
                    for(replies of comments.replies){
                        if(replies.id == dataId){
                            person = replies;
                        }
                    }
                }
            }else{
                polarity = true;// --commented for myself-- for the case of being a direct send comment and not a reply
            }
            let content = 
            `<textarea class="current-user-input" placeholder="Edit">${person.content}</textarea>
            <input class="current-user-btn" value="UPDATE" type="submit"></input>`;
            div.innerHTML = content;
            div.setAttribute('class', 'current-user-edit')
            parent.insertBefore(div, para);// Good function for not messing up the placement of the elements
            parent.removeChild(para);
            disable(true,editBtn);

            let input = parent.querySelector('.current-user-input');
            let btn = parent.querySelector('.current-user-btn');
            input.focus();
            // Below i added a kind of error handling with placeholder and border change on the input
            btn.addEventListener('click', ()=>{
                if(input.value !== ''){
                    let value = input.value;
                    let para = document.createElement('p');
                    let content = polarity === false ?`<b>${person.replyingTo}</b> ${value}` : `${value}`;// Ternary operator --commented for myself-- for incase of comment send not reply
                    para.setAttribute('class', 'comment-para');
                    para.innerHTML = content;
                    parent.insertBefore(para, div);
                    parent.removeChild(div);
                    person.content = `${value}`;
                    disable(false,editBtn)

                }else{
                    input.style.border = '2px solid red';
                    input.setAttribute('placeholder','Types atleast one character');
                }

            })
        })
    })



                        //  THE REPLY BUTTON
    replyBtns.forEach(replyBtn =>{
        replyBtn.addEventListener('click', ()=>{
            let parentSibling = replyBtn.parentElement.nextElementSibling;
            let body = document.querySelector('body');
            const clickedReply = document.querySelector('.current-user-reply');
            if(!clickedReply){
                let dataId = replyBtn.getAttribute('data-id');
                let person = datas.comments.find(item => item.id == dataId);//The object where i twick its data
                let user;
                let personTwo;
                let polarity = false;

                if(person == undefined){
                    for(comments of datas.comments){
                        let replyExists = comments.replies.some(reply => reply.replyingTo == comments.user.username);// Here we have to find the parent for the reply.
                        if (replyExists) {
                            person = comments; // Return the parent comment
                            console.log(comments);
                        }
                        for(replies of comments.replies){
                            if(replies.id == dataId){
                                personTwo = replies;
                            }
                        }
                    }
                // --commented for myself-- The user must be the one i am replying to regardless of were the reply is saved
                    user = personTwo.user.username;
                    polarity = true;
                }else{
                    user = person.user.username;
                }
                
                let content = 
                `<img src="${datas.currentUser.user.image.png}" alt="" class="current-user-img">
                <textarea class="current-user-input" placeholder="Reply"></textarea>
                <input class="current-user-btn" value="REPLY" type="submit"></input>`;
                let div = document.createElement('div');
                div.setAttribute('class','current-user-reply');
                polarity == true && div.setAttribute('id','current-user-reply'); //functionality for left margin of the reply div
                div.innerHTML = content;
                body.insertBefore(div,parentSibling);
                let replyConfirm = document.querySelector('.current-user-reply .current-user-btn');
                let input = document.querySelector('.current-user-reply textarea');
                input.focus();
                replyConfirm.addEventListener('click', ()=>{
                    if(input.value !== ''){
                    count += 1;
                    console.log(count);
                    body.removeChild(div);
                    let value = input.value;
                    // Class for creating the new object/new reply
                    class people{
                        constructor(content,createdAt,score,replyingTo,id,date){
                            this.content = content;
                            this.createdAt = createdAt;
                            this.score = score;
                            this.replyingTo = replyingTo;
                            this.id = id;
                            this.date = date;
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
                    let replier = Object.assign({}, new people(`${value}`,timeAgo(commentDate),0,user,count,new Date()));
                    console.log(replier);
                    person.replies.push(replier);
                    comms(datas);
                }else{
                    input.style.border = '2px solid red';
                    input.setAttribute('placeholder','Type atleast one character');
                }
                })
            }
        })
    })



                        //  THE LIKING BUTTON
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
    


                        //  THE DISLIKING BUTTON
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



// Data.json file fetching
fetchfiles.then( response =>{
    datas = response.json()
    datas.then(data =>{
        datas = data;
        comms(data);
        setInterval(time,5000,timeAgo,datas);
    })
}) 

// Function to put into the interval to rewrite the createdAt time
function time(timeAgo,datas){
    let comments = datas.comments;
    comments.forEach((comment) =>{
        if(comment.date){
            comment.createdAt = timeAgo(comment.date);
        }else{
            if(comment.replies.length > 0){
                let replies = comment.replies;
                replies.forEach((reply) =>{
                    if(reply.date){
                        reply.createdAt = timeAgo(reply.date);
                    }
                });
            }
        }
    });
}