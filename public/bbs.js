"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});


//編集機能
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        const postDiv = event.target.closest('.cover');
        const messageSpan = postDiv.querySelector('.mes');
        const originalMessage = messageSpan.innerText;
        
        // 入力フィールド化
        const input = document.createElement('input');
        input.value = originalMessage;
        messageSpan.replaceWith(input);

        // 保存ボタンを追加
        const saveButton = document.createElement('button');
        saveButton.innerText = "保存";
        postDiv.appendChild(saveButton);

        saveButton.addEventListener('click', () => {
            const newMessage = input.value;
            const params = {
                method: "POST",
                body: `id=${postDiv.dataset.id}&message=${newMessage}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            fetch('/edit', params)
                .then(response => response.json())
                .then(data => {
                    input.replaceWith(messageSpan);
                    messageSpan.innerText = newMessage;
                    saveButton.remove();
                })
                .catch(console.error);
        });
    }
});


// 検索機能

document.querySelector('#search-button').addEventListener('click', () => {
    const searchQuery = document.querySelector('#search-box').value;

    const params = {
        method: "POST",
        body: `query=${searchQuery}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch('/search', params)
        .then(response => response.json())
        .then(data => {
            const bbs = document.querySelector('#bbs');
            bbs.innerHTML = '';
            data.results.forEach(post => {
                let cover = document.createElement('div');
                cover.className = 'cover';
                cover.innerHTML = `
                    <span class="name">${post.name}</span>
                    <span class="mes">${post.message}</span>
                     <button class="edit">編集</button>
                    <button class="reply">返信</button>
                `;
                cover.dataset.id = post.id;
                bbs.appendChild(cover);
            });
        })
        .catch(console.error);
});

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${name}&message=${message}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch('/post', params)
        .then(response => response.json())
        .then(data => {
            const bbs = document.querySelector('#bbs');
            let cover = document.createElement('div');
            cover.className = 'cover';
            cover.innerHTML = `
                <span class="name">${name}</span>
                <span class="mes">${message}</span>
                 <button class="edit">編集</button>
                <button class="reply">返信</button>
            `;
            cover.dataset.id = data.number - 1;  // サーバが返す投稿番号をセット
            bbs.prepend(cover);  // 最新の投稿を上に表示
        })
        .catch(console.error);
});



    // 返信機能
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('reply')) {
        const postDiv = event.target.closest('.cover');
        const replyForm = document.createElement('div');

        replyForm.innerHTML = `
            <input type="text" class="reply-message" placeholder="返信を入力">
            <button class="send-reply">送信</button>
        `;
        postDiv.appendChild(replyForm);

        replyForm.querySelector('.send-reply').addEventListener('click', () => {
            const replyMessage = replyForm.querySelector('.reply-message').value;

            fetch("/reply", {
                method: "POST",
                body: `id=${postDiv.dataset.id}&message=${replyMessage}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => response.json())
            .then(() => {
                replyForm.remove();
                const replyDiv = document.createElement('div');
                replyDiv.className = 'reply';
                replyDiv.innerText = replyMessage;
                postDiv.appendChild(replyDiv);
            })
            .catch(console.error);
        });
    }
});