// import functions and grab DOM elements
import { renderMushroom, renderFriend, renderBerry } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const friendForm = document.querySelector('.friend-field');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;
let berryCount = 0;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else if (Math.random() > .5) {
        alert('found a strawberry!');
        berryCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {

    // get the name from the input
    const data = friendInputEl.value;
    // create a new friend object   
    const newFriend = {
        name: data || `Friend# ${Math.floor(Math.random() * 1000)}`,
        satisfaction: Math.floor(Math.random() * 2 + 1),
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    // display all the friends (use a function here)
    displayFriends();
    friendForm.reset();
});

friendForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // get the name from the input
    const data = new FormData(friendForm);
  
    // create a new friend object
    //console.log(data.get('friend-input'));

    let nameValue = data.get('friend-field');
    const newFriend = {
        name: nameValue || `Friend# ${Math.floor(Math.random() * 1000)}`,
        satisfaction: Math.floor(Math.random() * 2 + 1),
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);

    // reset the input
    friendForm.reset();
    // display all the friends (use a function here)
    displayFriends();
    
});



function displayFriends() {
    // clear out the friends in DOM
    friendsEl.innerHTML = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const newFriendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        newFriendEl.addEventListener('click', () => {
            if (mushroomCount === 0){
                alert('You\'re out of mushrooms!')
            }
            if (mushroomCount > 0 && friend.satisfaction < 3) {
                mushroomCount--;
                friend.satisfaction++;
                
                
            } else if (berryCount > 0 && friend.satisfaction < 4) {
                berryCount--;
                friend.satisfaction++;

            }
            
            displayFriends();
            displayMushrooms();

        });

        // append the friendEl to the friends list in DOM
        friendsEl.append(newFriendEl);
        
    }
    
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.innerHTML = '';
    
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const newMushroom = renderMushroom(i);
        
        mushroomsEl.append(newMushroom);
        

    }

    for (let i = 0; i < berryCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const newBerry = renderBerry(i);
        
        mushroomsEl.append(newBerry);
        

    }
}

displayFriends();
displayMushrooms();
