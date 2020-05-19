class Person {
  constructor(name, lastName, phone, email, idCard, birthday) {
    this.Name = name;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.idCard = idCard;
    this.birthday = birthday;
    this.key = Math.random()
  }
}


// Methods for the user interface
class UI {
    // Card Creation
  CreateCard(person) {
    const container = document.getElementById("CardContainer");
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="card text-white bg-primary col-sm-6 m-1" style="max-width: 20rem;">
        <div class="card-body">
        <h4 class="card-title">${person.Name} ${person.lastName}</h4>
        <p class="card-text">
            Phone: ${person.phone}
            </br>
            email: ${person.email}
            </br>
            ID: ${person.idCard}
            </br>
            Birthday: ${person.birthday}
        </p>
        <button key = "${person.key}" id = "${person.key}" name = "delete" type="button" class="btn btn-primary btn-danger btn-block">Delete</button>
        <button key = "${person.key}" id = "${person.key}" name = "edit" type="button" class="btn btn-primary btn-warning btn-block">Edit</button>
        </div>
        </div>
        `;
    container.appendChild(element);
    this.resetForm();
  }

  // Edit Person
  editPerson(element){
    if (element.name === "edit"){
        for (const [key, value] of Object.entries(localStorage)) {
            if (JSON.parse(value).key == element.id) {
                let personInstance = JSON.parse(value)
                document.getElementById("Name").value = personInstance.Name
                document.getElementById("LastName").value = personInstance.lastName
                document.getElementById("Phone").value = personInstance.phone
                document.getElementById("Email").value = personInstance.email
                document.getElementById("idCard").value = personInstance.idCard
                document.getElementById("Birthday").value = personInstance.birthday
                this.deletePerson(element)
            }
        }
    }
  }



  // Delete person
  deletePerson(element){
      if (element.name === "delete") {
        element.parentElement.parentElement.remove();
        this.showMessage("Person Deleted Successfully", "info")

        for (const [key, object] of Object.entries(localStorage)) {
            if (JSON.parse(object).key == element.id) {
                localStorage.removeItem(key)
            }
        }
    }

  }


  //Showing messages method
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("body");
    const fieldset = document.querySelector(".fieldset");
    container.insertBefore(div, fieldset);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  resetForm() {
    document.getElementById("personForm").reset();
  }
}

// WORKING WITH EVENTS
document.getElementById("personForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("Name").value;
    const lastName = document.getElementById("LastName").value;
    const phone = document.getElementById("Phone").value;
    const email = document.getElementById("Email").value;
    const idCard = document.getElementById("idCard").value;
    const birthday = document.getElementById("Birthday").value;

  const person = new Person(name, lastName, phone, email, idCard, birthday);
  const ui = new UI();

  if (
    name === "" ||
    lastName === "" ||
    phone === "" ||
    email === "" ||
    idCard === "" ||
    birthday === "") 
    {
    return ui.showMessage("Complete all fields please", "danger");
    }
    
    // Create Card
    ui.CreateCard(person);

    //Saving on localstorage
    localStorage.setItem(Math.random(),JSON.stringify(person))
  
});

    const ui = new UI();
    for (const [key , object] of Object.entries(localStorage)){
        ui.CreateCard(JSON.parse(object))
    }


document.getElementById("CardContainer").addEventListener("click", function(e){
    try {
    const ui = new UI();
    ui.deletePerson(e.target)
    ui.editPerson(e.target);
    }
    catch (e){
        console.log(e)
    }
    
})

