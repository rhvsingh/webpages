const channelShow = document.getElementById('channel-list');

channelShow.onclick = () => {
    document.getElementById('recent-channels').classList.toggle('active');
}

const introPage = document.getElementById('intro-page');
const channelPage = document.getElementById('channel-page');
const messagePage = document.getElementsByClassName('message-page');
const channelName = document.getElementById('channel-name');
const selectPrivacy = document.getElementById('select-privacy');
const recentChannel = document.getElementById('recent-channels');
const pageShow = document.getElementById('page-show');
const messageButton = document.getElementsByClassName('message-textarea');
const messageBox = document.getElementsByClassName('message-box');


var buttonClick = 0;

function createChannel() {
    if (buttonClick == 0) {
        buttonClick = 1;
    } else {

        pageShow.style.display = 'flex';
        for (let i = 0; i < messagePage.length; i++) {
            messagePage[i].classList.remove('active');
        }
    }
    introPage.style.visibility = 'hidden';
    introPage.style.opacity = '0';

    setTimeout(function() {
        introPage.style.display = 'none';
        channelPage.style.display = 'block';
        channelPage.style.visibility = 'visible';
        channelPage.style.opacity = '1';
    }, 400);
}




function addChannel() {

    let channelNameAdded = channelName.value;
    let liList = document.createElement('li');
    let divBox = document.createElement('div');

    if (!(channelNameAdded == '')) {
        if (!(selectPrivacy.value == '0')) {

            let randID = Math.floor(Math.random() * Date.now());
            //alert(randID);
            liList.setAttribute('id', randID);
            liList.setAttribute('class', 'list-elements added-channels');

            channelPage.style.visibility = 'hidden';
            channelPage.style.opacity = '0';
            divBox.className = 'info-pages';

            setTimeout(function() {
                channelPage.style.display = 'none';
                pageShow.style.display = 'block';
                divBox.className = 'info-pages message-page active';
            }, 400);

            divBox.setAttribute('id', randID);

            let innerContent = '<i class="fa fa-commenting"></i> ' + channelNameAdded;
            let boxContent = "<div class='message-header'><div><i class='fa fa-hashtag'></i><i class='fa fa-star-o' style='font-weight:bold;'></i></div><div><i class='fa fa-user-plus'></i><i class='fa fa-info-circle'></i></div></div><div class='message-box' id='" + randID + "'></div><div class='message-textarea'><input type='text' class='message-textarea' id='" + randID + "' placeholder='Message Undefined'></div></div>";
            innerContent = innerContent.trim(innerContent);
            boxContent = boxContent.trim(boxContent);

            liList.innerHTML = innerContent;
            divBox.innerHTML = boxContent;
            let textnode = document.createTextNode(innerContent);
            //node.appendChild(textnode);
            //node.appendChild(innerContent);
            //privacyNameAdded = selectPrivacy.value;
            recentChannel.insertBefore(liList, recentChannel.childNodes[0]);
            //recentChannel.appendChild(node);
            pageShow.appendChild(divBox);
            channelName.value = '';
            selectPrivacy.selectedIndex = 0;
            addClasses();
            for (let i = 0; i < messageButton.length; i++) {
                if (messageButton[i].hasAttribute('id')) {
                    if (messageButton[i].getAttribute('id') == randID) {
                        messageButton[i].addEventListener('keypress', function(e) {
                            if (e.keyCode == 13) {
                                //console.log(e.target.value);
                                //console.log(e.target.id);
                                let paraGraph = document.createElement('p');
                                let textnode = document.createTextNode(e.target.value);
                                paraGraph.appendChild(textnode);
                                for (let j = 0; j < messageBox.length; j++) {
                                    if (messageBox[j].hasAttribute('id')) {
                                        if (messageBox[j].getAttribute('id') == e.target.id) {
                                            messageBox[j].insertBefore(paraGraph, messageBox[j].childNodes[0]);
                                            //messageBox.appendChild(paraGraph);
                                            messageButton[i].value = '';
                                        }
                                    }
                                }
                            } else {
                                //console.log('Yeah baby');
                            }
                        });
                    }
                }

            }

        } else {
            alert('Please select privacy');
        }
    } else {
        alert('Please enter channel name');
    }

}

addClasses();

function addClasses() {
    var listElements = document.querySelectorAll('.list-elements');
    for (let i = 0; i < listElements.length; i++) {
        if (listElements[i].classList.contains('added-channels')) {
            listElements[i].onclick = function() {
                //console.log(listElements[i].getAttribute('id'));
                let id = listElements[i].getAttribute('id');
                messagePage.length
                for (let i = 0; i < messagePage.length; i++) {
                    if (id == messagePage[i].getAttribute('id')) {
                        //console.log('True');
                        let j = 0;
                        while (j < messagePage.length) {
                            messagePage[j++].className = "info-pages message-page";
                        }
                        messagePage[i].className = "info-pages message-page active";
                    } else {
                        /* console.log('False'); */
                    }
                }
                pageShow.style.display = 'block';
                channelPage.style.display = 'none';
                channelPage.style.visibility = 'hidden';
                channelPage.style.opacity = '0';
            }
        } else {
            //console.log('Not contains');
        }
    }
}