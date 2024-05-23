
class emojiModal{
    createOpenEmoji(clickedEmotion,notClickedEmotion)
    {
        this.blackOverly = document.createElement('div');
        this.blackOverly.classList.add('edit-emoji');
        document.body.appendChild(this.blackOverly);

        const title = document.createElement('h1');
        title.textContent = "Describe The Mood During The Task";
        this.blackOverly.appendChild(title);

        this.emojiCard = document.createElement('div');
        this.emojiCard.classList.add('emoji-card');
        this.blackOverly.appendChild(this.emojiCard);

        this.angryContainer = document.createElement('div');
        this.angryContainer.classList.toggle('emoji-container')
        this.angryContainer.classList.toggle('angry');
        this.angryContainer.innerHTML = `
        <h2>🤬</h2>
        <p>Angry</p>
        `
        this.emojiCard.appendChild(this.angryContainer)
        this.angryContainer.addEventListener('click',()=>{
            clickedEmotion("🤬");
            
            setTimeout(()=>{
                document.body.removeChild(this.blackOverly);
            },500)
        });

        this.happyContainer = document.createElement('div');
        this.happyContainer.classList.toggle('emoji-container')
        this.happyContainer.classList.toggle('happy');
        this.happyContainer.innerHTML = `
        <h2>😊</h2>
        <p>Happy</p>
        `
        this.emojiCard.appendChild(this.happyContainer);
        this.happyContainer.addEventListener('click',()=>{
            clickedEmotion("😊");
            
            setTimeout(()=>{
                document.body.removeChild(this.blackOverly);
            },500)
        });

        this.sadContainer = document.createElement('div');
        this.sadContainer.classList.toggle('emoji-container')
        this.sadContainer.classList.toggle('sad');
        this.sadContainer.innerHTML = `
        <h2>😔</h2>
        <p>Sad</p>
        `
        this.emojiCard.appendChild(this.sadContainer);
        this.sadContainer.addEventListener('click',()=>{
            clickedEmotion("😔");
            
            setTimeout(()=>{
                document.body.removeChild(this.blackOverly);
            },500)
        });

        this.frustratedContainer = document.createElement('div');
        this.frustratedContainer.classList.toggle('emoji-container')
        this.frustratedContainer.classList.toggle('frustrated');
        this.frustratedContainer.innerHTML = `
        <h2>🤯</h2>
        <p>Frustrated</p>
        `

        this.emojiCard.appendChild(this.frustratedContainer)
        this.frustratedContainer.addEventListener('click',()=>{
            clickedEmotion("🤯");
            
            setTimeout(()=>{
                document.body.removeChild(this.blackOverly);
            },500)
        });
        this.easyContainer = document.createElement('div');
        this.easyContainer.classList.toggle('emoji-container')
        this.easyContainer.classList.toggle('easy');
        this.easyContainer.innerHTML = `
        <h2>😎</h2>
        <p>Easy Peasy</p>
        `
        this.emojiCard.appendChild(this.easyContainer)
        this.easyContainer.addEventListener('click',()=>{
            clickedEmotion("😎");
            
            setTimeout(()=>{
                document.body.removeChild(this.blackOverly);
            },500)
        });

    }

    open(){
        return new Promise((resolve,reject)=>{
            return this.createOpenEmoji(resolve,reject);
        })
    }
    

}

