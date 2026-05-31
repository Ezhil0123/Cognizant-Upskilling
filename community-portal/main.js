// JAVASCRIPT BASICS

console.log("Welcome to the Community Portal");

window.onload = function () {

    alert("Page fully loaded!");

    loadSavedPreference();

    displayEvents();
};

// EVENT DATA

const portalName = "Local Community Event Portal";

const todayDate = "2026-05-25";

let availableSeats = 50;

// EVENT CLASS

class Event {

    constructor(name, category, date, seats) {

        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
    }
}

// PROTOTYPE METHOD

Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};

// EVENT ARRAY

let events = [

    new Event(
        "Music Festival",
        "Music",
        "2026-06-15",
        20
    ),

    new Event(
        "Food Carnival",
        "Food",
        "2026-06-20",
        0
    ),

    new Event(
        "Sports Day",
        "Sports",
        "2024-01-01",
        10
    ),

    new Event(
        "Art Workshop",
        "Art",
        "2026-07-10",
        25
    )
];

// ARRAY METHODS

// PUSH

events.push(

    new Event(
        "Baking Workshop",
        "Workshop",
        "2026-08-01",
        15
    )
);

// FILTER

const musicEvents = events.filter(

    event => event.category === "Music"
);

console.log("Music Events:", musicEvents);

// MAP

const eventCards = events.map(

    event => `Workshop on ${event.name}`
);

console.log(eventCards);

// DISPLAY EVENTS

function displayEvents(eventList = events) {

    const container =
        document.querySelector("#eventsContainer");

    if (!container) return;

    container.innerHTML = "";

    eventList.forEach(event => {

        // CONDITIONALS

        if (
            event.date < todayDate ||
            event.seats <= 0
        ) {

            return;
        }

        // CREATE ELEMENTS

        const card =
            document.createElement("div");

        card.className = "eventCard";

        card.innerHTML = `

            <h3>${event.name}</h3>

            <p>Category: ${event.category}</p>

            <p>Date: ${event.date}</p>

            <p>Seats: ${event.seats}</p>

            <button onclick="registerUser('${event.name}')">
                Register
            </button>
        `;

        container.appendChild(card);
    });
}

// FUNCTIONS

function addEvent(
    name,
    category,
    date,
    seats = 10
) {

    events.push(
        new Event(
            name,
            category,
            date,
            seats
        )
    );

    displayEvents();
}

// CLOSURE

function registrationTracker() {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        return totalRegistrations;
    };
}

const trackMusicRegistrations =
    registrationTracker();

// REGISTER USER

function registerUser(eventName) {

    try {

        let selectedEvent =
            events.find(
                event => event.name === eventName
            );

        if (!selectedEvent) {

            throw new Error("Event not found");
        }

        if (selectedEvent.seats <= 0) {

            throw new Error("No seats available");
        }

        selectedEvent.seats--;

        availableSeats--;

        trackMusicRegistrations();

        alert(
            `Registered for ${eventName}`
        );

        displayEvents();

    } catch (error) {

        console.error(error);

        alert(error.message);
    }
}

// FILTER EVENTS

function filterEventsByCategory(
    category,
    callback
) {

    const clonedEvents = [...events];

    const filtered =
        clonedEvents.filter(

            event =>
                event.category
                    .toLowerCase()
                    .includes(
                        category.toLowerCase()
                    )
        );

    callback(filtered);
}

// DOM MANIPULATION

const categoryFilter =
    document.querySelector("#categoryFilter");

if (categoryFilter) {

    categoryFilter.onchange = function () {

        filterEventsByCategory(

            this.value,

            displayEvents
        );
    };
}

// KEYDOWN SEARCH

const searchBox =
    document.querySelector("#searchBox");

if (searchBox) {

    searchBox.addEventListener(

        "keydown",

        function () {

            const value =
                this.value.toLowerCase();

            const filtered =
                events.filter(

                    event =>
                        event.name
                            .toLowerCase()
                            .includes(value)
                );

            displayEvents(filtered);
        }
    );
}

// PHONE VALIDATION

function validatePhone() {

    let phone =
        document.getElementById("phone").value;

    if (phone.length < 10) {

        alert(
            "Phone number must contain 10 digits"
        );
    }
}

// EVENT FEE

function showFee() {

    let fee =
        document.getElementById("eventType").value;

    document.getElementById("feeDisplay")
        .innerHTML =
        "Event Fee: ₹" + fee;

    localStorage.setItem(
        "preferredEvent",
        fee
    );
}

// CHARACTER COUNT

function countCharacters() {

    let text =
        document.getElementById("feedback").value;

    document.getElementById("charCount")
        .innerHTML =
        text.length;
}

// IMAGE ENLARGE

function enlargeImage(img) {

    img.style.width = "400px";

    img.style.height = "300px";
}

// VIDEO READY

function videoReady() {

    document.getElementById("videoMessage")
        .innerHTML =
        "Video ready to play";
}

// BEFORE UNLOAD

window.onbeforeunload = function () {

    return "Form not submitted!";
};

// LOCAL STORAGE

function loadSavedPreference() {

    let saved =
        localStorage.getItem(
            "preferredEvent"
        );

    if (saved) {

        document.getElementById(
            "eventType"
        ).value = saved;
    }
}

// CLEAR STORAGE

function clearPreferences() {

    localStorage.clear();

    sessionStorage.clear();

    alert("Preferences Cleared");
}

// GEOLOCATION

function findLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            showPosition,

            showError,

            {
                enableHighAccuracy: true,

                timeout: 5000
            }
        );

    } else {

        alert(
            "Geolocation not supported"
        );
    }
}

function showPosition(position) {

    document.getElementById(
        "locationResult"
    ).innerHTML =

        `Latitude:
        ${position.coords.latitude}

        <br>

        Longitude:
        ${position.coords.longitude}`;
}

function showError(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:

            alert("Permission denied");

            break;

        case error.TIMEOUT:

            alert("Timeout");

            break;

        default:

            alert("Location error");
    }
}

// FORM HANDLING

const form =
    document.querySelector("#eventForm");

if (form) {

    form.addEventListener(

        "submit",

        function (event) {

            event.preventDefault();

            console.log(
                "Form submission started"
            );

            const name =
                form.elements["name"].value;

            const email =
                form.elements["email"].value;

            const selectedEvent =
                form.elements["eventType"].value;

            // VALIDATION

            if (
                name === "" ||
                email === ""
            ) {

                alert(
                    "Please fill all fields"
                );

                return;
            }

            // AJAX FETCH

            submitRegistration({

                name,

                email,

                selectedEvent
            });
        }
    );
}

// FETCH API

function submitRegistration(userData) {

    console.log(
        "Sending registration:",
        userData
    );

    setTimeout(() => {

        fetch(
            "https://jsonplaceholder.typicode.com/posts",

            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(userData)
            }
        )

            .then(response => response.json())

            .then(data => {

                console.log(data);

                alert(
                    "Registration successful!"
                );
            })

            .catch(error => {

                console.error(error);

                alert(
                    "Registration failed"
                );
            });

    }, 2000);
}

// ASYNC / AWAIT

async function fetchEvents() {

    try {

        console.log(
            "Loading events..."
        );

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );

        const data =
            await response.json();

        console.log(
            "Fetched events:",
            data
        );

    } catch (error) {

        console.error(error);
    }
}

fetchEvents();

// OBJECT ENTRIES

events.forEach(event => {

    console.log(

        Object.entries(event)
    );
});

// jQuery EXAMPLE

// $('#registerBtn').click(function () {
//
//     $('.eventCard').fadeOut();
//
//     $('.eventCard').fadeIn();
// });

// Framework Benefit:
// React/Vue provide better
// component-based architecture.