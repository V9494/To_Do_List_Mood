class dateTimeModal {
  createOpenDate(getDate, rejectDate) {
    this.blackOverly = document.createElement("div");
    this.blackOverly.classList.add("date-modal");

    setTimeout(() => {
      this.blackOverly.classList.toggle("open-date");
    }, 300);

    document.body.appendChild(this.blackOverly);

    this.dateCard = document.createElement("div");
    this.dateCard.classList.add("date_card");
    this.blackOverly.appendChild(this.dateCard);

    this.inputCard = document.createElement("input");
    this.inputCard.type = "date";
    this.inputCard.classList.add("edit-input");
    this.dateCard.appendChild(this.inputCard);

    this.confirmDate = document.createElement("button");
    this.confirmDate.classList.add("confirm-date");
    this.confirmDate.innerText = "Confirm Date";
    this.dateCard.appendChild(this.confirmDate);

    this.confirmDate.addEventListener("click", () => {
        if(this.inputCard.value == "")
        {
            alert("Please Select the Date");
        }
        else
        {
            const selectedDate = this.inputCard.value;
            setTimeout(() => {
                document.body.removeChild(this.blackOverly);
              }, 300);
              getDate(selectedDate);
        }

      
      
    });
  }


  createOpenTime(getTime,rejectTime) {
    this.blackOverly = document.createElement("div");
    this.blackOverly.classList.add("time-modal");

    setTimeout(() => {
        this.blackOverly.classList.toggle("open-time");
    }, 300);

    document.body.appendChild(this.blackOverly);

    this.timeCard = document.createElement("div");
    this.timeCard.classList.add("time_card");
    this.blackOverly.appendChild(this.timeCard);

    this.inputCard = document.createElement("input");
    this.inputCard.type = "time";
    this.inputCard.classList.add("edit-time");
    this.timeCard.appendChild(this.inputCard);

    this.confirmTime = document.createElement("button");
    this.confirmTime.classList.add("confirm-time");
    this.confirmTime.innerText = "Confirm Time";
    this.timeCard.appendChild(this.confirmTime);


    this.confirmTime.addEventListener("click", () => {
        const selectedTime = this.inputCard.value;
        
        
        document.body.removeChild(this.blackOverly);
        getTime(selectedTime);
      });

  }
  openDate() {
    return new Promise((resolve, reject) => {
      const getDate = (selectedDate) => {
        resolve(selectedDate);
      };

      const rejectDate = (error) => {
        reject(error);
      };

      this.createOpenDate(getDate, rejectDate);
    });
  }

  openTime(){
    return new Promise((resolve,reject) =>{
        const getTime = function(selectedTime){
            resolve(selectedTime);
        };

        const rejectTime = function(error){
            reject(error);
        }

        this.createOpenTime(getTime,rejectTime)

    })
  }
}
