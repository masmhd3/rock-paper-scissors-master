const userRolePage = document.querySelector('.con')
const comRolePage = document.querySelector('.comPlayCart')
const userCards = document.querySelectorAll('.con div')
const userPicked = document.querySelector('.user-picked')
const housePicked = document.querySelector('.house-picked')

// when user choose a card

userCards.forEach((card) =>{
    card.addEventListener('click',function(){
        // hide and appear
        userRolePage.style.display = 'none'
        comRolePage.style.display = 'flex'
        setTimeout(() =>  comRolePage.style.opacity = '1', 50);

        // card that user have picked
        userPicked.style.borderColor = card.style.borderColor
        userPicked.firstChild.src = card.firstChild.src

        // computer choice
        let randomNumber = String(Math.floor(Math.random() * 3))
        setTimeout(() => {
            document.querySelector('.wait-pick').style.display = 'none'
            // appear house
            housePicked.style.display = 'flex'
            housePicked.style.opacity = '1'

            housePicked.style.borderColor = userCards[randomNumber].style.borderColor
            housePicked.firstChild.src = userCards[randomNumber].firstChild.src 
            let houseCard = userCards[randomNumber]
            gameRules(card,houseCard)
            

            // wait and appeart alert of result
            setTimeout(() => {
                document.querySelector('.alert-result').style.display = 'flex'
                document.querySelector('.alert-result').style.opacity = '1'
                result()
            }, 1000);
        },1000)
    })
})


/// rules of the game
const resAlert = document.querySelector('.resAlert')
let userNum = 0;
let comNum = 0;

function gameRules(card, houseCard) {
    const playerColor = card.style.borderColor.trim();
    const houseColor = houseCard.style.borderColor.trim();
    
    if (playerColor === houseColor) {
        resAlert.innerHTML = 'draw';
    } 
    else if (playerColor === 'rgb(72, 101, 244)') { 
        if (houseColor === 'rgb(220, 46, 78)') { 
            resAlert.innerHTML = 'you win';
            userNum++
        } else if (houseColor === 'rgb(236, 158, 14)') { 
            resAlert.innerHTML = 'you lose';
            comNum++
        }
    } 
    else if (playerColor === 'rgb(220, 46, 78)') { 
        if (houseColor === 'rgb(236, 158, 14)') { 
            resAlert.innerHTML = 'you win';
            userNum++
        } else if (houseColor === 'rgb(72, 101, 244)') { 
            resAlert.innerHTML = 'you lose';
            comNum++
        }
    } 
    else if (playerColor === 'rgb(236, 158, 14)') { 
        if (houseColor === 'rgb(72, 101, 244)') { 
            resAlert.innerHTML = 'you win';
            userNum++
        } else if (houseColor === 'rgb(220, 46, 78)') { 
            resAlert.innerHTML = 'you lose';
            comNum++
        }
    }
    ///
    updateResultRound(userNum,comNum)
}



// next round
const btnNext = document.querySelector('.btnResult')
btnNext.addEventListener('click',function(){
    // hide alert
    document.querySelector('.alert-result').style.display = 'none'
    document.querySelector('.alert-result').style.opacity = '0'
    
    // hide house
    housePicked.style.display = 'none'
    housePicked.style.opacity = '0'
    document.querySelector('.wait-pick').style.display = 'block'

     // hide and appear
     userRolePage.style.display = 'grid'
     comRolePage.style.display = 'none'

    //  
    nextRound()
    if(btnNext.innerHTML == 'next game'){
        userNum = 0;
        comNum = 0;
        document.querySelector('.userN').innerHTML = userNum
        document.querySelector('.comN').innerHTML = comNum
    }
    //
})

/// next Round
const roundNumber = document.querySelector('.roundNumber')
function nextRound(){
    if(Number(roundNumber.innerHTML) >= 3){
        roundNumber.innerHTML = 1
    }else{
        roundNumber.innerHTML = Number(roundNumber.innerHTML) + 1
    }
}

// put data
localStorage.scoreNum;
const scoreNumber = document.querySelector('.s-number')
if(localStorage.scoreNum != null){
    scoreNumber.innerHTML = JSON.parse(localStorage.scoreNum)
}
function result(){
    if(Number(roundNumber.innerHTML) == 3 ){
        btnNext.innerHTML = 'next game'
        document.querySelector('.gameOver').style.display = 'block'
        if(userNum > comNum){
            document.querySelector('.resAlert').innerHTML = '🎉congratulations🎉'
            scoreNumber.innerHTML = Number(scoreNumber.innerHTML) + 1
            localStorage.scoreNum = JSON.stringify(scoreNumber.innerHTML)
        }
        else if(userNum < comNum){
            document.querySelector('.resAlert').innerHTML = '😢you lost😢'
        }
        else{
            document.querySelector('.resAlert').innerHTML = '🙂draw🙂'
        }

    }else{
        btnNext.innerHTML = 'next round'
        document.querySelector('.gameOver').style.display = 'none'
    }
}

//
const resultArelt = document.querySelector('.resultArelt')
function updateResultRound(userNum,comNum){
    resultArelt.innerHTML = `${userNum} : ${comNum}`
    document.querySelector('.userN').innerHTML = userNum
    document.querySelector('.comN').innerHTML = comNum
}


// 
const knowRules = document.getElementById('knowRules')
const rulePage = document.querySelector('.alertRules')
const closeRulePage = document.querySelectorAll('.closeRules')

knowRules.addEventListener('click',function(){
    rulePage.style.display = 'flex'
    setTimeout(() => {
        rulePage.style.opacity = '1'
    }, 100);
})
    

closeRulePage.forEach((btn) =>{
    btn.addEventListener('click',function(){
        setTimeout(() => {
            rulePage.style.opacity = '0'
            rulePage.style.display = 'none'
        }, 100);
    })
})