// Code goes here

var people = [
    {id: 1, name: "John"},
    {id: 2, name: "Mary"},
    {id: 3, name: "Bob"},
    {id: 4, name: "Sarah"},
    {id: 5, name: "Chad"}    
];

var fadesIn = function(element, isInitialized, context) {
    if (!isInitialized) {
        element.style.opacity = 0
        Velocity(element, {opacity: 1})
    }
}

var fadesOut = function(callback) {
    return function(e) {
        //don't redraw yet
        m.redraw.strategy("none")

        Velocity(e.target, {opacity: 0}, {
            complete: function() {
                //now that the animation finished, redraw
                m.startComputation()
                callback()
                m.endComputation()
            }
        })
    }
}

// controller
var controller = function() {
    this.remove = function(person) {
        people.splice(people.indexOf(person), 1);
    };
    this.resetClock = function(){
        console.log('you got clocked');
    }
};

//view
var view = function(ctrl) {
    return [m("ul", [
        people.map(function(person) {
            return m("li", {
                key: person.id,
                onclick: fadesOut(ctrl.remove.bind(this, person)),
                config: fadesIn
            }, person.name);
        })
    ]), m('clock-face[time="11:22:05"]', { config: fadesIn, onclick: ctrl.resetClock}), 
      m('clock-face[time="auto"]', { config: fadesIn})];
};


m.module(document.getElementById("container"), {controller: controller, view: view})