const channelShow = document.getElementById('channel-list');

channelShow.onclick = () => {
    document.getElementById('recent-channels').classList.toggle('active');
}



const introPage = document.getElementById('intro-page');
const channelPage = document.getElementById('channel-page');
const messagePage = document.getElementById('message-page');
const channelName = document.getElementById('channel-name');
const selectPrivacy = document.getElementById('select-privacy');
const recentChannel = document.getElementById('recent-channels');
const pageShow = document.getElementById('page-show');

function createChannel() {
    introPage.style.visibility = 'hidden';
    introPage.style.opacity = '0';

    setTimeout(function() {
        channelPage.style.display = 'block';
        introPage.style.display = 'none';
        channelPage.style.visibility = 'visible';
        channelPage.style.opacity = '1';
    }, 400);
}


function addChannel() {

    let channelNameAdded = channelName.value;
    let privacyNameAdded;
    let liList = document.createElement('li');
    let divBox = document.createElement('div');

    if (!(channelNameAdded == '')) {
        if (!(selectPrivacy.value == '0')) {
            let randID = Math.floor(Math.random() * Date.now());
            //alert(randID);
            liList.setAttribute('id', randID);
            divBox.className = 'info-pages';
            divBox.setAttribute('id', randID);
            let innerContent = '<span class=""><i class="fa fa-commenting"></i></span> ' + channelNameAdded;
            let boxContent = "<div><div><span><i class='fa fa-hashtag'></i></span> <span><i class='fa fa-star-o'></i></span></div><div><span><i class='fa fa-user-plus'></i></span> <span><i class='fa fa-info-circle'></i></span></div></div><div><div><input type='text' id='' placeholder='Message Undefined'></div></div>";
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
        } else {
            alert('Please select privacy');
        }
    } else {
        alert('Please enter channel name');
    }


}