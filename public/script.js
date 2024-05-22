
let lastLength = 0;
let arrayOfChat = [];
window.onload =  () => {
    getMessage()
    freezeButton()
    window.scrollTo({
        top: 100,
        behavior: "smooth"
    });
    if(localStorage.getItem('nick')){
        document.getElementById('nickname').value = localStorage.getItem('nick')
    }else{
        localStorage.setItem('nick' , 'Аноним')
        document.getElementById('nickname').value = 'Аноним'
    }
    document.getElementById('welc').innerText = `Привет , ${localStorage.getItem('nick')} !`
}
//клиент и логика обработки
function updateNickname(){
    let nick = document.getElementById('nickname').value;
    localStorage.setItem('nick' , nick )
}
function freezeButton(){
    let btn = document.getElementById('send');
    btn.disabled = true;
    let count = 0;
    let intervalId = setInterval(()=>{
        count++;
        btn.innerText = `Подождите... ${count}`
        count == 10 ? unfreezeButton() : false;
    },1000) 
    function unfreezeButton(){
        clearInterval(intervalId)
        btn.disabled = false;
        btn.innerText = "Отправить";
    }
}
function addMessage(){
    let inp = document.getElementById('message');
    let inpNick = document.getElementById('nickname');
    if(!inpNick.value){
        setTimeout(()=> inpNick.style.background = '#FFFFFF', 1000)
        inpNick.style.background = '#ffb3b3'
    }
    if(!inp.value){
        setTimeout(()=> inp.style.background = '#FFFFFF', 1000)
        inp.style.background = '#ffb3b3'
    }else{
        if(inp.value.length > 200){
            alert('слишком длинное сообщение!!!у нас и так база данных на 5 мегабайт!(')
            inp.value = '';
            return 0;
        }
        let valueOnInput = `${localStorage.getItem('nick')}—${inp.value}`;
        // console.log(valueOnInput)
        inp.value = ''
        freezeButton()
        sendMessage(valueOnInput)
    }
}
//основа чата
function sendMessage(value){
    fetch('/send_msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: value
        })
    })
    .then(response => response.json())
    .then(data => { console.log(data)})
    .catch(error =>{console.error('Ошибка:', error);});
}
function getMessage(val){
    fetch('/get_chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            msg: 'send_chat'
        })
    })
    .then(response => response.json())
    .then(data => {
        arrayOfChat = data.res;
        lastLength = arrayOfChat.length ;
        if(val){
            let newArr = [];
            for(let i = 1; i < val+1 ; i++){
                newArr.push(arrayOfChat[arrayOfChat.length-i])
            }
            arrayOfChat = newArr;
        }
        // console.log(arrayOfChat)
        revert(arrayOfChat);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

}
// что-то вроде BAD реализации веб-сокета)))
function updateCli(){
    // console.log(lastLength + '<--- длина на клиенте')
    fetch('/get_length', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        lenOfChat = data.res[0]['COUNT(*)'];
        // console.log(lenOfChat + '<--- длина на сервере')
        if(lenOfChat > 500){
            deleteLastMsg()
        }
        if(lenOfChat > lastLength){
            getMessage(lenOfChat-lastLength);
        }else {
            return 0 ;
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}
//логика и клиентская часть в основном
function revert(arr){
    arr.forEach(el => {
        el = breakAndPaste(el)
        const chatElement = `<li class="message"><span class="content">${el}</span></li>`;
        document.getElementById('messages').innerHTML += chatElement;
    });
}
function deleteLastMsg(){
    fetch('/del_msg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getMessage(); // Update the chat after deleting the message
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}
function breakAndPaste(inputStr) {
    let parts = inputStr.split('—');
    let newStr = `<b>${parts[0]}</b> :<br>${parts[1]}`;
    return newStr;
}
setInterval(updateCli , 10000)